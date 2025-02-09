"use client";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import Image from "next/image";
import Link from "next/link";

export default function GiftCard() {
  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3 ">
        <Link href="/userPanel/ServicePage">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          دریافت طلا
        </h1>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mt-4">
        <Image
          src="/images/userPanel/gift-card.png"
          alt="Gift Card"
          width={200}
          height={200}
        />
      </div>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 leading-relaxed">
        با کارت هدیه میلی، بدون دردسر به دوستان و عزیزان خود طلا هدیه دهید.
      </p>

      {/* Learn More */}
      <p className="text-center text-sm text-gray-500 mt-2">
        اطلاعات بیشتر:
        <Link href="#" className="text-blue-500 underline mx-1">
          اینجا
        </Link>
      </p>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-500 mt-4 px-6">
        کارت هدیه پس از تاریخ درج شده روی آن منقضی شده و در صورت عدم استفاده،
        موجودی آن صرف امور خیریه می‌شود.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="w-full bg-yellow-400 text-black p-4 rounded-xl text-center font-semibold">
          می‌خواهم میلی هدیه بدهم
        </button>
        <button className="w-full bg-blue-900 text-white p-4 rounded-xl text-center font-semibold">
          هدیه گرفته‌ام
        </button>
      </div>
    </div>
  );
}
