"use client";
import AlertIcon from "@public/icons/userPanel/alertIcon";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"; // Import useState and useEffect hooks
import { Controller, useForm, useWatch } from "react-hook-form";
import TransactionLimitsModal from "../transfer/components/TransactionLimitsModal";
import Config from "@/components/config";
import axios from "axios";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";

const Withdraw = () => {
  useAuthRedirect();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enables real-time validation
  });

  const [serverData, setServerData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // -------------------------
  // Fetch user data (including wallet balance)
  // -------------------------
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
  }, []);

  // -------------------------
  // Submit the Withdrawal Request
  // -------------------------
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        amount: data.amount,
        shaba: data.shaba,
      };

      const res = await axios.post(`${Config.apiUrl}/user/withdraw`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 1) {
        console.log("Withdrawal request successful:", res.data);
        // Optionally navigate or display a success message
      } else {
        console.error("Withdrawal error:", res.data.message);
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };

  // Watch the form fields
  const watchedAmount = useWatch({ control, name: "amount" });
  const watchedShaba = useWatch({ control, name: "shaba" });

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Header */}
      <div className="flex justify-between items-center mx-2 py-3 border-b border-gray-200">
        <Link href="/userPanel/wallet">
          <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-md font-bold">برداشت از کیف پول</h1>
        <button onClick={() => setIsModalOpen(true)}>
          <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
        </button>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* Balance Section */}
      <div className="flex flex-col w-full my-2 p-4 border border-gray-200 rounded-xl bg-white">
        <p className="text-gray-500 text-xs mb-2">موجودی</p>
        <p className="text-blue-800 font-bold text-xs">
          {serverData?.user?.wallet} ریال
        </p>
      </div>

      {/* Withdrawal Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-2 mt-3 space-y-6 h-full grow"
      >
        <div className="flex flex-col grow py-2">
          <div className="my-2">
            {/* Amount Input */}
            <label
              htmlFor="amount"
              className="my-3 block text-sm font-medium text-gray-700"
            >
              مبلغ برداشت به ریال
            </label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: "مقدار برداشت الزامی است",
                validate: (value) => {
                  const wallet = serverData?.user?.wallet;
                  if (wallet && Number(value) > Number(wallet)) {
                    return "مبلغ برداشت نمیتواند بیشتر از موجودی کیف پول شما باشد";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="amount"
                  type="number"
                  placeholder="مبلغ را به ریال وارد کنید"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="p-3 w-full border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}

            {/* Shaba Input */}
            <label
              htmlFor="shaba"
              className="my-3 block text-sm font-medium text-gray-700"
            >
              شماره شبای حساب (بدون IR)
            </label>
            <Controller
              name="shaba"
              control={control}
              defaultValue=""
              rules={{
                required: "شماره شبا الزامی است",
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="shaba"
                  type="text"
                  placeholder="شماره شبای حساب خود را وارد کنید"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="p-3 w-full border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.shaba && (
              <p className="text-sm text-red-500">{errors.shaba.message}</p>
            )}
          </div>

          {/* Warning Messages */}
          <div className="flex flex-col space-y-3">
            <div className="bg-yellow-100 p-4 text-black-700 text-bold text-xs rounded-lg flex items-center">
              <AlertIcon />
              <ul className="list-disc pr-5">
                <li>
                  سقف هر درخواست برداشت ۵۰ میلیون تومان و سقف برداشت روزانه ۱۰۰
                  میلیون تومان است.
                </li>
              </ul>
            </div>
            <div className="bg-yellow-100 p-3 text-black-700 text-bold text-xs rounded-lg flex items-center">
              <AlertIcon />
              <ul className="list-disc pr-5">
                <li className="mb-2">
                  در صورت تایید اطلاعات حساب، مبلغ درخواستی حداکثر طی یک روز
                  کاری پس از ثبت برداشت به حساب بانکی شما واریز می‌شود.
                </li>
                <li>شماره شبای وارد شده باید متعلق به خودتان باشد.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 rounded-lg ${
              isValid ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-700"
            }`}
          >
            تایید و ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
