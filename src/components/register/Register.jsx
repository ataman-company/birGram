import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import Link from "next/link";

function Register({ setPhone, postData, setreferral, referral }) {
  const [checkbox, setCheckbox] = useState(false);
  const [value, setValue] = useState("");
  const [ref, setRef] = useState(referral);
  const siteName = JSON.parse(localStorage.getItem("sitename"));

  // اعتبارسنجی شماره موبایل
  const validateNumber = (value) => value.match(/^0[0-9]{10}$/);

  const isInvalid = useMemo(() => {
    if (value === "") return false;
    return !validateNumber(value);
  }, [value]);

  // به‌روزرسانی شماره تلفن در هنگام تغییر ورودی
  const handleValueChange = (newValue) => {
    setValue(newValue);
    setPhone(newValue); // به‌روزرسانی وضعیت شماره تلفن
  };
  const handleRefChange = (newValue) => {
    setRef(newValue);
    setreferral(newValue); // به‌روزرسانی وضعیت شماره تلفن
  };
  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative h-4">
          <div className="absolute h-1 w-full ml-2 bg-gray-300 top-1/2"></div>
          <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
            <p className="pl-2 bg-white text-black">ثبت نام</p>
            <p className="px-4 bg-white">کد فعال‌سازی</p>
            <p className="mx-2 px-4 bg-white">رمز عبور</p>
            <p className="px-4 bg-white">احراز هویت</p>
          </div>
        </div>
        <p className="text-lg">ایجاد حساب کاربری</p>
        <p className="text-gray-400">
          کد تایید به این شماره حساب ارسال خواهد شد
        </p>
        <Input
          color={isInvalid ? "danger" : "success"}
          isInvalid={isInvalid}
          label="شماره موبایل"
          type="number"
          size="lg"
          variant="bordered"
          errorMessage="فیلد اجباری"
          onValueChange={handleValueChange}
        />
        <Accordion
          itemClasses={{
            indicator: "[&>svg]:rotate-180 rtl:rotate-90",
            title: "text-blue-900 text-sm",
            heading: "bg-blue-100 rounded p-1",
            trigger: "p-0",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="کد دعوت (اختیاری)"
          >
            <Input
              label="کد دعوت"
              type="text"
              size="lg"
              variant="bordered"
              value={ref}
              onValueChange={handleRefChange}
            />
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <Checkbox
            isSelected={checkbox}
            onChange={() => setCheckbox(!checkbox)}
            classNames={{ label: "flex gap-1 items-center" }}
          >
            <span>
              قوانین و شرایط استفاده از {siteName} را خواندم و با آن موافقم
            </span>
          </Checkbox>
          <Link
            className="underline underline-offset-8 text-blue-500 text-sm"
            href={"#"}
          >
            قوانین و شرایط استفاده از {siteName}
          </Link>
        </div>
        <Button
          color="primary"
          isDisabled={!validateNumber(value) || !checkbox}
          onClick={() => {
            postData();
          }}
        >
          تایید و ادامه
        </Button>
        <div className="flex gap-1 justify-center">
          <p className="text-lg text-gray-400">حساب کاربری دارید؟</p>
          <Link href={"/login"} className="text-blue-500 text-lg">
            ورود
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
