"use client";
import { useRouter } from "next/navigation";
import CardRenderer from "../component/CardRenderer";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import { useEffect, useState } from "react";
import axios from "axios";
import Config from "@/components/config";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import Link from "next/link";
import Loading from "@/components/Loading";

const ShopPage = () => {
  useAuthRedirect();
  const router = useRouter();

  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);

  const fetchData = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      // --- (A) Fetch gift card definitions ---

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
    // We can remove totalCount and totalPrice from dependencies if they trigger refetch unnecessarily
  }, [totalCount, totalPrice]);

  if (!cartData) return <Loading />;

  function getCartCountByGiftId(giftId) {
    if (!cartData?.carts) {
      return <Loading />;
    }
    const itemsArray = Object.values(cartData.carts);
    const filteredItems = itemsArray.filter((item) => item.gift_id == giftId);
    return filteredItems.length > 0 ? filteredItems[0].count : 0;
  }

  console.log("gift", cartData.carts);
  const handleConfirmOrder = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    try {
      const res = await axios.get(`${Config.apiUrl}/user/giftcart/setorder`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.code === 1) {
        // Show a success message
        alert("سفارش شما با موفقیت ثبت شد!");
      } else if (res.data.code === 110) {
        // Redirect to wallet deposit page
        router.push("/userPanel/walletDeposit");
      } else {
        // Optionally, handle other error codes
        alert("خطا در ثبت سفارش، لطفاً دوباره امتحان کنید.");
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("خطایی رخ داده است. لطفاً دوباره امتحان کنید.");
    }
  };

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
        {cartData?.carts && cartData.carts.length > 0 ? (
          cartData.carts.map((gift) => {
            const currentCount = getCartCountByGiftId(gift.gift_id);
            // Only render if currentCount is more than 0
            return currentCount > 0 ? (
              <CardRenderer
                key={gift.gift_id}
                gift={gift}
                count={currentCount}
                onChange={setTotalCount}
                totalCount={totalCount}
              />
            ) : null;
          })
        ) : (
          <></>
        )}
      </div>
      <div className="flex w-full items-center justify-center mt-2">
        {cartData.length > 0 ? (
          <button
            onClick={handleConfirmOrder}
            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
          >
            تایید کسر از کیف پول
          </button>
        ) : (
          <div className="flex justify-center items-center w-full text-gray-300">
            سبد خرید شما خالی است
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
