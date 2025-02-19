"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const { register, handleSubmit, setError } = useForm();

  // Handle API call for step 1 (sending phone number)
  const sendPhoneNumber = async (data) => {
    setPhone(data);
    setStep(2);

    // try {
    //   const response = await axios.post("/auth/forgot", { phone: data.phone });
    //   if (response.data.code === 1) {
    // setStep(2);
    //   }
    // } catch (error) {
    //   setError("phone", {
    //     message: "خطا در ارسال شماره تلفن. لطفا دوباره تلاش کنید.",
    //   });
    // }
  };

  // Handle API call for step 2 (sending phone and OTP)
  const sendOTP = async (data) => {
    setOtp(data.otp);
    setStep(3);

    // try {
    //   const response = await axios.post("/auth/forgotcode", {
    //     phone: data.phone,
    //     otp: data.otp,
    //   });
    //   if (response.data.code === 1) {
    //     setStep(3);
    //   }
    // } catch (error) {
    //   setError("otp", { message: "خطا در تایید کد OTP. لطفا دوباره تلاش کنید." });
    // }
  };

  // Handle API call for step 3 (saving new password)
  const savePassword = async (data) => {
    try {
      const response = await axios.post("/auth/savepassword", {
        token: data.token,
        password: data.password,
      });
      if (response.data.code === 1) {
        alert("رمز عبور با موفقیت به‌روزرسانی شد!");
      }
    } catch (error) {
      setError("password", {
        message: "خطا در ذخیره رمز عبور. لطفا دوباره تلاش کنید.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white rounded-3xl shadow-lg">
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
              توکن را وارد کنید
            </label>
            <input
              type="text"
              placeholder="توکن"
              {...register("token", { required: "توکن الزامی است" })}
              className="w-full p-4 text-lg bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 placeholder-gray-500 transition duration-300 ease-in-out"
            />
          </div>
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
