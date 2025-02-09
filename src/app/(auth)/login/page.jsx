"use client";
import Config from "@/components/config";
import { Input } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export const EyeSlashFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const EyeFilledIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );
};

function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [pass, setPass] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPrice, setCurrentPrice] = useState(false);

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
    const interval = setInterval(getCurrentPrice(), 360000);
  }, []);

  const submitUser = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("password", pass);

      const res = await axios.post(`${Config.apiUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: "Bearer " + token,
        },
      });

      if (res.data.code === 1) {
        localStorage.setItem("token", res.data.user.token);
        toast.error("به پنل کاربری خوش آمدید");
        router.push("/userPanel");
      } else {
        toast(res.data.error);
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between bg-blue-100 p-2 text-sm text-blue-900">
            <div className="flex items-center gap-1">
              <Image width={50} height={20} src={"/images/2.png"} alt="gold" />
              <h6 className="">قیمت لحظه‌ای ۱ میلی گرم طلای ۱۸ عیار:</h6>
            </div>
            <p>
              {currentPrice
                ? currentPrice + " ریال "
                : "در حال برآورد قیمت ..."}
            </p>
          </div>
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
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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
