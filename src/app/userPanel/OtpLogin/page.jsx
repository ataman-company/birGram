"use client";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import { InputOtp } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

function ActivingCode() {
  const { redirectTo } = useRedirect();
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isOtp, setIsOtp] = useState(false);

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

  // Function to send OTP for verification (called on "ارسال کد")
  const submitOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("code", otpValue);

      const res = await axios.post(
        `${Config.apiUrl}/user/activeauthlast`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 1) {
        // For example, proceed to the next step and set the

        redirectTo("/userPanel/Profile");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // Update otpValue whenever the InputOtp value changes
  useEffect(() => {
    onOtpChange(value);
  }, [value]);

  const onOtpChange = (otp) => {
    setOtpValue(otp);
  };

  // New: When the user clicks on the expired message area,
  // send a GET request to /user/activewauth to resend the OTP.
  const handleResendCode = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.apiUrl}/user/activeauth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code === 1) {
        // Optionally show a success message
        // Reset the timer and show the OTP input again
        setTimeLeft(60);
        setIsVisible(true);
        setShowNewDiv(false);
      } else {
        alert(res.data.error || "خطا در ارسال مجدد کد");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div dir="ltr" className="flex flex-col items-center gap-2">
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
            <div className="my-div">
              <p className="text-sm">زمان باقی‌مانده: {timeLeft} ثانیه</p>
            </div>
          ) : (
            showNewDiv && (
              // Wrap the resend area with an onClick to trigger the GET request.
              <div className="flex gap-1 items-center cursor-pointer">
                <button
                  onClick={handleResendCode}
                  variant="bordered"
                  color="primary"
                >
                  ارسال مجدد
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/again.svg"}
                    alt="again"
                  />
                </button>
                <p className="text-sm text-red-400">کد شما منقضی شده است</p>
              </div>
            )
          )}
          <button
            onClick={submitOtp}
            className="w-[100px] py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            ارسال کد
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivingCode;
