"use client";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";
import Support from "@icons/userPanel/support.svg";
import axios from "axios";
import { useEffect, useState } from "react";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import LogoutIcon from "@public/icons/userPanel/logout";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header/Header";
import { useRouter } from "next/navigation";

function Profile() {
  useAuthRedirect();
  const router = useRouter();

  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

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
    console.log("clicked");
    localStorage.removeItem("token");
    router.push("/");
  };

  const { user } = data;

  if (!user) return null;

  const handleShowClick = async () => {
    const newDisplayValue = !isBalanceVisible; // Toggle the value
    setIsBalanceVisible(newDisplayValue); // Update local state

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Create FormData object
      const formData = new FormData();
      const isCheckedValue = newDisplayValue ? 1 : 0;
      formData.append("display", isCheckedValue); // Append the display value

      const res = await axios.post(
        `${Config.apiUrl}/user/updateprofile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set content type to FormData
          },
        }
      );

      if (res.data.code === 1) {
        toast.success("تنظیمات با موفقیت به‌روزرسانی شد!");
      } else {
        toast.error("خطا در به‌روزرسانی تنظیمات");
        setIsBalanceVisible(!newDisplayValue); // Revert state on error
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطا در به‌روزرسانی تنظیمات");
      setIsBalanceVisible(!newDisplayValue); // Revert state on error
    }
  };
  console.log("isInv", isBalanceVisible);

  return (
    <>
      <div className="flex flex-col h-screen pb-[80px] px-2 max-w-2xl mx-auto relative">
        <Toaster position="top-left" reverseOrder={false} />
        <Header currentPrice={currentPrice} />

        <div className="flex flex-col gap-2 mt-2 h-full justify-between">
          {/* Top Section */}
          <div className="flex justify-between">
            <p className="text-lg font-bold">پروفایل</p>
            <div className="py-1 px-2 bg-green-100 text-green-700 flex items-center rounded-lg relative">
              <p className="text-green-700 text-sm">پشتیبانی</p>
              <Support width={24} height={24} fill="#3a5a40" />
              <span className="absolute flex size-3 top-0 left-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </div>

          {/* Invite Section */}
          <div className="w-full rounded-xl bg-[#001A80] p-3 flex flex-row-reverse items-center justify-between">
            <button
              onClick={() => router.push("/userPanel/referral")}
              className="text-white flex-shrink-0"
            >
              <ChevronLeftIcon fill="white" size={20} />
            </button>
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
                <div className="flex items-center justify-between py-4">
                  <p className="text-gray-800">دریافت هدیه</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-4">
                  <p className="text-gray-800">تنظیمات امنیتی</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </div>
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
                <button
                  onClick={() => {
                    console.log("updated");
                  }}
                  className="flex items-center justify-between w-full py-4"
                >
                  <p className="text-gray-800">به‌روزرسانی</p>
                </button>

                <div className="flex items-center justify-between py-4">
                  <p className="text-gray-800">اشتراک گذاری</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </div>

                <div className="flex items-center justify-between py-4">
                  <p className="text-gray-800">درباره مبلی</p>
                  <ChevronLeftIcon className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div>
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-pink-50 text-pink-600 py-3 rounded-lg text-center font-semibold flex items-center justify-center gap-2"
              >
                <LogoutIcon color="red" size={20} />
                خروج از حساب کاربری
              </button>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
          <div className="flex justify-center">
            <BottomNav />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
    </>
  );
}

export default Profile;
