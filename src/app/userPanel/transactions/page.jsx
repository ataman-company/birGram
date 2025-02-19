"use client";
import Config from "@/components/config";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Import the useSearchParams hook
import { Suspense, useEffect, useState } from "react";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import BottomNav from "@/components/userPanel/BottomNav";
import Image from "next/image";
import FilterModal from "../FilterModal/FilterModal";
import Header from "../Header/Header";

import useRedirect from "@/app/hooks/useRedirect";
import TransactionTable from "./components/TransactionsTable";

const Transactions = () => {
  useAuthRedirect();

  const { redirectTo } = useRedirect();

  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const searchParams = useSearchParams(); // Get the query parameters

  const serverdata = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentPriceFromLS = JSON.parse(
        localStorage.getItem("currentPrice")
      );
      setUser(JSON.parse(localStorage.getItem("userData")));

      // Build params using the query parameters from the URL, or use default values
      const params = {
        type: searchParams.get("type") || "",
        status: searchParams.get("status") || "",
        startdate: searchParams.get("startdate") || "",
        enddate: searchParams.get("enddate") || "",
      };

      const res = await axios.get(`${Config.apiUrl}/user/wallet/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params,
      });

      if (res.data.code === 1) {
        setData(res.data.transactions);
        setCurrentPrice(currentPriceFromLS);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    serverdata();
    let interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [searchParams]); // Trigger effect when searchParams change

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

  if (!data) return null;

  return (
    <>
      <div className="flex flex-col gap-2 pb-5 px-2 h-screen max-w-2xl mx-auto">
        <Header currentPrice={currentPrice} />
        <div className="flex-col justify-between max-w-2xl pb-[100px]">
          <div className="flex justify-between">
            <div className="inline-block text-md">
              موجودی : {user?.wallet} ریال
            </div>
            {/* Open Modal on Button Click */}
            <button
              className="mx-2 p-1 min-w-0 bg-transparent shadow-none z-999"
              onClick={() => {
                redirectTo("/userPanel/transactions");
                setIsModalOpen(true);
              }}
            >
              <Image
                width={24}
                height={24}
                src={"/icons/userPanel/filter.svg"}
                alt="filter"
              />
            </button>
          </div>

          {isModalOpen && <FilterModal onClose={() => setIsModalOpen(false)} />}
          {data ? (
            <TransactionTable transactions={data} />
          ) : (
            <div className="flex justify-center items-center -full text-gray-500 text-lg font-medium p-4 shadow-sm">
              <span>هیچ تراکنشی وجود ندارد</span>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
          <div className="flex justify-center">
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
};

// export default Transactions;

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Transactions />
    </Suspense>
  );
}
