"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import ShoppingCartIcon from "@public/icons/userPanel/shoppingIcon";
import CardRenderer from "./component/CardRenderer";

const GiftCardsList = () => {
  useAuthRedirect();

  const [giftCarts, setGiftCarts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    const fetchData = async () => {
      try {
        // --- (A) Fetch gift card definitions ---
        const res1 = await axios.get(
          `${Config.apiUrl}/user/giftcart/cartlist`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res1.data.code === 1) {
          setGiftCarts(res1.data.giftcarts || []);
          console.log("cartlist fetched successfully");
        } else {
          console.error("Server returned an error code (cartlist):", res1.data);
        }

        // --- (B) Fetch the user’s current cart info ---
        const res2 = await axios.get(`${Config.apiUrl}/user/giftcart/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res2.data.code === 1) {
          setCartData(res2.data);
          setTotalCount(res2.data.count);
          console.log("carts fetched successfully");
        } else {
          console.error("Server returned an error code (carts):", res2.data);
        }
      } catch (err) {
        console.error("Error fetching gift carts:", err);
      }
    };

    fetchData();
  }, [totalCount]);

  if (!giftCarts || !cartData) return <div>Loading...</div>;

  // }

  function getCartCountByGiftId(giftId) {
    // 1) Safeguard against missing data
    if (!cartData?.carts) {
      return []; // Return an empty array or null, depending on your needs
    }

    // 2) Convert the carts object into an array
    //    e.g., if cartData.carts = { "10": {...}, "15": {...} }
    //    then itemsArray = [ {...}, {...} ]
    const itemsArray = Object.values(cartData.carts);

    // 3) Use filter to find all items whose `gift_id` matches the given giftId
    //    Note: if your gift_id is numeric, you might need to convert giftId to a number
    const filteredItems = itemsArray.filter((item) => {
      return item.gift_id == giftId;
      // or item.gift_id === parseInt(giftId, 10) if you prefer parseInt
    });

    // 4) Return the result (one or multiple items).
    //    If you only expect one match, you can return filteredItems[0] or null.
    console.log("object", filteredItems);
    if (filteredItems.length > 0) return filteredItems[0].count;
  }

  console.log("cart", cartData);
  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      {/* Title and Cart Info */}
      <div className="flex justify-between items-center mb-6">
        {/* Back or navigation icon */}
        <ChevronRightIcon />

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          کارت هدیه
        </h1>

        {/* Shopping Cart with total count */}
        <div className="flex items-center space-x-2">
          <ShoppingCartIcon />
          {totalCount > 0 ? (
            <span className="text-xl font-semibold">{totalCount}</span>
          ) : (
            <span className="text-sm text-gray-500">0</span>
          )}
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftCarts.length > 0 ? (
          giftCarts.map((gift) => {
            // Get the current count in the cart for this particular gift
            const currentCount = getCartCountByGiftId(gift.id);

            return (
              <CardRenderer
                key={gift.id}
                gift={gift}
                count={currentCount || 0}
                onChange={setTotalCount}
                totalCount={totalCount}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GiftCardsList;
