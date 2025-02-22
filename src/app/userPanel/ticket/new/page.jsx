"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Config from "@/components/config";
import Link from "next/link";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
      console.log("No token found");
      return; // Handle the case where no token is found
    }

    // Create a new FormData object
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("text", data.text);

    // Send a POST request using axios with the bearer token
    try {
      const response = await axios.post(
        `${Config.apiUrl}/user/ticket/newticket`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the request is sent as form-data
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      if (response.status === 200) {
        // Redirect to the /userPanel/ticket page if the request is successful
        router.push("/userPanel/ticket");
      } else {
        // Handle error from the API
        console.log(
          "Error:",
          response.data.message || "Failed to create ticket"
        );
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 pb-5 px-2 h-screen max-w-2xl mx-auto">
      <div className="w-full text-bold text-center border-b my-3">
        ایجاد تیکت
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 m-2"
          ></label>
          <select
            id="subject"
            {...register("subject", { required: "این فیلد الزامی است" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value=""> دپارتمان مربوطه را انتخاب کنید</option>
            <option value="مالی">مالی</option>
            <option value="فنی">فنی</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-xs">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            متن تیکت
          </label>
          <textarea
            id="text"
            {...register("text", { required: "این فیلد الزامی است" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-[150px]"
          ></textarea>
          {errors.text && (
            <p className="text-red-500 text-xs">{errors.text.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ارسال تیکت
        </button>
      </form>
      <Link
        className=" mt-2 w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        href="/userPanel/ticket"
      >
        بازگشت
      </Link>
    </div>
  );
};

export default Page;
