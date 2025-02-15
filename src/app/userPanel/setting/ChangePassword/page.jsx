// "use client"; // For Next.js 13+ App Router
// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Config from "@/components/config";
// import { useRouter } from "next/navigation";

// export default function ChangePassword() {
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
//         </form>
//       </div>
//     </div>
//   );
// }

"use client"; // For Next.js 13+ App Router
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Config from "@/components/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ChangePassword() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const newPassword = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const isPasswordMismatch =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("password", data.oldPassword);
      formData.append("newpassword", data.newPassword);

      const response = await axios.post(
        `${Config.apiUrl}/user/password`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.code === 1) {
        console.log("Password changed successfully!");
        router.push("/userPanel");
      } else {
        console.error(
          "Failed to change password:",
          response.data.message || response.statusText
        );
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          تغییر رمز عبور
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Old Password */}
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رمز عبور فعلی
            </label>
            <input
              id="oldPassword"
              type="password"
              placeholder="رمز عبور فعلی را وارد کنید"
              {...register("oldPassword", {
                required: "رمز عبور فعلی الزامی است",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.oldPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رمز عبور جدید
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="رمز عبور جدید را وارد کنید"
              {...register("newPassword", {
                required: "رمز عبور جدید الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تکرار رمز عبور جدید
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="تکرار رمز عبور جدید را وارد کنید"
              {...register("confirmPassword", {
                required: "تکرار رمز عبور جدید الزامی است",
                validate: (value) =>
                  value === newPassword ||
                  "رمز عبور جدید و تکرار آن یکسان نیست",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Display mismatch error on the fly */}
          {isPasswordMismatch && (
            <p className="text-xs text-red-500 text-center">
              رمز عبور جدید و تکرار آن یکسان نیست
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isPasswordMismatch || !isValid}
            className="w-full py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "در حال ارسال..." : "تغییر رمز عبور"}
          </button>

          {/* Cancel Button */}
          <div className="w-full py-3 text-blue-600 font-semibold rounded-md border border-blue-600 hover:bg-blue-50 transition-all">
            <Link href="/userPanel/Profile">
              <p className="text-center">لغو</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
