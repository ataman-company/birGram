"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import Loading from "@/components/Loading";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardRenderer from "../component/CardRenderer";

const ShopPage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  useAuthRedirect();

  const { redirectTo } = useRedirect();
  const options = JSON.parse(localStorage.getItem("Options"));

  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState(null); // Ensure it's null initially

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
        setCartData(res2.data); // Set the cart data properly
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

  if (!cartData) return <Loading />; // This ensures you wait until the cartData is set

  // Make sure cartData.carts is defined before using it
  const cartItems = cartData?.carts || []; // If cartData.carts is undefined, use an empty array

  function getCartCountByGiftId(giftId) {
    if (!cartItems) {
      return <Loading />;
    }
    const filteredItems = cartItems.filter((item) => item.gift_id == giftId);
    return filteredItems.length > 0 ? filteredItems[0].count : 0;
  }

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
        redirectTo("/userPanel/transactions");
      } else if (res.data.code === 110) {
        // Redirect to wallet deposit page
        redirectTo("/userPanel/walletDeposit");
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
        {cartItems.length > 0 ? (
          cartItems.map((gift) => {
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
        {cartItems.length > 0 ? (
          <div className="w-full">
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg my-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                اطلاعات دریافت کارت هدیه
              </h2>

              <span className="text-gray-700 text-lg mb-4">
                مدت زمان آماده سازی کارت هدیه سه روز کاری می‌باشد.
              </span>
              <hr className="border-t border-gray-300 my-4" />

              <span className="text-gray-700 text-lg mb-4">
                لطفاً با در دست داشتن کارت شناسایی معتبر به آدرس زیر مراجعه
                فرمایید:
              </span>
              <hr className="border-t border-gray-300 my-4" />

              <span className="text-gray-800 font-semibold text-lg mb-4">
                آدرس: <span className="text-blue-600">{options.address}</span>
              </span>
              <hr className="border-t border-gray-300 my-4" />

              <span className="text-gray-700 text-lg mb-4">
                جهت کسب اطلاعات بیشتر و دریافت راهنمایی با شماره تلفن زیر تماس
                حاصل فرمایید:
              </span>
              <hr className="border-t border-gray-300 my-4" />

              <span className="text-gray-800 font-semibold text-lg mb-4">
                تلفن:{" "}
                <span dir="rtl" className="text-blue-600">
                  {options.phone}
                </span>
              </span>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
            >
              تایید کسر از کیف پول
            </button>
          </div>
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
