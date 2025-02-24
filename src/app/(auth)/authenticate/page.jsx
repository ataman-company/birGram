"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import UserPanelDatePicker from "@/components/userPanel/UserPanelDatePicker";
import Config from "@/components/config";
import Link from "next/link";

const IdentifyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [token, setToken] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const router = useRouter();

  // Load phone and token from localStorage when the component mounts
  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    const storedToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("nc", data.nationalCode);
    formData.append("name", data.firstName);
    formData.append("family", data.lastName);
    formData.append("birth", birthDate);

    try {
      const response = await axios.post(
        `${Config.apiUrl}/user/identify`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multimultipart/form-data",
          },
        }
      );

      if (response.data.code === 1) {
        router.push("/userPanel"); // Redirect to user panel
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error identifying user:", error);
      alert("خطایی رخ داده است. لطفاً دوباره امتحان کنید.");
    }
  };

  return (
    <div className=" flex max-w-2xl  items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          احراز هویت
        </h2>

        {/* Display phone number (read-only) */}

        {/* First Name Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">نام</label>
          <input
            type="text"
            {...register("firstName", { required: "نام را وارد کنید" })}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">
            نام خانوادگی
          </label>
          <input
            type="text"
            {...register("lastName", { required: "نام خانوادگی را وارد کنید" })}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* National Code Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">کد ملی</label>
          <input
            type="text"
            {...register("nationalCode", {
              required: "کد ملی را وارد کنید",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "کد ملی باید 10 رقم باشد",
              },
            })}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nationalCode && (
            <p className="text-red-500 text-sm">
              {errors.nationalCode.message}
            </p>
          )}
        </div>

        {/* Birth Date Picker */}
        <div className="mb-6">
          <span className="text-sm text-gray-600">تاریخ تولد</span>
          <UserPanelDatePicker setdate={setBirthDate} />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-colors duration-300 h-[50px] flex items-center justify-center"
          >
            ارسال
          </button>
          <Link
            href="/userPanel"
            className="w-full bg-gray-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-colors duration-300 text-center h-[50px] flex items-center justify-center"
          >
            بازگشت
          </Link>
        </div>
      </form>
    </div>
  );
};

export default IdentifyForm;
