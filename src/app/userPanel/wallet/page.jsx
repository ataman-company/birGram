"use client";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import BottomNav from "@/components/userPanel/BottomNav";

import Deposit from "@public/icons/userPanel/deposit";
import Withdraw from "@public/icons/userPanel/withdraw";
import axios from "axios";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Link from "next/link";
import Support from "@public/icons/userPanel/support";

const Wallet = () => {
  useAuthRedirect();

  const { redirectTo } = useRedirect();
  const [showBalance, setShowBalance] = useState(false);
  const [data, setData] = useState(null); // Initialize with null instead of false
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

        // Set showBalance based on user.display value
        setShowBalance(res.data.user.display);
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

  // Number formatting function
  const numberFormatter = new Intl.NumberFormat("fa-IR");

  // Only destructure when data is available
  if (!data || !data.user) return null;
  const { user } = data;

  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Header */}
      <Header currentPrice={currentPrice} />

      {/* Top Section */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between mt-2 max-w-2xl">
          <p className="text-sm font-bold mt-2">کیف پول</p>
          <Link href={"/userPanel/ticket"} className="flex justify-between">
            <div className="py-1 px-2 bg-green-100 text-green-700 flex items-center rounded-lg relative">
              <p className="text-green-700 text-sm">پشتیبانی</p>
              <Support size={24} color="#3a5a40" />
              <span className="absolute flex size-3 top-0 left-0">
                <span className="absolute top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </Link>
        </div>

        {/* Wallet Section */}
        <div className="bg-black text-white shadow-lg rounded-xl mx-4 mt-6 p-4 relative">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <p className="text-sm ml-2">موجودی</p>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={() => redirectTo("/userPanel/walletDeposit")}
              className="mt-4 flex items-center text-yellow-400 cursor-pointer"
            >
              <Plus size={18} />
              <span className="mr-1 text-sm">افزایش موجودی</span>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm font-bold">
              {showBalance
                ? `${numberFormatter.format(user.wallet)} ریال`
                : "*****"}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-sm">معادل</p>
            <p className="text-sm">
              {showBalance
                ? `${numberFormatter.format(user.gold)} ریال`
                : "*****"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-around mt-6">
          <button
            onClick={() => redirectTo("/userPanel/walletDeposit")}
            className="flex flex-col items-center"
          >
            <Deposit />
            <span className="text-sm mt-2">واریز</span>
          </button>
          <button
            onClick={() => redirectTo("/userPanel/withdraw")}
            className="flex flex-col items-center"
          >
            <Withdraw />
            <span className="text-sm mt-2">برداشت</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
        <div className="flex justify-center">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
