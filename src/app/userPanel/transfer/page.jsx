// "use client";
// import { useEffect, useState } from "react";
// import Config from "@/components/config";
// import { ChevronRight, Info } from "lucide-react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import useAuthRedirect from "@/app/hooks/useAuthRedirect";

// // 1) Import the toast utilities
// import { Toaster, toast } from "react-hot-toast";

// export default function MoneyTransfer() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   useAuthRedirect();

//   const [isLoading, setIsLoading] = useState(false);
//   const [apiData, setApiData] = useState(null);
//   const [balanceError, setBalanceError] = useState(false);
//   const [user, setUser] = useState(null);
//   // Watch input changes
//   const destinationAccount = watch("destinationAccount", "");
//   const transferAmount = watch("transferAmount");

//   // 2) When the user types the account number, fetch its details if it’s fully typed
//   useEffect(() => {
//     if (destinationAccount.replace(/-/g, "").length === 16) {
//       fetchAccountDetails(destinationAccount);
//     }
//   }, [destinationAccount]);

//   const fetchAccountDetails = async (accountNumber) => {
//     setIsLoading(true);

//     try {
//       // Retrieve token from local storage
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Token not found. Please log in again.");
//         return;
//       }

//       setUser(JSON.parse(localStorage.getItem("userData")));

//       const formData = new FormData();
//       formData.append("hesab", accountNumber);

//       const response = await axios.post(
//         `${Config.apiUrl}/user/wallet/checkhesab`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.code === 1) {
//         // Success
//         toast.success("حساب با موفقیت شناسایی شد!");
//         setApiData(response.data);
//       } else {
//         // Something went wrong
//         toast.error(response.data.error || "خطایی رخ داده است.");
//       }
//     } catch (error) {
//       console.error("Error fetching account details:", error);
//       toast.error("خطا در بررسی حساب. لطفاً دوباره تلاش کنید.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const validateBalance = () => {
//     if (user && transferAmount > user.gold) {
//       setBalanceError(true);
//     } else {
//       setBalanceError(false);
//     }
//   };

//   useEffect(() => {
//     if (apiData && transferAmount) {
//       validateBalance();
//     }
//   }, [transferAmount, apiData]);

//   // Format input as 1118-2804-5093-6312
//   const formatAccountNumber = (value) => {
//     return value
//       .replace(/\D/g, "") // Remove all non-numeric characters
//       .slice(0, 16) // Limit to 16 digits
//       .replace(/(\d{4})(?=\d)/g, "$1-"); // Insert "-" every 4 digits
//   };

//   const handleAccountChange = (e) => {
//     const formattedValue = formatAccountNumber(e.target.value);
//     setValue("destinationAccount", formattedValue);
//   };

//   // 3) Handle form submission
//   const onSubmit = (data) => {
//     if (balanceError) {
//       toast.error("موجودی کافی نیست.");
//       return;
//     }

//     // For now, just log or do further submission...
//     console.log("Submitted Data:", data);
//     toast.success("انتقال ثبت شد!");
//   };
//   console.log("user", user?.gold);

//   return (
//     <>
//       {/* 4) Hot Toast container, can be placed anywhere globally, typically in layout */}
//       <Toaster position="top-left" reverseOrder={false} />

//       <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 ">
//         {/* Top Bar */}
//         <div className="flex justify-between items-center py-3 border-b border-gray-200">
//           <Link href="/userPanel/ServicePage">
//             <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
//           </Link>
//           <h1 className="text-md font-bold">انتقال مبلغ</h1>

//           <Info className="w-5 h-5 text-gray-700" />
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mt-6 flex flex-col gap-4"
//         >
//           {/* Destination Account Input */}
//           <div>
//             <input
//               type="text"
//               placeholder="آدرس حساب مقصد"
//               {...register("destinationAccount", {
//                 required: "لطفاً آدرس حساب مقصد را وارد کنید",
//                 minLength: { value: 19, message: "حساب باید 16 رقم باشد" },
//                 maxLength: {
//                   value: 19,
//                   message: "حساب نباید بیشتر از 16 رقم باشد",
//                 },
//               })}
//               value={destinationAccount}
//               onChange={handleAccountChange}
//               className="w-full p-3 text-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
//             />
//             {errors.destinationAccount && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.destinationAccount.message}
//               </p>
//             )}
//             {isLoading && (
//               <p className="text-blue-500 text-sm mt-1">در حال بررسی حساب...</p>
//             )}
//           </div>

//           {/* Show additional fields if API response is valid */}
//           {apiData && (
//             <>
//               {/* Account Number Display */}
//               <div className="text-gray-900 text-sm font-bold">
//                 شماره حساب مقصد:
//                 <span className="text-gray-700 font-medium ml-2">
//                   {apiData.accountNumber}
//                 </span>
//               </div>

//               {/* Save Account Checkbox */}
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" className="form-checkbox" />
//                 <span className="text-gray-700 text-sm">
//                   آدرس حساب میلی ذخیره شود.
//                 </span>
//               </label>

//               {/* Amount Input */}
//               <div>
//                 <label className="text-blue-900 font-bold mb-2">
//                   مقدار مبلغی که می‌خواهید انتقال بدهید:
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="مقدار طلا به میلی گرم"
//                   {...register("transferAmount", {
//                     required: "لطفاً مقدار را وارد کنید",
//                     min: { value: 1, message: "حداقل مقدار 1 گرم است" },
//                   })}
//                   className={`w-full p-3 mt-2 border rounded-xl focus:outline-none ${
//                     balanceError
//                       ? "border-red-500 focus:ring-red-400"
//                       : "border-gray-300 focus:ring-gray-400"
//                   }`}
//                 />
//                 {balanceError && (
//                   <p className="text-red-500 text-sm mt-1">
//                     موجودی میلی کافی نمی‌باشد
//                   </p>
//                 )}
//               </div>

//               {/* Balance Information */}
//               <div className="flex justify-between text-gray-800 text-sm mt-2 p-3 border border-gray-300 rounded-xl">
//                 <span>موجودی حساب میلی:</span>
//                 <span>{user.wallet * 10} ریال</span>
//               </div>

//               {/* Fee Information */}
//               <div className="flex justify-between text-gray-800 text-sm mt-2 p-3 border border-gray-300 rounded-xl">
//                 <span>کارمزد (۰ میلی‌گرم):</span>
//                 <span>۰ میلی</span>
//               </div>

//               {/* Free Fee Tooltip */}
//               <div className="relative my-3">
//                 <div className="absolute -top-2 left-0 bg-gray-700 text-white text-xs p-2 rounded-lg">
//                   تعداد کارمزد رایگان باقی‌مانده: {user.freefee || 0} از ۲۰
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={balanceError}
//                 className={`w-full p-3 rounded-xl transition ${
//                   balanceError
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-blue-600 text-white hover:bg-blue-700"
//                 }`}
//               >
//                 تایید و ادامه
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Config from "@/components/config";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import { Toaster, toast } from "react-hot-toast";
import TransactionLimitsModal from "./components/TransactionLimitsModal";

// Import Modal Component

export default function MoneyTransfer() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useAuthRedirect();

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [balanceError, setBalanceError] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Modal State

  // Watch input changes
  const destinationAccount = watch("destinationAccount", "");
  const transferAmount = watch("transferAmount");

  // Fetch account details when input is fully typed
  useEffect(() => {
    if (destinationAccount.replace(/-/g, "").length === 16) {
      fetchAccountDetails(destinationAccount);
    }
  }, [destinationAccount]);

  const fetchAccountDetails = async (accountNumber) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token not found. Please log in again.");
        return;
      }

      setUser(JSON.parse(localStorage.getItem("userData")));

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
        toast.success("حساب با موفقیت شناسایی شد!");
        setApiData(response.data);
      } else {
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
    if (user && transferAmount > user.gold) {
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

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />

      <div className="h-screen max-w-2xl mx-auto flex flex-col p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
          <Link href="/userPanel/ServicePage">
            <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
          </Link>
          <h1 className="text-md font-bold">انتقال مبلغ</h1>

          {/* 🔹 Info Icon to Open Modal */}
          <button onClick={() => setIsModalOpen(true)}>
            <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
          </button>
        </div>

        {/* 🔹 Modal Component */}
        {isModalOpen && (
          <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
        )}

        {/* Form */}
        <form onSubmit={handleSubmit()} className="mt-6 flex flex-col gap-4">
          {/* Destination Account Input */}
          <div>
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
              className="w-full p-3 text-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </form>
      </div>
    </>
  );
}
