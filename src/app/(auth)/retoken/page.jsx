"use client";

import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Retoken = () => {
  const { redirectTo } = useRedirect();
  const searchParams = useSearchParams();
  // Get token from the URL query parameters
  const tokenParam = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password }) => {
    // Use the token from the URL parameter
    const token = tokenParam;
    if (!token) {
      redirectTo("/login");
      return;
    }

    try {
      // Create FormData and append password and token
      const formData = new FormData();
      formData.append("password", password);
      formData.append("token", token);

      const response = await axios.post(
        `${Config.apiUrl}/auth/retoken`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check server response
      if (response.data.code === 1) {
        toast.success("با موفقیت وارد شدید");
        localStorage.setItem("token", response.data.token);
        redirectTo("/userPanel");
      } else {
        alert(response.data.error || "خطایی رخ داده است.");
      }
    } catch (error) {
      console.error("خطا در ریکوئست retoken:", error);
      alert("خطا در ریکوئست retoken. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />

      <div className="flex h-screen items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm p-6 space-y-4 shadow rounded bg-white"
          dir="rtl"
        >
          <h1 className="text-2xl font-semibold text-center mb-4">
            لطفا رمز عبور خود را وارد کنید
          </h1>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full pr-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-right"
                {...register("password", { required: "رمز عبور اجباری است." })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-2 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  // Icon for hidden password (closed eye)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223c.113-.192.462-.383.9-.612C6.892 6.417 8.926 6 12 6c3.074 0 5.108.417 7.12 1.611.438.23.788.42.902.613M9.056 9.056a3 3 0 014.243 4.243M2.992 15c1.183 2.635 3.528 4.5 5.908 5.361C10.491 20.874 11.247 21 12 21c.853 0 1.68-.148 2.468-.436 2.379-.86 4.724-2.725 5.908-5.361a2.367 2.367 0 000-2.232c-1.184-2.635-3.529-4.5-5.908-5.361A8.069 8.069 0 0012 7.5c-.753 0-1.51.126-2.3.404-2.379.86-4.724 2.725-5.908 5.361a2.367 2.367 0 000 2.232z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18"
                    />
                  </svg>
                ) : (
                  // Icon for visible password (open eye)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.347 5.25 12 5.25c4.653 0 8.268 2.693 9.542 6.75-1.274 4.057-4.889 6.75-9.542 6.75-4.653 0-8.268-2.693-9.542-6.75z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            ارسال
          </button>
        </form>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Retoken />
    </Suspense>
  );
}
