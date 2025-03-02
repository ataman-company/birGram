"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";

import useRedirect from "@/app/hooks/useRedirect";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import Support from "@public/icons/userPanel/support";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header/Header";

function Profile() {
  useAuthRedirect();
  const [siteName, setSiteName] = useState("");

  const { redirectTo } = useRedirect();

  // State for storing user data, etc.
  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  // NEW: States for modal
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftCode, setGiftCode] = useState("");

  const handleCopyHesab = () => {
    if (!user?.hesab) return;
    navigator.clipboard
      .writeText(user.hesab)
      .then(() => {
        toast.success("حساب کپی شد!");
      })
      .catch(() => {
        toast.error("خطا در کپی کردن حساب");
      });
  };

  const serverdata = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 1) {
        setData(res.data);
        setCurrentPrice(res.data.current_price);
        setSiteName(JSON.parse(localStorage.getItem("siteName")));
        const isChecked = res.data.user.display == 1 ? true : false;
        setIsBalanceVisible(isChecked);
      } else if (res.data.code === 401) {
        localStorage.removeItem("token");
        useAuthRedirect();
      } else if (res.data.code === 555) {
        localStorage.removeItem("token");
        useAuthRedirect();
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    serverdata();
    const interval = setInterval(getCurrentPrice, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getCurrentPrice = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/lastprice`);
      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    redirectTo("/");
  };

  const { user } = data;
  if (!user) return null;

  const handleShowClick = async () => {
    const newDisplayValue = !isBalanceVisible; // Toggle
    setIsBalanceVisible(newDisplayValue);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Create FormData object
      const formData = new FormData();
      const isCheckedValue = newDisplayValue ? 1 : 0;
      formData.append("display", isCheckedValue);

      const res = await axios.post(
        `${Config.apiUrl}/user/updateprofile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code === 1) {
        toast.success("تنظیمات با موفقیت به‌روزرسانی شد!");
      } else {
        toast.error("خطا در به‌روزرسانی تنظیمات");
        setIsBalanceVisible(!newDisplayValue); // Revert on error
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطا در به‌روزرسانی تنظیمات");
      setIsBalanceVisible(!newDisplayValue); // Revert on error
    }
  };

  // NEW: Submit the gift code
  const handleGiftSubmit = async () => {
    if (!giftCode.trim()) {
      toast.error("لطفا کد هدیه را وارد کنید.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        redirectTo("/login");
        return;
      }

      // Example request to your server
      const res = await axios.post(
        `${Config.apiUrl}/user/giftcart/sendserial`,
        { serial: giftCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multimultipart/form-data",
          },
        }
      );

      if (res.data.code === 1) {
        toast.success("کد هدیه با موفقیت ثبت شد!");
        setShowGiftModal(false); // close modal
      } else {
        toast.error(res.data.error || "خطایی رخ داده است.");
      }
    } catch (error) {
      console.error("خطا در ثبت کد هدیه:", error);
      toast.error("خطا در ثبت کد هدیه");
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen pb-[80px] px-2 max-w-2xl mx-auto relative">
        <Toaster position="top-center" reverseOrder={false} />
        <Header currentPrice={currentPrice} />

        <div className="flex flex-col gap-2 mt-2 h-full justify-between">
          {/* Top Section */}
          <div className="flex justify-between">
            <p className="text-lg font-bold">پروفایل</p>
            <div className="py-1 px-2 bg-green-100 text-green-700 flex items-center rounded-lg relative">
              <p className="text-green-700 text-sm">پشتیبانی</p>
              <Support size={24} color="#3a5a40" />
              <span className="absolute flex size-3 top-0 left-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </div>

          {/* Invite Section */}
          <button
            onClick={() => redirectTo("/userPanel/referral")}
            className="text-white flex-shrink-0"
          >
            <div className="w-full rounded-xl bg-[#001A80] p-3 flex flex-row-reverse items-center justify-between">
              <ChevronLeftIcon fill="white" size={20} />
              <div className="flex flex-row-reverse">
                <div className="flex flex-col items-start text-right text-white mr-2">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">دعوت از دوستان</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    با معرفی هر دوست ۵ میلی جایزه بگیرید.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/userPanel/star.png"
                    alt="Star"
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
          </button>

          {/* Profile Settings */}
          <div className="bg-white px-4 py-4 flex flex-col justify-between grow">
            <div className="flex flex-col grow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                </div>
                {user.name ? (
                  <div className="bg-green-100 text-green-600 rounded-full px-3 py-1 text-xs">
                    احراز هویت شده
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-600 rounded-full px-3 py-1 text-xs">
                    احراز هویت نشده
                  </div>
                )}
              </div>

              {/* Settings List */}
              <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {/* 
                  1) REPLACE the static div with a clickable element 
                  2) Open the modal when clicked
                */}
                <div
                  onClick={() => setShowGiftModal(true)}
                  className="flex items-center justify-between py-4 cursor-pointer"
                >
                  <p className="text-gray-800">دریافت هدیه</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </div>

                <Link
                  href="/userPanel/setting"
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-gray-800">تنظیمات امنیتی</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </Link>
                <div className="flex items-center justify-between py-4">
                  <p className="text-gray-800">
                    پنهان کردن موجودی در زمان ورود
                  </p>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isBalanceVisible}
                      onChange={handleShowClick}
                    />
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none
  rounded-full peer dark:bg-gray-300 peer-checked:bg-[#001A80]
  relative after:content-[''] after:absolute after:top-0.5 after:left-[2px]
  after:bg-white after:border-gray-300 after:border after:rounded-full
  after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full
  peer-checked:after:border-white"
                    />
                  </label>
                </div>

                <Link
                  href="/userPanel/about"
                  className="flex items-center justify-between py-4"
                >
                  <p className="text-gray-800">درباره {siteName}</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Logout Button */}
          </div>
        </div>

        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
          <div className="flex justify-center">
            <BottomNav />
          </div>
        </div>
      </div>

      {/* 
        The Modal for "دریافت هدیه"
        This is shown conditionally if showGiftModal is true
      */}
      {showGiftModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content container */}
          <div className="bg-white w-full max-w-md mx-4 rounded-md p-4 relative">
            {/* Close button (top-right) */}
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            {/* Title */}
            <h2 className="text-center font-semibold text-lg mb-4">
              دریافت هدیه
            </h2>
            {/* Input */}
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-right mb-4"
              placeholder="کد هدیه را وارد کنید"
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
            />
            {/* Submit button */}
            <button
              onClick={handleGiftSubmit}
              disabled={!giftCode.trim()}
              className={`w-full py-2 rounded-md text-white ${
                giftCode.trim()
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              تایید و ثبت
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
