"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Example icon components (you can replace these with your own SVG icons)
const ChevronRightIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={color}
    className={`w-${size} h-${size}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const CopyIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={color}
    className={`w-${size} h-${size}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9.75l-9 9m9-9H9.75M15 6.75V3.75a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 3.75v12.75a2.25 2.25 0 002.25 2.25h3.75"
    />
  </svg>
);

const PhoneIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={color}
    className={`w-${size} h-${size}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 2.25l5.757 5.757m2.121 2.121l5.757 5.757m-7.07-2.828l5.657-5.657a2.121 2.121 0 013 3l-5.657 5.657a2.121 2.121 0 01-3 0z"
    />
  </svg>
);

export default function AboutMili() {
  const router = useRouter();

  // For demonstration: copying text to clipboard
  const handleCopyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`"${text}" کپی شد!`))
      .catch(() => alert("خطا در کپی کردن"));
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between py-4 px-4 border-b">
        <h1 className="text-lg font-bold">درباره میلی</h1>
        {/* Back button example (if you want to navigate back) */}
        <button onClick={() => router.back()}>
          <ChevronRightIcon size={6} color="#333" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col px-4 py-2">
        {/* Item 1: وبسایت میلی */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyText("https://mili.ir")}
              className="p-1"
            >
              <CopyIcon size={5} color="#666" />
            </button>
            <span className="text-sm">وبسایت میلی</span>
          </div>
          {/* Optional: Another icon or arrow on the right */}
        </div>

        {/* Item 2: مشاهده مجوزها */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopyText("مجوزهای میلی")}
              className="p-1"
            >
              <CopyIcon size={5} color="#666" />
            </button>
            <span className="text-sm">مشاهده مجوزها</span>
          </div>
          {/* Optional: Another icon or arrow on the right */}
        </div>

        {/* Item 3: شماره پشتیبانی */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <PhoneIcon size={5} color="#666" />
            <span className="text-sm">شماره پشتیبانی</span>
          </div>
          <span className="text-sm text-gray-600">۰۲۱-۹۱۰۰۱۵۵</span>
        </div>
      </div>
    </div>
  );
}
