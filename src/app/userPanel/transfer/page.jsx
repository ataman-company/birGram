"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import axios from "axios";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// 1) Import the toast utilities
import Loading from "@/components/Loading";
import { Toaster, toast } from "react-hot-toast";
import TransactionLimitsModal from "./components/TransactionLimitsModal";
import useRedirect from "@/app/hooks/useRedirect";
import useCheckAuth from "@/app/hooks/useCheckAuth";

export default function MoneyTransfer() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useAuthRedirect();
  useCheckAuth();

  const { redirectTo } = useRedirect();

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [balanceError, setBalanceError] = useState(false);
  const [user, setUser] = useState(null);
  const [fee, setFee] = useState(null);
  const [freeFee, setFreeFee] = useState(null);
  // Watch input changes
  const destinationAccount = watch("destinationAccount", "");
  const transferAmount = watch("transferAmount");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2) When the user types the account number, fetch its details if it’s fully typed
  useEffect(() => {
    if (destinationAccount.replace(/-/g, "").length === 16) {
      fetchAccountDetails(destinationAccount);
    }
  }, [destinationAccount]);

  const fetchAccountDetails = async (accountNumber) => {
    setIsLoading(true);

    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token not found. Please log in again.");
        return;
      }

      setUser(JSON.parse(localStorage.getItem("userData")));

      const options = JSON.parse(localStorage.getItem("Options"));
      setFee(options.sendgoldfee);
      setFreeFee(options.freefeecount);

      const formData = new FormData();
      formData.append("hesab", accountNumber);

      const response = await axios.post(
        `${Config.apiUrl}/user/wallet/checkhesab`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 1) {
        // Success
        toast.success("حساب با موفقیت شناسایی شد!");
        setApiData(response.data);
      } else {
        // Something went wrong
        toast.error(response.data.error || "خطایی رخ داده است.");
      }
    } catch (error) {
      console.error("Error fetching account details:", error);
      toast.error("خطا در بررسی حساب. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateBalance = () => {
    if (user && transferAmount > Number(user.gold)) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  };

  useEffect(() => {
    if (apiData && transferAmount) {
      validateBalance();
    }
  }, [transferAmount, apiData]);

  // Format input as 1118-2804-5093-6312
  const formatAccountNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove all non-numeric characters
      .slice(0, 16) // Limit to 16 digits
      .replace(/(\d{4})(?=\d)/g, "$1-"); // Insert "-" every 4 digits
  };

  const handleAccountChange = (e) => {
    const formattedValue = formatAccountNumber(e.target.value);
    setValue("destinationAccount", formattedValue);
  };

  // 3) Handle form submission

  const onSubmit = async (data) => {
    if (balanceError) {
      toast.error("موجودی کافی نیست.");
      return;
    }

    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!token) {
      toast.error("توکن وجود ندارد.");
      return;
    }

    const formData = new FormData();
    formData.append("gold", data.transferAmount); // Append your data here
    formData.append("hesab", data.destinationAccount); // Append your data here

    try {
      const response = await axios.post(
        `${Config.apiUrl}/user/wallet/sendgold`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
          },
        }
      );

      if (response.data.code === 1) {
        // If the code is 1, it's a success
        console.log("Success:", response.data);
        toast.success("انتقال ثبت شد!");
        redirectTo("/userPanel/transactions");
      } else {
        // Handle non-success response code
        toast.error("خطا در ارسال اطلاعات.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطا در ارسال اطلاعات.");
    }
  };

  return (
    <>
      {/* 4) Hot Toast container, can be placed anywhere globally, typically in layout */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 ">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <Link href="/userPanel/ServicePage">
            <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
          </Link>
          <h1 className="text-md font-bold">انتقال مبلغ</h1>

          <button onClick={() => setIsModalOpen(true)}>
            <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mx-2 mt-3 space-y-6 h-full grow"
        >
          <div className="my-2">
            <input
              type="text"
              placeholder="آدرس حساب مقصد"
              {...register("destinationAccount", {
                required: "لطفاً آدرس حساب مقصد را وارد کنید",
                minLength: { value: 19, message: "حساب باید 16 رقم باشد" },
                maxLength: {
                  value: 19,
                  message: "حساب نباید بیشتر از 16 رقم باشد",
                },
              })}
              value={destinationAccount}
              onChange={handleAccountChange}
              className="w-full p-3 text-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            {errors.destinationAccount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.destinationAccount.message}
              </p>
            )}
            {isLoading && <Loading />}
          </div>

          {/* Show additional fields if API response is valid */}
          {apiData && (
            <>
              {/* Account Number Display */}
              <div className="flex flex-col grow py-2">
                {/* Save Account Checkbox */}
                <label className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="text-gray-700 text-sm">
                    آدرس حساب میلی ذخیره شود.
                  </span>
                </label>
                {/* Amount Input */}
                <div>
                  <label className="text-blue-900 font-bold mb-2 ">
                    مقدار طلایی که می‌خواهید انتقال بدهید:
                  </label>
                  <input
                    type="number"
                    placeholder="مقدار طلا به میلی گرم"
                    {...register("transferAmount", {
                      required: "لطفاً مقدار را وارد کنید",
                      min: { value: 1, message: "حداقل مقدار 1 گرم است" },
                    })}
                    className={`w-full h-[50px] p-3 mt-2 border rounded-xl focus:outline-none ${
                      balanceError
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-gray-400"
                    }`}
                  />
                  {balanceError && (
                    <p className="text-red-500 text-sm mt-1">
                      موجودی میلی کافی نمی‌باشد
                    </p>
                  )}
                </div>
                {/* Balance Information */}
                <div className="flex justify-between text-gray-800 text-sm mt-4 p-3 border border-gray-300 rounded-xl h-[50px]">
                  <span>موجودی حساب میلی:</span>
                  <span>{user.gold} میلی</span>
                </div>
                {/* Fee Information */}
                {transferAmount && (
                  <div className="space-y-4 mt-5">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2 mt-3">
                      <span className="text-sm text-gray-900">
                        کارمزد درگاه بانکی:
                      </span>
                      {freeFee > 0 ? (
                        <span className="text-sm text-blue-900">0 میلی</span>
                      ) : (
                        <span className="text-sm text-blue-900">
                          {(fee / 100) * transferAmount} میلی
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                      <span className="text-sm text-gray-900">
                        مبلغ پرداختی در درگاه:
                      </span>
                      {freeFee > 0 ? (
                        <span className="text-sm text-blue-900">
                          {transferAmount} میلی
                        </span>
                      ) : (
                        <span className="text-sm text-blue-900">
                          {(1 + fee / 100) * transferAmount} میلی
                        </span>
                      )}
                    </div>
                  </div>
                )}
                <div className="relative my-5 py-3">
                  <div className="absolute -top-2 left-0 bg-gray-700 text-white text-xs p-2 rounded-lg">
                    تعداد کارمزد رایگان باقی‌مانده: {user.freefee || 0} از ۲۰
                  </div>
                </div>
              </div>

              <div>
                {/* Free Fee Tooltip */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={balanceError}
                  className={`w-full p-3 rounded-xl transition ${
                    balanceError
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  تایید و ادامه
                </button>
              </div>
            </>
          )}
        </form>
        {isModalOpen && (
          <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </>
  );
}
