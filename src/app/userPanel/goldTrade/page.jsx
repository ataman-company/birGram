"use client";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import Header from "../Header/Header";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import TransactionLimitsModal from "../transfer/components/TransactionLimitsModal";

const GoldPurchaseForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useAuthRedirect();

  const [serverData, setServerData] = useState(null);

  const router = useRouter();

  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Data from API
  const fetchData = async () => {
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
        setCurrentPrice(res.data.current_price);

        setServerData(res.data);
      } else {
        localStorage.removeItem("token");
        useAuthRedirect();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval);
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

  // **Watching Fields**:
  const payment = watch("payment");
  const weight = watch("weight");

  useEffect(() => {
    if (!payment || isNaN(payment) || currentPrice === 0) return;
    const calculatedWeight = (payment / currentPrice).toFixed(3);
    setValue("weight", calculatedWeight, { shouldValidate: true });
  }, [payment, currentPrice, setValue]);

  useEffect(() => {
    if (!weight || isNaN(weight) || currentPrice === 0) return;
    const calculatedPayment = Math.round(weight * currentPrice);
    setValue("payment", calculatedPayment, { shouldValidate: true });
  }, [weight, currentPrice, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log("ser", serverData);
  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white relative">
      <Header currentPrice={currentPrice} />

      <div className="flex justify-between items-center py-3 border-b border-gray-200">
        <Link href="/userPanel/wallet">
          <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-md font-bold">خرید میلی</h1>

        {/* 🔹 Info Icon to Open Modal */}
        <button onClick={() => setIsModalOpen(true)}>
          <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
        </button>
      </div>

      {/* 🔹 Modal Component */}
      {isModalOpen && (
        <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Payment Amount */}
        <div>
          <label
            htmlFor="payment"
            className="block text-sm font-medium text-gray-700"
          >
            مبلغ پرداختی به ریال
          </label>
          <Controller
            name="payment"
            control={control}
            defaultValue=""
            rules={{
              required: "این فیلد الزامی است",
              pattern: {
                value: /^[0-9]*$/,
                message: "مقدار باید عدد باشد",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="payment"
                type="number"
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
            )}
          />
          {errors.payment && (
            <p className="text-sm text-red-500">{errors.payment.message}</p>
          )}
        </div>

        {/* Gold Weight */}
        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            مقدار طلا به گرم
          </label>
          <Controller
            name="weight"
            control={control}
            defaultValue=""
            rules={{
              required: "این فیلد الزامی است",
              min: {
                value: 0.1,
                message: "حداقل مقدار باید 0.1 گرم باشد",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                id="weight"
                type="number"
                step="0.01"
                className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              />
            )}
          />
          {errors.weight && (
            <p className="text-sm text-red-500">{errors.weight.message}</p>
          )}
        </div>

        {/* Balance Section */}
        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-white">
          <div className="text-right">
            <p className="text-gray-500 text-sm">موجودی</p>
            <p className="text-blue-800 font-bold text-lg">
              {serverData?.user.wallet} ریال
            </p>
          </div>
          <button
            onClick={() => router.push("/userPanel/walletDeposit")}
            className="text-blue-600 flex items-center justify-center space-x-1"
          >
            <span className="text-lg ml-1">+</span>
            <span className="text-sm font-medium">شارژ کیف پول</span>
          </button>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            پرداخت از طریق درگاه
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoldPurchaseForm;
