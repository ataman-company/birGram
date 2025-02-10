"use client";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";
import UserPanelSwipper from "@/components/userPanel/page";
import UserPanelGoldInformation from "@/components/userPanel/UserPanelGoldInformation";
import Copy from "@icons/userPanel/copy.svg";
import Down from "@icons/userPanel/down.svg";
import Eye from "@icons/userPanel/eye.svg";
import History from "@icons/userPanel/history.svg";
import More from "@icons/userPanel/more.svg";
import Support from "@icons/userPanel/support.svg";
import Uparrow from "@icons/userPanel/up-arrow.svg";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Header from "./Header/Header";
import toast, { Toaster } from "react-hot-toast";
import BuyIcon from "@public/icons/userPanel/buy";
import SellIcon from "@public/icons/userPanel/sell";
import RequestIcon from "@public/icons/userPanel/request";
import MoreIcon from "@public/icons/userPanel/more";

function UserPanel() {
  useAuthRedirect();

  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  // State to control visibility of sensitive data
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
      } else if (res.data.code === 401) {
        // goto login
        localStorage.removeItem("token");
        useAuthRedirect();
      } else if (res.data.code === 555) {
        // go to retoken
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
    // eslint-disable-next-line
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

  const { user } = data;

  if (!user) return null;

  // Toggle the visibility of the balance details
  const handleEyeClick = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <div className="flex flex-col gap-2 pb-5 px-2 max-w-2xl mx-auto">
        <Header currentPrice={currentPrice} />

        <div className="flex flex-col gap-2">
          {/* Top Section */}
          <div className="flex justify-between">
            <p className="text-lg font-bold">حساب بیرگرم</p>
            <div className="py-1 px-2 bg-green-100 text-green-700 flex items-center rounded-lg relative">
              <p className="text-green-700 text-sm">پشتیبانی</p>
              <Support width={24} height={24} fill="#3a5a40" />
              <span className="absolute flex size-3 top-0 left-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </div>

          {/* Balance Section */}
          <div className="w-full rounded-lg py-3 px-2 bg-panel flex flex-col gap-2">
            {/* Header Row */}
            <div className="flex justify-between">
              <div className="flex gap-1 text-white">
                <p>موجودی</p>
                {/* Eye Icon Clickable */}
                <button onClick={handleEyeClick}>
                  <Eye />
                </button>
              </div>

              {/* حساب نمایش یا *** */}
              <button className="z-50" onClick={handleCopyHesab}>
                <div className="flex gap-1 text-sm text-yellow-400">
                  <p>{isBalanceVisible ? user.hesab : "****"}</p>
                  <Copy className="h-5 w-5" />
                </div>
              </button>
            </div>

            {/* موجودی طلا (Gold) */}
            <div className="flex gap-0.5 text-yellow-400">
              <p>{isBalanceVisible ? user.gold : "***"} بیرگرم</p>
              <Down />
            </div>

            {/* معادل ریالی */}
            <p className="text-white">معادل</p>
            <p className="text-white">
              {isBalanceVisible ? user.gold * currentPrice : "***"} ریال
            </p>
          </div>

          {/* 4 Icon Buttons */}
          <div className="flex mt-3 mb-3 justify-evenly">
            <Link href={"#"} className="flex flex-col gap-1 items-center">
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <BuyIcon />
              </div>
              <p className="text-sm">خرید</p>
            </Link>

            <Link href={"#"} className="flex flex-col gap-1 items-center">
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <SellIcon />
              </div>
              <p className="text-sm">فروش</p>
            </Link>

            <Link href={"#"} className="flex flex-col gap-1 items-center">
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <RequestIcon />
              </div>
              <p className="text-sm">درخواست ها</p>
            </Link>

            <Link href={"#"} className="flex flex-col gap-1 items-center">
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <MoreIcon />
              </div>
              <p className="text-sm">بیشتر</p>
            </Link>
          </div>

          {/* Swiper / Slider */}
          <UserPanelSwipper slides={data.options} />

          {/* Chart / Additional Section */}
          <div
            className="flex align-center items-center space-x-6 flex-row"
            dir="rtl"
          >
            <div className="relative ml-5">
              <span className="absolute flex size-3 top-0 right-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
              </span>
            </div>
            <p className="mt-5">نمودار لحظه‌ای قیمت طلا</p>
          </div>

          <UserPanelGoldInformation
            placement="bottom"
            show={false}
            data={data}
            currentPrice={currentPrice}
          />
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
          <div className="flex justify-center">
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPanel;
