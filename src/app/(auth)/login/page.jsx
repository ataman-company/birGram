"use client";

import Header from "@/app/userPanel/Header/Header";
import Config from "@/components/config";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import OtpCodeLogin from "./authcode/page";
import useRedirect from "@/app/hooks/useRedirect";
// Import the hook

function Login() {
  const { redirectTo } = useRedirect(); // Use redirect function
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPrice, setCurrentPrice] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const getCurrentPrice = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/lastprice`);
      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  const submitUser = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("password", pass);

      const res = await axios.post(`${Config.apiUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code === 1) {
        redirectTo(
          "/userPanel",
          "به پنل کاربری خوش آمدید",
          res.data.user.token
        );
      } else if (res.data.code === 321) {
        setIsOtpModalOpen(true);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("خطا در ورود به حساب:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <OtpCodeLogin
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        phone={phone}
        password={pass}
      />
      <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
        <div className="flex flex-col gap-4">
          <Header currentPrice={currentPrice} />
          <div className="flex gap-2 bg-yellow-50 p-3 items-center">
            <Image
              width={25}
              height={50}
              src={"/icons/warning.svg"}
              alt="warning"
            />
            <p className="text-sm">
              مطمئن شوید در دامنه https://milli.gold هستید.
            </p>
          </div>
          <form onSubmit={submitUser} className="flex flex-col gap-4">
            <h4 className="text-xl">ورود</h4>
            <Input
              type="number"
              variant="bordered"
              labelPlacement="inside"
              label="شماره تلفن"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              onChange={(e) => setPass(e.target.value)}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="text-2xl text-default-400 pointer-events-none"
                    >
                      <path d="..." fill="currentColor" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="text-2xl text-default-400 pointer-events-none"
                    >
                      <path d="..." fill="currentColor" />
                    </svg>
                  )}
                </button>
              }
              label="رمز عبور"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Link href="/forgetPassword" className="text-blue-500">
              رمز عبور خود را فراموش کرده اید؟
            </Link>
            <button
              type="submit"
              className={`text-white py-4 rounded-xl ${
                pass ? "bg-blue-900" : "bg-gray-300"
              }`}
            >
              ورود به حساب بیرگرم
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-center">
            <p className="text-lg text-gray-400">حساب کاربری ندارید؟</p>
            <Link href="/register" className="text-blue-500 text-lg">
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
