"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Config from "@/components/config";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

function page() {
  if (typeof window === "undefined") {
    return null;
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const siteName = JSON.parse(localStorage.getItem("siteName"));
  const data = JSON.parse(localStorage.getItem("Options"));
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("text", data.message);

    try {
      const response = await axios.post(
        `${Config.apiUrl}/sendcontact`,
        formData
      );
      if (response.data.code === 1) {
        toast.success("پیام شما با موفقیت ارسال شد.");
        reset();
      } else {
        alert("خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("خطای سیستمی رخ داده است. لطفا بعدا تلاش کنید.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-blue-50">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800">
          <div className="container pb-3 mx-auto relative px-3">
            <Header />
          </div>
        </div>
        <section className="my-4 flex flex-col gap-3 container mx-auto px-20">
          <h1 className="text-2xl text-blue-900 font-bold">اطلاعات تماس</h1>
          <div className="w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <p>لطفا قبل از تماس، ابتدا پرسش‌‌های متداول را مشاهده کنید.</p>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="text"
              classNames={{ inputWrapper: "bg-white border" }}
              label="نام و نام خانوادگی"
              {...register("name", {
                required: "نام و نام خانوادگی الزامی است",
              })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <Input
              type="number"
              classNames={{ inputWrapper: "bg-white border" }}
              label="شماره تماس"
              {...register("phone", { required: "شماره تماس الزامی است" })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}

            <Input
              type="email"
              classNames={{ inputWrapper: "bg-white border" }}
              label="ایمیل"
              {...register("email", {})}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <Textarea
              classNames={{ inputWrapper: "bg-white border" }}
              label="متن شما"
              {...register("message", { required: "متن پیام الزامی است" })}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}

            <Button className="bg-blue-950 text-white" type="submit">
              ثبت و ارسال
            </Button>
          </form>

          <h1 className="text-2xl text-blue-900 font-bold">اطلاعات تماس </h1>
          <div className="w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <h1 className="text-2xl text-blue-900 font-bold">آدرس دفتر</h1>
          <p>{data.address}</p>
          <div className="p-10 bg-gray-200 flex flex-col gap-1 items-center rounded-2xl mx-20">
            <Image
              width={34}
              height={34}
              src={"/icons/email2.svg"}
              alt="email"
            />
            <h1 className="text-2xl text-blue-900 font-bold">
              ایمیل مکاتبات اداری
            </h1>
            <span>{data.email}</span>
          </div>

          <div className="flex flex-wrap gap-y-5">
            <div className="flex justify-center w-full">
              <Link
                href="/userPanel/goldTrade"
                className="flex justify-center items-center px-6 py-3 bg-white border border-blue-500 text-blue-500 rounded-lg text-sm font-medium text-center"
              >
                خرید طلای آبشده
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default page;
