"use client";
import { useRouter } from "next/navigation";
import CardRenderer from "../component/CardRenderer";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import { useEffect, useState } from "react";
import axios from "axios";
import Config from "@/components/config";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import Link from "next/link";

const ShopPage = () => {
  useAuthRedirect();
  const router = useRouter();

  const [giftCarts, setGiftCarts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState(null);

  const fetchData = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      // --- (A) Fetch gift card definitions ---
      const res1 = await axios.get(`${Config.apiUrl}/user/giftcart/cartlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
        setTotalPrice(res2.data.total_price);
        console.log("carts fetched successfully");
      } else {
        console.error("Server returned an error code (carts):", res2.data);
      }
    } catch (err) {
      console.error("Error fetching gift carts:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [totalCount, totalPrice]);

  if (!giftCarts || !cartData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const cartArray = cartData?.carts ? Object.values(cartData.carts) : [];

  function getCartCountByGiftId(giftId) {
    if (!cartData?.carts) {
      return 0;
    }
    const itemsArray = Object.values(cartData.carts);
    const filteredItems = itemsArray.filter((item) => item.gift_id == giftId);
    return filteredItems.length > 0 ? filteredItems[0].count : 0;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Title and Cart Info */}
      <div className="flex justify-between items-center mb-6">
        {/* Back or navigation icon */}
        <Link href={"/userPanel/shop"}>
          <ChevronRightIcon />
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center w-full">
          کارت هدیه
        </h1>

        {/* Shopping Cart with total count */}
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {giftCarts.length > 0 ? (
          giftCarts.map((gift) => {
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
      <div className="flex w-full items-center justify-center mt-2">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50">
          تایید کسر از کیف پول
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
