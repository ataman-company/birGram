// // "use client"; // For Next.js 13+ App Router
// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import axios from "axios";
// // import Config from "@/components/config";
// // import { useRouter } from "next/navigation";

// // export default function ChangePassword() {
// //   const router = useRouter();
// //   const token = localStorage.getItem("token");

// //   const {
// //     register,
// //     handleSubmit,
// //     watch,
// //     formState: { errors, isSubmitting, isValid },
// //   } = useForm({ mode: "onChange" });

// //   const newPassword = watch("newPassword", "");
// //   const confirmPassword = watch("confirmPassword", "");

// //   const isPasswordMismatch =
// //     confirmPassword.length > 0 && newPassword !== confirmPassword;

// //   const onSubmit = async (data) => {
// //     try {
// //       const formData = new FormData();
// //       formData.append("password", data.oldPassword);
// //       formData.append("newpassword", data.newPassword);

// //       const response = await axios.post(
// //         `${Config.apiUrl}/user/password`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       if (response.status === 200 && response.data.code === 1) {
// //         console.log("Password changed successfully!");
// //         router.push("/userPanel");
// //       } else {
// //         console.error(
// //           "Failed to change password:",
// //           response.data.message || response.statusText
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error changing password:", error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
// //         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
// //           تغییر رمز عبور
// //         </h1>
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //           {/* Old Password */}
// //           <div>
// //             <label
// //               htmlFor="oldPassword"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               رمز عبور فعلی
// //             </label>
// //             <input
// //               id="oldPassword"
// //               type="password"
// //               placeholder="رمز عبور فعلی را وارد کنید"
// //               {...register("oldPassword", {
// //                 required: "رمز عبور فعلی الزامی است",
// //               })}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.oldPassword && (
// //               <p className="mt-1 text-xs text-red-500">
// //                 {errors.oldPassword.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* New Password */}
// //           <div>
// //             <label
// //               htmlFor="newPassword"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               رمز عبور جدید
// //             </label>
// //             <input
// //               id="newPassword"
// //               type="password"
// //               placeholder="رمز عبور جدید را وارد کنید"
// //               {...register("newPassword", {
// //                 required: "رمز عبور جدید الزامی است",
// //                 minLength: {
// //                   value: 6,
// //                   message: "رمز عبور باید حداقل 6 کاراکتر باشد",
// //                 },
// //               })}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.newPassword && (
// //               <p className="mt-1 text-xs text-red-500">
// //                 {errors.newPassword.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Confirm New Password */}
// //           <div>
// //             <label
// //               htmlFor="confirmPassword"
// //               className="block text-sm font-medium text-gray-700 mb-1"
// //             >
// //               تکرار رمز عبور جدید
// //             </label>
// //             <input
// //               id="confirmPassword"
// //               type="password"
// //               placeholder="تکرار رمز عبور جدید را وارد کنید"
// //               {...register("confirmPassword", {
// //                 required: "تکرار رمز عبور جدید الزامی است",
// //                 validate: (value) =>
// //                   value === newPassword ||
// //                   "رمز عبور جدید و تکرار آن یکسان نیست",
// //               })}
// //               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //             {errors.confirmPassword && (
// //               <p className="mt-1 text-xs text-red-500">
// //                 {errors.confirmPassword.message}
// //               </p>
// //             )}
// //           </div>

// //           {/* Display mismatch error on the fly */}
// //           {isPasswordMismatch && (
// //             <p className="text-xs text-red-500 text-center">
// //               رمز عبور جدید و تکرار آن یکسان نیست
// //             </p>
// //           )}

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={isSubmitting || isPasswordMismatch || !isValid}
// //             className="w-full py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
// //           >
// //             {isSubmitting ? "در حال ارسال..." : "تغییر رمز عبور"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// "use client"; // For Next.js 13+ App Router
// import React, { Suspense } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Config from "@/components/config";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// function ChangePassword() {
//   const router = useRouter();
//   const token = localStorage.getItem("token");

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting, isValid },
//   } = useForm({ mode: "onChange" });

//   const newPassword = watch("newPassword", "");
//   const confirmPassword = watch("confirmPassword", "");

//   const isPasswordMismatch =
//     confirmPassword.length > 0 && newPassword !== confirmPassword;

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("password", data.oldPassword);
//       formData.append("newpassword", data.newPassword);

//       const response = await axios.post(
//         `${Config.apiUrl}/user/password`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200 && response.data.code === 1) {
//         console.log("Password changed successfully!");
//         router.push("/userPanel");
//       } else {
//         console.error(
//           "Failed to change password:",
//           response.data.message || response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           تغییر رمز عبور
//         </h1>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Old Password */}
//           <div>
//             <label
//               htmlFor="oldPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               رمز عبور فعلی
//             </label>
//             <input
//               id="oldPassword"
//               type="password"
//               placeholder="رمز عبور فعلی را وارد کنید"
//               {...register("oldPassword", {
//                 required: "رمز عبور فعلی الزامی است",
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.oldPassword && (
//               <p className="mt-1 text-xs text-red-500">
//                 {errors.oldPassword.message}
//               </p>
//             )}
//           </div>

//           {/* New Password */}
//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               رمز عبور جدید
//             </label>
//             <input
//               id="newPassword"
//               type="password"
//               placeholder="رمز عبور جدید را وارد کنید"
//               {...register("newPassword", {
//                 required: "رمز عبور جدید الزامی است",
//                 minLength: {
//                   value: 6,
//                   message: "رمز عبور باید حداقل 6 کاراکتر باشد",
//                 },
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.newPassword && (
//               <p className="mt-1 text-xs text-red-500">
//                 {errors.newPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Confirm New Password */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               تکرار رمز عبور جدید
//             </label>
//             <input
//               id="confirmPassword"
//               type="password"
//               placeholder="تکرار رمز عبور جدید را وارد کنید"
//               {...register("confirmPassword", {
//                 required: "تکرار رمز عبور جدید الزامی است",
//                 validate: (value) =>
//                   value === newPassword ||
//                   "رمز عبور جدید و تکرار آن یکسان نیست",
//               })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1 text-xs text-red-500">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Display mismatch error on the fly */}
//           {isPasswordMismatch && (
//             <p className="text-xs text-red-500 text-center">
//               رمز عبور جدید و تکرار آن یکسان نیست
//             </p>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting || isPasswordMismatch || !isValid}
//             className="w-full py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
//           >
//             {isSubmitting ? "در حال ارسال..." : "تغییر رمز عبور"}
//           </button>

//           {/* Cancel Button */}
//           <div className="w-full py-3 text-blue-600 font-semibold rounded-md border border-blue-600 hover:bg-blue-50 transition-all">
//             <Link href="/userPanel/Profile">
//               <p className="text-center">لغو</p>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ChangePassword />
//     </Suspense>
//   );
// }

"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SecuritySettings() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({ mode: "onChange" }); // Enable validation on form value change

  useAuthRedirect();

  // State to store user data (retrieved from localStorage)
  const [user, setUser] = useState(null);
  // State to track the OTP toggle; default to false.
  const [isOtp, setIsOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // On mount, retrieve user data from localStorage and update states
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUser(userData);
        // If userData.auth exists, set the OTP checkbox accordingly.
        setIsOtp(!!userData.auth);
      }
    }
  }, []);

  const handleOtp = async () => {
    // Toggle the checkbox value
    const newDisplayValue = !isOtp;
    setIsOtp(newDisplayValue);

    // Update user.auth in state and localStorage if user data exists
    if (user && typeof window !== "undefined") {
      const updatedUser = { ...user, auth: newDisplayValue };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }

    // Get token from localStorage (only on client)
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }

    if (newDisplayValue) {
      // Enabling OTP: send GET request to /user/activeauth
      try {
        const response = await axios.get(`${Config.apiUrl}/user/activeauth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          router.push("/userPanel/OtpLogin");
        } else {
          console.error(
            "Failed to activate OTP:",
            response.data.message || response.statusText
          );
        }
      } catch (error) {
        console.error("Error activating OTP:", error);
      }
    } else {
      // Disabling OTP: send GET request to /user/disableauth
      try {
        const response = await axios.get(`${Config.apiUrl}/user/disableauth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          console.log("OTP disabled successfully");
          // Optionally update UI or state here if needed
        } else {
          console.error(
            "Failed to disable OTP:",
            response.data.message || response.statusText
          );
        }
      } catch (error) {
        console.error("Error disabling OTP:", error);
      }
    }
  };

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3">
        <Link href="/userPanel/Profile">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          تنظیمات امنیتی
        </h1>
      </div>

      {/* Change Password Section */}
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

      {/* OTP Activation Section */}
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
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full
              dark:bg-gray-300 peer-checked:bg-[#001A80] relative after:content-[''] 
              after:absolute after:top-0.5 after:left-[2px] after:bg-white 
              after:border-gray-300 after:border after:rounded-full after:h-5 
              after:w-5 after:transition-all peer-checked:after:translate-x-full 
              peer-checked:after:border-white"
          />
        </label>
      </div>

      {/* MODAL - Opens on Info Click */}
    </div>
  );
}
