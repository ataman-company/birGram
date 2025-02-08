import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function RecentQues() {
  return (
    <>
      <div className="flex lg:flex-row flex-col gap-5 container mx-auto">
        <div className="flex flex-col lg:w-[calc(100%/2)] gap-2">
          <div className="flex items-center gap-1">
            <Image
              width={34}
              height={24}
              src={"/icons/help/new.webp"}
              alt="new"
            />
            <span className="font-bold">سوالات اخیر</span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              چگونه بیش از سقف درگاه اینترنتی از بیرگرم بخریم؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              آموزش حذف نام کاربری و کلمه عبور ذخیره‌شده در اپلیکیشن بیرگرم
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              آموزش ذخیره نام کاربری و کلمه عبور در اپلیکیشن بیرگرم
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              از کجا شروع کنم؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              زمان‌بندی تسویه برداشت ریالی در بیرگرم چگونه است؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col lg:w-[calc(100%/2)] gap-2">
          <div className="flex items-center gap-1">
            <Image
              width={34}
              height={24}
              src={"/icons/help/bookmark.webp"}
              alt="new"
            />
            <span className="font-bold">سوالات مهم</span>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              زمان‌بندی تسویه برداشت ریالی در بیرگرم چگونه است؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              آیا بیرگرم هک شده و کلاهبرداریه؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              چطور به بیرگرم اعتماد کنم؟ آیا بیرگرم امن است؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              آموزش برداشت ریال از حساب بیرگرم
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
            <Link
              href={"#"}
              className="flex justify-between bg-white border rounded-2xl p-3 text-sm"
            >
              بیرگرم چیست و چه مزایایی دارد؟ چرا واژه بیرگرم؟
              <Image
                width={"24"}
                height={24}
                src={"/icons/help/right-arrow-angle.svg"}
                alt="left"
                className="rotate-180 scale-50"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-2 justify-between items-center p-5 bg-gray-200 container mx-auto rounded-xl mb-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold">چیزی که دنبالش بودی رو نیافتی؟</h4>
          <h6 className="text-lg">همین حالا با پشتیبانی میلی تماس بگیر و بپرس</h6>
        </div>
        <Link href={"#"} className="bg-blue-900 text-white rounded-xl p-3">تماس با پشتیبانی</Link>
      </div>
    </>
  );
}

export default RecentQues;
