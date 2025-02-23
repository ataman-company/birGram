"use client";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import MyDatePicker from "./MyDatePicker";
import useRedirect from "@/app/hooks/useRedirect";
import UserPanelDatePicker from "../userPanel/UserPanelDatePicker";

function Authentication({
  phone,
  submitUser,
  setfName,
  setlName,
  setnCode,
  setDateBirth,
}) {
  const { redirectTo } = useRedirect();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      nationalCode.trim() !== "" &&
      dateOfBirth !== null
    );
  };
  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative h-4">
          <div className="absolute h-1 w-full ml-2 top-1/2 bg-green-400"></div>
          <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
            <p className="pl-2 bg-white text-green-600">ثبت نام</p>
            <p className="px-4 bg-white text-green-600">کد فعال‌سازی</p>
            <p className="mx-2 px-4 bg-white text-green-600">رمز عبور</p>
            <p className="px-4 bg-white text-black">احراز هویت</p>
          </div>
        </div>
        <p className="text-lg">احراز هویت</p>
        <Input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setfName(e.target.value);
          }}
          type="text"
          variant="bordered"
          label="نام"
        />
        <Input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setlName(e.target.value);
          }}
          type="text"
          variant="bordered"
          label="نام و نام خانوادگی"
        />
        <div className="w-full flex">
          <p>تاریخ تولد:</p>
          <UserPanelDatePicker setdate={setDateBirth} />
        </div>
        <Input
          type="number"
          value={nationalCode}
          onChange={(e) => {
            setNationalCode(e.target.value);
            setnCode(e.target.value);
          }}
          variant="bordered"
          label="کد ملی"
        />
        <Input
          value={phone}
          color={"primary"}
          label="شماره موبایل"
          type="number"
          size="lg"
          variant="bordered"
          errorMessage="فیلد اجباری"
          disabled={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          color="primary"
          onClick={() => {
            submitUser();
            redirectTo("/userPanel");
          }}
        >
          ثبت اطلاعات
        </Button>
        <Link
          href={"/userPanel"}
          className="bg-gray-300 p-2 rounded-lg text-center text-sm"
        >
          رد کردن
        </Link>
      </div>
    </div>
  );
}

export default Authentication;
