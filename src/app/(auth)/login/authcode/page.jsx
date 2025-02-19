"use client";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import { InputOtp } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function OtpCodeLogin({ isOpen, onClose, phone, password }) {
  const { redirectTo } = useRedirect();

  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  // Start timer countdown and change view when time expires
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

  // Update otpValue whenever the InputOtp value changes
  useEffect(() => {
    onOtpChange(value);
  }, [value]);

  const onOtpChange = (otp) => {
    setOtpValue(otp);
  };

  // Function to send OTP for verification
  const submitOtp = async () => {
    try {
      const formData = new FormData();
      formData.append("code", otpValue);
      formData.append("phone", phone);
      const token = localStorage.getItem("token");

      const res = await axios.post(`${Config.apiUrl}/auth/authcode`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.code === 1) {
        // Redirect to profile on success

        localStorage.setItem("token", res.data.token);

        redirectTo("/userPanel");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("password", password);

      const res = await axios.post(`${Config.apiUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeLeft(60);
      setIsVisible(true);
      setShowNewDiv(false);
      if (res.data.code === 321) {
        // Reset the timer and show the OTP input again.
        // setTimeLeft(60);
        // setIsVisible(true);
        // setShowNewDiv(false);
      } else {
        alert(res.data.error || "خطا در ارسال مجدد کد");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  // Do not render the modal if isOpen is false.
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg z-10 w-11/12 max-w-md p-6">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">کد تایید</h4>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>
        {phone && (
          <p className="text-sm text-gray-600 mt-2">شماره تلفن: {phone}</p>
        )}
        <div dir="ltr" className="flex flex-col items-center gap-4 mt-4">
          <InputOtp
            length={5}
            value={value}
            onValueChange={(val) => {
              setValue(val);
              onOtpChange(val);
            }}
            size="lg"
            variant="bordered"
          />
          {isVisible ? (
            <div>
              <p className="text-sm">زمان باقی‌مانده: {timeLeft} ثانیه</p>
            </div>
          ) : (
            showNewDiv && (
              <div className="flex gap-1 items-center cursor-pointer">
                <button
                  onClick={handleResendCode}
                  className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
                >
                  ارسال مجدد
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/again.svg"}
                    alt="again"
                    className="inline ml-1"
                  />
                </button>
                <p className="text-sm text-red-400">کد شما منقضی شده است</p>
              </div>
            )
          )}
          <button
            onClick={submitOtp}
            className="w-24 py-2 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all"
          >
            ارسال کد
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpCodeLogin;
