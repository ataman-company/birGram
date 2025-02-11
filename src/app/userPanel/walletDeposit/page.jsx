"use client";
import { useEffect, useState } from "react"; // Import useState and useEffect hooks
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import TransactionLimitsModal from "../transfer/components/TransactionLimitsModal";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import axios from "axios";
import Config from "@/components/config";
import AlertIcon from "@public/icons/userPanel/alertIcon";

const WalletRecharge = () => {
  useAuthRedirect();
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Modal State

  const [data, setData] = useState(false);

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

    // eslint-disable-next-line
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const priceValue = watch("price");

  const onSubmit = (data) => {
    console.log(data);
  };

  const { user } = data;

  if (!user) return null;

  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white relative">
      <div className="h-screen max-w-2xl mx-auto flex flex-col p-4">
        {/* Header */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <Link href="/userPanel/wallet">
            <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
          </Link>
          <h1 className="text-md font-bold">شارژ کیف پول</h1>

          {/* 🔹 Info Icon to Open Modal */}
          <button onClick={() => setIsModalOpen(true)}>
            <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
          </button>
        </div>

        {/* 🔹 Modal Component */}
        {isModalOpen && (
          <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
        )}

        {/* Balance Section */}
        <div className="flex flex-col w-full my-2 p-3 text-gray-500 bg-white border border-gray-300 rounded-xl">
          <span className="text-gray-500 text-sm">موجودی</span>
          <span className="text-blue-600 font-bold text-sm mt-2">
            {user.wallet} ریال
          </span>
        </div>

        {/* Amount Input */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-full">
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-2 grow">
              <div>
                <input
                  type="number"
                  placeholder="مبلغ واریزی به کیف پول (ریال)"
                  {...register("price", {
                    required: "مقدار واریزی الزامی است",
                    min: {
                      value: 20000,
                      message: "مبلغ باید بیشتر از ۲۰,۰۰۰ ریال باشد",
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Predefined Price Buttons */}
              <div className="flex items-center justify-start ">
                {[10000000, 50000000, 100000000].map((price) => (
                  <button
                    key={price}
                    type="button"
                    className="bg-gray-200 text-gray-700 mx-1 px-3 py-2 rounded-lg text-xs hover:bg-gray-300"
                    onClick={() => setValue("price", price.toString())}
                  >
                    {price.toLocaleString()} ریال
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {priceValue && (
                <div className="space-y-4 mt-5">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-sm text-gray-900">
                      کارمزد درگاه بانکی:
                    </span>
                    <span className="text-sm text-blue-900">۰ ریال</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-sm text-gray-900">
                      مبلغ پرداختی در درگاه:
                    </span>
                    <span className="text-sm text-blue-900">
                      ۱۰,۰۰۰,۰۰۰ ریال
                    </span>
                  </div>
                </div>
              )}
              {/* Warning Messages */}
              <div className="flex flex-col space-y-3 p-2">
                <div className="bg-yellow-100 p-3 text-black-700 text-bold text-xs rounded-lg flex items-center">
                  <div>
                    <AlertIcon />
                  </div>
                  <ul className="list-disc pr-5">
                    <li>لطفا در صورت استفاده از فیلترشکن، آن را خاموش کنید.</li>
                  </ul>
                </div>

                <div className="bg-yellow-100 p-3 text-black-700 text-bold text-xs rounded-lg flex items-center">
                  <div>
                    <AlertIcon />
                  </div>
                  <ul className="list-disc pr-5">
                    <li>
                      با کارتی که متعلق به خودتان است تراکنش را انجام دهید. سقف
                      واریز درگاه اینترنتی ۲۰۰ میلیون تومان می‌باشد.
                    </li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
                >
                  تایید و ادامه
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletRecharge;
