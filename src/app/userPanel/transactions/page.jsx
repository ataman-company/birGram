"use client";
import Config from "@/components/config";
import axios from "axios";
import { useEffect, useState } from "react";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import BottomNav from "@/components/userPanel/BottomNav";
import Image from "next/image";
import FilterModal from "../FilterModal/FilterModal";
import Header from "../Header/Header";

import { Button, useDisclosure } from "@nextui-org/react";

const Transactions = () => {
  useAuthRedirect();
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Controls modal

  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [filteredData, setFilteredData] = useState("هیچ تراکنشی وجود ندارد");

  const serverdata = async () => {
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 1) {
        setData(res.data);
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    serverdata();
    let interval = setInterval(getCurrentPrice, 5000);
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
    <>
      <div className="flex flex-col gap-2 pb-5 px-2 h-screen max-w-2xl mx-auto">
        <Header currentPrice={currentPrice} />
        <div className="flex-col justify-between  mx-2.5">
          <div className="flex justify-between  mx-2.5">
            <div className="inline-block">موجودی</div>
            {/* Open Modal on Button Click */}
            <Button
              isIconOnly
              variant="light"
              className="p-0 min-w-0 bg-transparent shadow-none"
              onPress={onOpen}
            >
              <Image
                width={24}
                height={24}
                src={"/icons/userPanel/filter.svg"}
                alt="filter"
              />
            </Button>
          </div>

          <div className="flex justify-center items-center -full text-gray-500 text-lg font-medium   p-4 shadow-sm">
            <span>{filteredData}</span>
          </div>
        </div>
        {/* Pass modal state to FilterModal */}
        <FilterModal open={isOpen} change={onOpenChange} />

        <BottomNav />
      </div>
    </>
  );
};

export default Transactions;
