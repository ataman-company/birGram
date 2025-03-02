"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Config from "@/components/config";
import useRedirect from "@/app/hooks/useRedirect";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const { redirectTo } = useRedirect();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState(null);
  const { register, handleSubmit, setError } = useForm();

  // Handle API call for step 1 (sending phone number)
  const sendPhoneNumber = async (data) => {
    // setPhone(data);
    // setStep(2);

    try {
      const formData = new FormData();

      formData.append("phone", data.phone);
      const response = await axios.post(
        `${Config.apiUrl}/auth/forgot`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.code === 1) {
        setPhone(data.phone);
        setStep(2);
      }
    } catch (error) {
      setError("phone", {
        message: "خطا در ارسال شماره تلفن. لطفا دوباره تلاش کنید.",
      });
    }
  };

  // Handle API call for step 2 (sending phone and OTP)
  const sendOTP = async (data) => {
    try {
      const formData = new FormData();

      formData.append("phone", phone);
      formData.append("code", data.otp);
      const response = await axios.post(
        `${Config.apiUrl}/auth/forgotcode`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code === 1) {
        setToken(response.data.token);
        setStep(3);
      }
    } catch (error) {
      setError("otp", {
        message: "خطا در تایید کد OTP. لطفا دوباره تلاش کنید.",
      });
    }
  };

  // Handle API call for step 3 (saving new password)
  const savePassword = async (data) => {
    try {
      const formData = new FormData();

      formData.append("password", data.password);
      formData.append("token", token);
      const response = await axios.post(
        `${Config.apiUrl}/auth/savepassword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code === 1) {
        localStorage.setItem("token", response.data.user.token);

        toast.success("رمز عبور با موفقیت به‌روزرسانی شد!");
        redirectTo("/userPanel");
      }
    } catch (error) {
      setError("password", {
        message: "خطا در ذخیره رمز عبور. لطفا دوباره تلاش کنید.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-3xl shadow-lg">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl text-center font-bold text-teal-700 mb-8">
        فراموشی رمز عبور
      </h2>

      {step === 1 && (
        <form onSubmit={handleSubmit(sendPhoneNumber)} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              شماره تلفن خود را وارد کنید
            </label>
            <input
              type="text"
              placeholder="شماره تلفن"
              {...register("phone", { required: "شماره تلفن الزامی است" })}
              className="w-full p-4 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder-gray-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300 transform hover:scale-105"
          >
            ارسال رمز یک بار مصرف{" "}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(sendOTP)} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              شماره تلفن خود را وارد کنید
            </label>
            <input
              type="text"
              placeholder="شماره تلفن"
              disabled={true}
              {...register("phone", { required: "شماره تلفن الزامی است" })}
              className="w-full p-4 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder-gray-500 transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              رمز یک بار مصرف خود را وارد کنید
            </label>
            <input
              type="text"
              placeholder="رمز یک بار مصرف"
              {...register("otp", { required: "رمز یک بار مصرف الزامی است" })}
              className="w-full p-4 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder-gray-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300 transform hover:scale-105"
          >
            تایید رمز یک بار مصرف و ادامه
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit(savePassword)} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              رمز عبور جدید را وارد کنید
            </label>
            <input
              type="password"
              placeholder="رمز عبور جدید"
              {...register("password", { required: "رمز عبور الزامی است" })}
              className="w-full p-4 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder-gray-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition duration-300 transform hover:scale-105"
          >
            ذخیره رمز عبور
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
