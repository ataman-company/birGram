import Image from "next/image";
import { Button, InputOtp } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

function ActivingCode({ setStep, phone, onOtpChange, submitOtp }) {
  // دریافت تابع به عنوان prop
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showNewDiv, setShowNewDiv] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowNewDiv(true);
    }, 60000);

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, []);

  // فراخوانی تابع onOtpChange هنگام تغییر مقدار OTP
  useEffect(() => {
    onOtpChange(value); // ارسال مقدار OTP به کامپوننت پدر
  }, [value]);

  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative h-4">
          <div className="absolute h-1 w-full ml-2 top-1/2 bg-gradient-to-l from-green-500 to-gray-400  to-40%"></div>
          <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
            <p className="pl-2 bg-white text-green-600">ثبت نام</p>
            <p className="px-4 bg-white text-black">کد فعال‌سازی</p>
            <p className="mx-2 px-4 bg-white">رمز عبور</p>
            <p className="px-4 bg-white">احراز هویت</p>
          </div>
        </div>
        <p className="text-lg">کد فعال‌سازی</p>
        <p className="text-gray-400">
          کد ارسال شده به شماره {phone} را وارد کنید.
        </p>
        <button className="flex gap-2" onClick={() => setStep(0)}>
          <Image width={24} height={24} src={"/icons/edit.svg"} alt="edit" />
          <p className="text-sm text-indigo-600">ویرایش شماره</p>
        </button>
        <div dir="ltr" className="flex flex-col items-center gap-2">
          <InputOtp
            length={5}
            value={value}
            onValueChange={(val) => {
              setValue(val);
              onOtpChange(val); // ارسال مقدار OTP به کامپوننت پدر
            }}
            size="lg"
            variant="bordered"
          />

          {isVisible ? (
            <div className="my-div">
              <p className="text-sm">زمان باقی‌مانده: {timeLeft} ثانیه</p>
            </div>
          ) : (
            showNewDiv && (
              <div className="flex gap-1 items-center">
                <Button variant="bordered" color="primary">
                  ارسال مجدد
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/again.svg"}
                    alt="again"
                  />
                </Button>
                <p className="text-sm text-red-400">کد شما منقضی شده است</p>
              </div>
            )
          )}
          <Button onClick={submitOtp} color="primary" className="mt-4">
            ارسال کد
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ActivingCode;
