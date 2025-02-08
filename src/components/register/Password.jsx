"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useState } from "react";

function Password({ setPassword, submitPassword }) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return (
      password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
    );
  };

  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative h-4">
          <div className="absolute h-1 w-full ml-2 top-1/2 bg-gradient-to-l from-green-500 to-gray-400 from-50% to-70%"></div>
          <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
            <p className="pl-2 bg-white text-green-600">ثبت نام</p>
            <p className="px-4 bg-white text-green-600">کد فعال‌سازی</p>
            <p className="mx-2 px-4 bg-white text-black">رمز عبور</p>
            <p className="px-4 bg-white">احراز هویت</p>
          </div>
        </div>
        <p className="text-lg">تعیین رمز عبور</p>
        <p className="text-gray-400">یک رمز برای حساب کاربری خود انتخاب کنید</p>

        <Input
          type={showPassword ? "text" : "password"}
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          label="رمز عبور"
          variant="bordered"
        />
        {!isPasswordValid(password1) && password1.length > 0 && (
          <p className="text-red-500 text-xs">پسورد نامعتبر است.</p>
        )}
        <Input
          type={showPassword ? "text" : "password"}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          label=" تکرار رمز عبور"
          variant="bordered"
        />
        {!isPasswordValid(password2) && password2.length > 0 && (
          <p className="text-red-500 text-xs">پسورد نامعتبر است.</p>
        )}
        <Checkbox
          checked={showPassword}
          onChange={handleShowPasswordChange}
          classNames={{ label: "text-sm" }}
          color="default"
        >
          نمایش رمز عبور
        </Checkbox>
      </div>
      <Button
        className="text-white"
        color={password2 && password1 ? "primary" : "default"}
        isDisabled={
          password1 === password2 &&
          password1.length >= 8 &&
          password2.length >= 8
            ? false
            : true
        }
        onClick={() => {
          setPassword(password2);
          submitPassword();
        }}
      >
        تعیین رمز عبور
      </Button>
    </div>
  );
}

export default Password;
