// "use client";
// import { useState } from "react";

// export default function SecuritySettings() {
//   return (
//     <div
//       dir="rtl"
//       className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-sm text-right"
//     >
//       {/* Page Title */}
//       <h2 className="text-base font-medium text-gray-700 mb-6">
//         تنظیمات امنیتی
//       </h2>

//       {/* Change Password Row */}
//       <div className="flex items-center justify-between border-b border-gray-200 py-3">
//         <span className="text-sm text-gray-600">تغییر رمز عبور</span>
//         {/* Left arrow icon (chevron) */}
//         <svg
//           className="w-4 h-4 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           {/* Arrow pointing left */}
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </div>

//       {/* Two-Step Verification Toggle */}
//   <div className="flex items-center justify-between py-3">
//     <span className="text-sm text-gray-600">
//       ورود دو مرحله‌ای (ارسال پیامک)
//     </span>
//     <label className="relative inline-flex items-center cursor-pointer">
//       <input type="checkbox" className="sr-only peer" />
//       {/* Toggle track */}
//       <div
//         className="w-11 h-6 bg-gray-200 rounded-full peer
//                      peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
//                      peer-checked:bg-blue-600 transition-colors"
//       ></div>
//       {/* Toggle circle */}
//       <div
//         className="absolute right-1 top-1 w-4 h-4 bg-white border border-gray-300
//                      rounded-full transition-all peer-checked:translate-x-5"
//       ></div>
//     </label>
//   </div>

//       {/* Helper text */}
//       <p className="mt-1 text-xs text-gray-400">
//         با فعال شدن این ویژگی، امنیت حساب کاربری شما افزایش پیدا می‌کند.
//       </p>
//     </div>
//   );
// }

"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SecuritySettings() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({ mode: "onChange" }); // Enable validation on form value change

  useAuthRedirect();

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const [isOtp, setIsOtp] = useState(false);

  const handleOtp = async () => {
    const newDisplayValue = !isOtp; // Toggle the value
    setIsOtp(newDisplayValue); // Update local state
  };

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3 ">
        <Link href="/userPanel/Profile">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          تنظیمات امنیتی
        </h1>
      </div>

      {/* Account Balance Section */}
      <div>
        <Link
          href="/userPanel/setting/ChangePassword"
          className="text-sm text-gray-500 pb-2"
        >
          <div className="flex justify-between border-b border-gray-200 px-1 py-3">
            تغییر رمز عبور
            <ChevronLeftIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
        </Link>
      </div>

      {/* Gold Input Section */}
      <div className="flex items-center justify-between py-4">
        <p className="text-gray-800">فعال کردن ورود دو مرحله ای</p>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isOtp}
            onChange={handleOtp}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none
  rounded-full peer dark:bg-gray-300 peer-checked:bg-[#001A80]
  relative after:content-[''] after:absolute after:top-0.5 after:left-[2px]
  after:bg-white after:border-gray-300 after:border after:rounded-full
  after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full
  peer-checked:after:border-white"
          />
        </label>
      </div>

      {/* MODAL - Opens on Info Click */}
    </div>
  );
}
