"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import Config from "@/components/config";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SecuritySettings() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({ mode: "onChange" }); // Enable validation on form value change

  useAuthRedirect();

  // State to store user data (retrieved from localStorage)
  const [user, setUser] = useState(null);
  // State to track the OTP toggle; default to false.
  const [isOtp, setIsOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // On mount, retrieve user data from localStorage and update states
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      // If userData.auth exists, set the OTP checkbox accordingly.
      setIsOtp(!!userData.auth);
    }
  }, []);

  const handleOtp = async () => {
    // Toggle the checkbox value
    const newDisplayValue = !isOtp;
    setIsOtp(newDisplayValue);

    // Update user.auth in state and localStorage if user data exists
    if (user) {
      const updatedUser = { ...user, auth: newDisplayValue };
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    }

    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (newDisplayValue) {
      // Enabling OTP: send GET request to /user/activeauth
      try {
        const response = await axios.get(`${Config.apiUrl}/user/activeauth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          router.push("/userPanel/OtpLogin");
        } else {
          console.error(
            "Failed to activate OTP:",
            response.data.message || response.statusText
          );
        }
      } catch (error) {
        console.error("Error activating OTP:", error);
      }
    } else {
      // Disabling OTP: send GET request to /user/disableauth
      try {
        const response = await axios.get(`${Config.apiUrl}/user/disableauth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200 && response.data.code === 1) {
          console.log("OTP disabled successfully");
          // Optionally update UI or state here if needed
        } else {
          console.error(
            "Failed to disable OTP:",
            response.data.message || response.statusText
          );
        }
      } catch (error) {
        console.error("Error disabling OTP:", error);
      }
    }
  };

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3">
        <Link href="/userPanel/Profile">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          تنظیمات امنیتی
        </h1>
      </div>

      {/* Change Password Section */}
      <div>
        <Link
          href="/userPanel/setting/ChangePassword"
          className="text-sm text-gray-500 pb-2"
        >
          <div className="flex justify-between border-b border-gray-200 px-1 py-3">
            تغییر رمز عبور
            <ChevronLeftIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
          </div>
        </Link>
      </div>

      {/* OTP Activation Section */}
      <div className="flex items-center justify-between py-4">
        <p className="text-gray-800">فعال کردن ورود دو مرحله ای</p>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isOtp}
            onChange={handleOtp}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full
              dark:bg-gray-300 peer-checked:bg-[#001A80] relative after:content-[''] 
              after:absolute after:top-0.5 after:left-[2px] after:bg-white 
              after:border-gray-300 after:border after:rounded-full after:h-5 
              after:w-5 after:transition-all peer-checked:after:translate-x-full 
              peer-checked:after:border-white"
          />
        </label>
      </div>

      {/* MODAL - Opens on Info Click */}
    </div>
  );
}
