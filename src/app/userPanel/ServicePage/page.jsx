"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";
import Support from "@icons/userPanel/support.svg";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Link from "next/link"; // Import Link

const menuItems = [
  {
    text: "انتقال مبلغ",
    icon: "/icons/userPanel/transaction.svg",
    pathTo: "/userPanel/transfer",
  },
  {
    text: "دریافت فیزیکی طلا",
    icon: "/icons/userPanel/getgold.svg",
    pathTo: "/gold",
  },
  {
    text: "کارت هدیه",
    icon: "/icons/userPanel/gift.svg",
    pathTo: "/gift-card",
  },
];

function UserPanel() {
  useAuthRedirect();

  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);

  const serverdata = async () => {
    try {
      let token = localStorage.getItem("token");
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
      } else {
        localStorage.removeItem("token");
        useAuthRedirect();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    serverdata();
    let interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval);
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

  return (
    <div className="flex flex-col gap-2 pb-5 px-2 h-screen max-w-2xl mx-auto">
      <Header currentPrice={currentPrice} />
      <div className="flex flex-col gap-2">
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
      </div>
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-200"
          >
            {/* Icon + Text Wrapper */}
            <div className="flex items-center gap-2 flex-grow">
              <img src={item.icon} alt={item.text} className="w-5 h-5" />
              <span className="text-right text-blue-900 font-medium">
                {item.text}
              </span>
            </div>

            {/* Chevron as Link */}
            <Link href={item.pathTo}>
              <ChevronLeft className="text-blue-900 w-5 h-5 cursor-pointer" />
            </Link>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}

export default UserPanel;
