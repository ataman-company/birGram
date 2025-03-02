"use client";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Config from "@/components/config";
import toast, { Toaster } from "react-hot-toast";
import useRedirect from "@/app/hooks/useRedirect";

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { redirectTo } = useRedirect();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("توکنی در حافظه مرورگر یافت نشد.");
      return;
    }

    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("pasword", data.newPassword);

    try {
      const response = await axios.post(
        `${Config.apiUrl}/user/password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code == 1) {
        toast.success("رمز عبور با موفقیت به‌روزرسانی شد!");
        redirectTo("/userPanel");
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("تغییر رمز عبور با خطا مواجه شد.");
    }
  };

  return (
    <div
      className="max-w-2xl min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-200 p-4 mx-auto"
      dir="rtl"
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Card Container */}
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          تغییر رمز عبور
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              className="block font-semibold mb-2 text-gray-700"
              htmlFor="password"
            >
              رمز عبور فعلی
            </label>
            <input
              id="password"
              type="password"
              placeholder="رمز عبور فعلی خود را وارد کنید"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:border-transparent placeholder-gray-400 
                         transition-colors"
              {...register("password", {
                required: "لطفاً رمز عبور فعلی خود را وارد کنید.",
              })}
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              className="block font-semibold mb-2 text-gray-700"
              htmlFor="newPassword"
            >
              رمز عبور جدید
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="رمز عبور جدید خود را وارد کنید"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 
                         focus:border-transparent placeholder-gray-400 
                         transition-colors"
              {...register("newPassword", {
                required: "لطفاً رمز عبور جدید خود را وارد کنید.",
                minLength: {
                  value: 8,
                  message: "رمز عبور جدید باید حداقل ۸ کاراکتر داشته باشد.",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300
                       active:bg-blue-800 active:scale-95 
                       transition-all duration-200 text-lg"
          >
            تغییر رمز عبور
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={() => redirectTo("/userPanel/Profile")}
            className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg 
                       hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300
                       active:bg-red-800 active:scale-95 
                       transition-all duration-200 text-lg"
          >
            بازگشت
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
