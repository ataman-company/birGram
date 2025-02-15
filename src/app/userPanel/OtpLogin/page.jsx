// "use client";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import useAuthRedirect from "@/app/hooks/useAuthRedirect";
// import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
// import Link from "next/link";

// export default function Otp() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({ mode: "onChange" });

//   useAuthRedirect();

//   // Timer state (60 seconds)
//   const [timeLeft, setTimeLeft] = useState(60);

//   // Loading state (for disabling the button if needed)
//   const [isLoading, setIsLoading] = useState(false);

//   // Decrement the timer each second until it reaches 0
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timerId = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     // Clear interval on unmount or if timeLeft changes
//     return () => clearInterval(timerId);
//   }, [timeLeft]);

//   // Helper to format time as mm:ss
//   const formatTime = (seconds) => {
//     const m = String(Math.floor(seconds / 60)).padStart(2, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   // Resend OTP logic
//   const handleResend = () => {
//     // Call your resend OTP API here if needed
//     setTimeLeft(60); // Reset the timer to 60 seconds
//   };

//   // On form submission (OTP entered)
//   const onSubmit = (data) => {
//     // data.otp is the code user typed
//     console.log("OTP Submitted:", data.otp);
//     setIsLoading(true);

//     // Example: call an API to verify OTP
//     // await verifyOtpApi(data.otp);
//     // setIsLoading(false);

//     // handle success/error
//   };

//   return (
//     <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
//       {/* Top Navigation */}
//       <div className="flex justify-between items-center mb-1 py-3">
//         <Link href="/userPanel/Profile">
//           <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
//         </Link>
//         <h1 className="flex justify-center grow text-md font-bold text-center">
//           کد فعال سازی
//         </h1>
//       </div>

//       {/* OTP Form and Timer */}
//       <div className="flex flex-col items-center mt-6">
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs">
//           <input
//             type="text"
//             placeholder="کد فعال سازی"
//             {...register("otp", {
//               required: "وارد کردن کد فعال سازی الزامی است",
//             })}
//             className="w-full border border-gray-300 rounded p-2 text-center"
//           />
//           {errors.otp && (
//             <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
//           )}

//           <button
//             type="submit"
//             disabled={!isValid || isLoading}
//             className="mt-4 w-full py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
//           >
//             تأیید
//           </button>
//         </form>

//         {/* Countdown + Resend Button */}
//         <div className="mt-4 flex items-center gap-2">
//           <span className="text-sm text-gray-600">{formatTime(timeLeft)}</span>
//           {timeLeft === 0 && (
//             <button
//               onClick={handleResend}
//               className="text-blue-500 text-sm underline"
//             >
//               ارسال مجدد
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import Link from "next/link";

export default function Otp() {
  useAuthRedirect();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // Timer state (60 seconds)
  const [timeLeft, setTimeLeft] = useState(60);

  // Decrement the timer each second
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Resend OTP
  const handleResend = () => {
    // Call your resend OTP API if needed
    setTimeLeft(60); // Reset timer
  };

  // On form submit, combine the five digits
  const onSubmit = (data) => {
    // data.otp0, data.otp1, etc.
    // Verify the OTP (API call, etc.)
    // ...
  };

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3">
        <Link href="/userPanel/Profile">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          کد فعال سازی
        </h1>
      </div>

      {/* OTP Form */}
      <div className="flex flex-col items-center mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm flex flex-col items-center"
        >
          {/* Digit Inputs */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                // Register each box separately: otp0, otp1, ...
                {...register(`otp${i}`, {
                  required: true,
                  pattern: {
                    value: /^[0-9]$/,
                    message: "فقط عدد وارد کنید",
                  },
                })}
                className="w-12 h-12 text-center rounded-md bg-gray-50 border border-gray-200 
                           focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          {/* Display any error if any digit is missing/invalid */}
          {(errors.otp0 ||
            errors.otp1 ||
            errors.otp2 ||
            errors.otp3 ||
            errors.otp4) && (
            <p className="text-red-500 text-sm mb-2">کد باید 5 رقم باشد</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
          >
            تأیید
          </button>
        </form>

        {/* Countdown + Resend Button */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">{formatTime(timeLeft)}</span>
          {timeLeft === 0 && (
            <button
              onClick={handleResend}
              className="text-blue-500 text-sm underline"
            >
              ارسال مجدد
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
