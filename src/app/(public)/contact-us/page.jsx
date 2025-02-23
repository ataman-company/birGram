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

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const siteName = JSON.parse(localStorage.getItem("sitename"));
  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/sendcontact`,
        formData
      );
      if (response.status === 200) {
        alert("پیام شما با موفقیت ارسال شد.");
      } else {
        alert("خطا در ارسال پیام. لطفا دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      alert("خطای سیستمی رخ داده است. لطفا بعدا تلاش کنید.");
    }
  };

  return (
    <>
      <div className="bg-blue-50">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800">
          <div className="container pb-3 mx-auto relative px-3">
            <Header />
          </div>
        </div>
        <section className="my-4 flex flex-col gap-3 container mx-auto px-20">
          <h1 className="text-2xl text-blue-900 font-bold">
            تماس با {siteName}
          </h1>
          <div className="w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <p>
            لطفا قبل از تماس با {siteName}، ابتدا پرسش‌‌های متداول را مشاهده
            کنید.
          </p>
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
              {...register("email", { required: "ایمیل الزامی است" })}
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

          <h1 className="text-2xl text-blue-900 font-bold">
            اطلاعات تماس با {siteName}
          </h1>
          <div className="w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <h1 className="text-2xl text-blue-900 font-bold">
            آدرس دفتر بیر گرم
          </h1>
          <p>
            تهران، بلوار نلسون ماندلا، نرسیده به چهارراه جهان کودک کوچه ناوک،
            پلاک ۶، طبقه ۱
          </p>
          <div className="p-10 bg-gray-200 flex flex-col gap-1 items-center rounded-2xl mx-20">
            <Image
              width={34}
              height={34}
              src={"/icons/email2.svg"}
              alt="email"
            />
            <h1 className="text-2xl text-blue-900 font-bold">
              ایمیل مکاتبات اداری {siteName}
            </h1>
            <span>info@birgeram.gold</span>
          </div>
          <h1 className="text-2xl text-blue-900 font-bold">
            خزانه تحویل و فروشگاه {siteName}
          </h1>
          <p>
            بازار بزرگ تهران، خیابان ناصرخسرو، پاساژ شمس العماره، طبقه منفی ۲،
            پلاک ۲۳۹
          </p>
          <h1 className="text-2xl text-blue-900 font-bold">
            پشتیبانی آنلاین و تلفنی {siteName}
          </h1>
          <div className="w-1/12 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <div className="flex flex-wrap gap-y-5">
            <div className="w-1/2 flex flex-col gap-2 items-center">
              <Image width={34} height={34} src={"/icons/hedset.svg"} alt="" />
              <h1 className="text-xl text-blue-900 font-bold">
                شماره تلفن پشتیبانی
              </h1>
              <p>021-91200150</p>
            </div>
            <div className="items-center w-1/2 flex flex-col gap-2">
              <Image width={34} height={34} src={"/icons/email2.svg"} alt="" />
              <h1 className="text-xl text-blue-900 font-bold">
                ایمیل پشتیبانی کاربران {siteName}
              </h1>
              <p>021-91200150</p>
            </div>
            <div className=" w-1/2 flex flex-col gap-2 items-center">
              <Image width={34} height={34} src={"/icons/phone2.svg"} alt="" />
              <h1 className="text-xl text-blue-900 font-bold">
                شماره تلفن پشتیبانی
              </h1>
              <p>021-91200150</p>
            </div>
            <div className="w-1/2 items-center flex flex-col gap-2">
              <Image
                width={34}
                height={34}
                src={"/icons/calendar2.svg"}
                alt=""
              />
              <h1 className="text-xl text-blue-900 font-bold">
                شماره تلفن پشتیبانی
              </h1>
              <p>021-91200150</p>
            </div>
            <div className="flex justify-evenly w-full">
              <Link
                href="/userPanel/goldTrade"
                className="flex justify-center items-center px-6 py-3 bg-white border border-blue-500 text-blue-500 rounded-lg text-sm font-medium text-center"
              >
                خرید طلای آب‌شده از {siteName}
              </Link>
              <Link
                href="#"
                className="flex justify-center items-center px-6 py-3 bg-white border border-blue-500 text-blue-500 rounded-lg text-sm font-medium text-center"
              >
                درباره {siteName}
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
