"use client";
import Config from "@/components/config";
import ActivingCode from "@/components/register/ActivingCode";
import Authentication from "@/components/register/Authentication";
import Password from "@/components/register/Password";
import Register from "@/components/register/Register";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [phone, setPhone] = useState(0);
  const [step, setStep] = useState(0);
  const [otpValue, setOtpValue] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setreferral] = useState("");
  const [token, setToken] = useState(0);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [nCode, setnCode] = useState("");
  const [dateBirth, setDateBirth] = useState(null);

  const postData = async () => {
    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("referral", referral);
      const res = await axios.post(`${Config.apiUrl}/auth/phone`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code == 1) {
        toast.success("کد ارسال شد");
        setStep(1);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  const submitOtp = async () => {
    try {
      const formData = new FormData();
      formData.append("code", otpValue); // اضافه کردن OTP به فرم
      formData.append("phone", phone); // در صورت نیاز، شماره تلفن را نیز ارسال کنید

      const res = await axios.post(`${Config.apiUrl}/auth/code`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.code === 1) {
        setStep(2);
        setToken(res.data.user.token);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  const submitPassword = async () => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("password", password);

      const res = await axios.post(
        `${Config.apiUrl}/auth/savepassword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.code === 1) {
        localStorage.setItem("token", res.data.user.token);
        setStep(3);
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };
  const submitUser = async () => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("nc", nCode);
      formData.append("name", fName);
      formData.append("family", lName);
      formData.append("birth", dateBirth);
      const res = await axios.post(`${Config.apiUrl}/user/identify`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      if (res.data.code === 1) {
        window.location.href = "/userPanel";
        toast.success("به پنل کاربری خوش آمدید");
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
    }
  };

  const handleOtpChange = (otp) => {
    setOtpValue(otp);
  };

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      {step === 0 && (
        <Register
          setStep={setStep}
          setPhone={setPhone}
          postData={postData}
          setreferral={setreferral}
        />
      )}
      {step === 1 && (
        <ActivingCode
          setStep={setStep}
          phone={phone}
          onOtpChange={handleOtpChange}
          submitOtp={submitOtp}
        />
      )}
      {step === 2 && (
        <Password setPassword={setPassword} submitPassword={submitPassword} />
      )}
      {step === 3 && (
        <Authentication
          setStep={setStep}
          setfName={setfName}
          setlName={setlName}
          setnCode={setnCode}
          setDateBirth={setDateBirth}
          phone={phone}
          submitUser={submitUser}
        />
      )}
    </>
  );
}
export default Login;
