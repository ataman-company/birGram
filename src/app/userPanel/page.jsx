"use client";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";
import UserPanelSwipper from "@/components/userPanel/page";
import UserPanelGoldInformation from "@/components/userPanel/UserPanelGoldInformation";
import Copy from "@icons/userPanel/copy.svg";
import Down from "@icons/userPanel/down.svg";
import Eye from "@icons/userPanel/eye.svg";
import Support from "@icons/userPanel/support.svg";
import BuyIcon from "@public/icons/userPanel/buy";
import MoreIcon from "@public/icons/userPanel/more";
import RequestIcon from "@public/icons/userPanel/request";
import SellIcon from "@public/icons/userPanel/sell";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Header from "./Header/Header";
import MoreModal from "@/components/userPanel/MoreModal";
import Loading from "@/components/Loading";

// Simple Loading component

function UserPanel() {
  const auth = useAuthRedirect();
  const formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(Number(number));
  };

  const [data, setData] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to control visibility of sensitive data
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const handleCopyHesab = () => {
    if (!user?.hesab) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(user.hesab)
        .then(() => {
          toast.success("حساب کپی شد!");
        })
        .catch(() => {
          toast.error("خطا در کپی کردن حساب");
        });
    } else {
      // Fallback: create a temporary textarea and use execCommand
      const textarea = document.createElement("textarea");
      textarea.value = user.hesab;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("حساب کپی شد!");
        } else {
          toast.error("خطا در کپی کردن حساب");
        }
      } catch (err) {
        toast.error("خطا در کپی کردن حساب");
      }
      document.body.removeChild(textarea);
    }
  };

  const serverdata = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await axios.get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 1) {
        setData(res.data);
        setUser(res.data.user);
        setCurrentPrice(res.data.current_price);
        localStorage.setItem(
          "currentPrice",
          JSON.stringify(res.data.current_price)
        );
      } else if (res.data.code === 401 || res.data.code === 555) {
        localStorage.removeItem("token");
        useAuthRedirect();
      } else {
        console.error(res.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await serverdata();
      setIsLoading(false);
    };

    fetchData();

    const interval = setInterval(getCurrentPrice, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // const { user } = data;

  // If the data is loading, show the loading spinner
  useEffect(() => {
    if (user?.display !== undefined) {
      setIsBalanceVisible(user.display);
    }
  }, [user]);

  // If the data is loading, show the loading spinner
  if (isLoading) {
    return <Loading />;
  }

  // If no user data is available (and not loading), you might return null or a fallback UI
  if (!user) return null;

  // Toggle the visibility of the balance details
  const handleEyeClick = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const siteName = JSON.parse(localStorage.getItem("sitename"));
  return (
    <>
      <div className="flex flex-col gap-2 pb-5 px-2 max-w-2xl mx-auto">
        <Toaster position="top-left" reverseOrder={false} />
        <Header currentPrice={currentPrice} />

        <div className="flex flex-col gap-2">
          {/* Top Section */}
          <Link href={"/userPanel/ticket"} className="flex justify-between">
            <p className="text-lg font-bold">حساب {siteName}</p>
            <div className="py-1 px-2 bg-green-100 text-green-700 flex items-center rounded-lg relative">
              <p className="text-green-700 text-sm">پشتیبانی</p>
              <Support width={24} height={24} fill="#3a5a40" />
              <span className="absolute flex size-3 top-0 left-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </Link>

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
              <p>{isBalanceVisible ? formatNumber(user.gold) : "***"} گرم</p>
              <Down />
            </div>

            {/* معادل ریالی */}
            <p className="text-white">معادل</p>
            <p className="text-white">
              {isBalanceVisible
                ? formatNumber(user.gold * currentPrice)
                : "***"}{" "}
              ریال
            </p>
          </div>

          {/* 4 Icon Buttons */}
          <div className="flex mt-3 mb-3 justify-evenly">
            <Link
              href={"/userPanel/goldTrade"}
              className="flex flex-col gap-1 items-center"
            >
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <BuyIcon />
              </div>
              <p className="text-sm">خرید</p>
            </Link>

            <Link
              href={"/userPanel/sellGold"}
              className="flex flex-col gap-1 items-center"
            >
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <SellIcon />
              </div>
              <p className="text-sm">فروش</p>
            </Link>

            <Link
              href={
                "/userPanel/requests?type=physical&status=&startdate=&enddate="
              }
              className="flex flex-col gap-1 items-center"
            >
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <RequestIcon />
              </div>
              <p className="text-sm">درخواست ها</p>
            </Link>

            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="flex flex-col gap-1 items-center"
            >
              <div className="size-12 rounded-full bg-gray-100 flex justify-center items-center">
                <MoreIcon />
              </div>
              <p className="text-sm">بیشتر</p>
            </button>
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
        {isModalOpen && (
          <MoreModal user={user} onClose={() => setIsModalOpen(false)} />
        )}
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
