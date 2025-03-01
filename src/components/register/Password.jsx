"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";

function Password({ setPassword, submitPassword }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password1: "",
      password2: "",
    },
    mode: "onChange", // Validate form on change
  });

  const [showPassword, setShowPassword] = React.useState(false);

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

  const onSubmit = (data) => {
    setPassword(data.password2);
    submitPassword();
  };

  const password1 = watch("password1");
  const password2 = watch("password2");

  const isFormValid =
    isValid && password1 === password2 && isPasswordValid(password1);

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

        <Controller
          name="password1"
          control={control}
          rules={{
            required: "رمز عبور الزامی است",
            validate: (value) =>
              isPasswordValid(value) ||
              "پسورد باید شامل حروف کوچک، بزرگ، کاراکتر خاص و عدد باشد",
          }}
          render={({ field }) => (
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              label="رمز عبور"
              variant="bordered"
              errorMessage={errors.password1?.message}
              isInvalid={!!errors.password1}
            />
          )}
        />

        <Controller
          name="password2"
          control={control}
          rules={{
            required: "تکرار رمز عبور الزامی است",
            validate: (value) =>
              value === password1 || "رمز عبورها مطابقت ندارند",
          }}
          render={({ field }) => (
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              label="تکرار رمز عبور"
              variant="bordered"
              errorMessage={errors.password2?.message}
              isInvalid={!!errors.password2}
            />
          )}
        />

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
        color={isFormValid ? "primary" : "default"}
        isDisabled={!isFormValid}
        onClick={handleSubmit(onSubmit)}
      >
        تعیین رمز عبور
      </Button>
    </div>
  );
}

export default Password;
