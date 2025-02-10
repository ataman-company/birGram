"use client";
import { useEffect, useState } from "react"; // Import useState and useEffect hooks
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import TransactionLimitsModal from "../transfer/components/TransactionLimitsModal";

const WalletRecharge = () => {
  const [isClient, setIsClient] = useState(false); // Track whether we are on the client side
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Modal State

  useEffect(() => {
    // Set isClient to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!isClient) {
    return null; // Return null to avoid rendering any content during SSR
  }

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
          <span className="text-blue-600 font-bold text-sm mt-2">0 ریال</span>
        </div>

        {/* Amount Input */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-full">
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-2 grow">
              <div>
                <input
                  type="number"
                  placeholder="مبلغ واریزی به کیف پول (ریال)"
                  {...register("amount", {
                    required: "مقدار واریزی الزامی است",
                    min: {
                      value: 20000,
                      message: "مبلغ باید بیشتر از ۲۰,۰۰۰ ریال باشد",
                    },
                  })}
                  className={`w-full p-3 border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              {/* Predefined Amount Buttons */}
              <div className="flex items-center justify-start ">
                {[10000000, 50000000, 100000000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="bg-gray-200 text-gray-700 mx-1 px-3 py-2 rounded-lg text-xs hover:bg-gray-300"
                    onClick={() => setValue("amount", amount.toString())}
                  >
                    {amount.toLocaleString()} ریال
                  </button>
                ))}
              </div>
            </div>

            {/* Warning Messages */}
            <div className="flex flex-col space-y-3">
              <div className="bg-yellow-100 p-3 text-yellow-700 text-xs rounded-lg flex items-center">
                ⚠ لطفا در صورت استفاده از فیلترشکن، آن را خاموش کنید.
              </div>
              <div className="bg-yellow-100 p-3 text-yellow-700 text-xs rounded-lg flex items-center">
                ⚠ با کارتی که متعلق به خودتان است تراکنش را انجام دهید. سقف
                واریز درگاه اینترنتی ۲۰۰ میلیون تومان می‌باشد.
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
        </form>
      </div>
    </div>
  );
};

export default WalletRecharge;
