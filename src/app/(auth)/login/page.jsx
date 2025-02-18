"use client";
import Header from "@/app/userPanel/Header/Header";
import Config from "@/components/config";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import OtpCodeLogin from "./authcode/page";

function Login() {
  const router = useRouter();
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

  // Correctly schedule the interval without invoking the function immediately.
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentPrice();
    }, 360000);
    return () => clearInterval(interval);
  }, []);

  const submitUser = async (event) => {
    event.preventDefault(); // Prevent default form submission
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
        localStorage.setItem("token", res.data.user.token);
        toast.success("به پنل کاربری خوش آمدید");
        router.push("/userPanel");
      } else if (res.data.code === 321) {
        // Instead of redirecting, open the OTP modal.
        setIsOtpModalOpen(true);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      {/* Render the OTP modal (it will render only if isOtpModalOpen is true) */}
      <OtpCodeLogin
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        phone={phone} // Pass the phone number to the OTP modal if needed
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
                    // Replace with your EyeSlashFilledIcon
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="1em"
                      className="text-2xl text-default-400 pointer-events-none"
                    >
                      {/* SVG paths for eye slash icon */}
                      <path d="..." fill="currentColor" />
                    </svg>
                  ) : (
                    // Replace with your EyeFilledIcon
                    <svg
                      aria-hidden="true"
                      fill="none"
                      focusable="false"
                      height="1em"
                      role="presentation"
                      viewBox="0 0 24 24"
                      width="1em"
                      className="text-2xl text-default-400 pointer-events-none"
                    >
                      {/* SVG paths for eye icon */}
                      <path d="..." fill="currentColor" />
                    </svg>
                  )}
                </button>
              }
              label="رمز عبور"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <Link href={"#"} className="text-blue-500">
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
            <Link href={"/register"} className="text-blue-500 text-lg">
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
