"use client";

import useRedirect from "@/app/hooks/useRedirect";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import PhoneIcon from "@public/icons/userPanel/phone";
import RedirectIcon from "@public/icons/userPanel/redirect";

export default function AboutMili() {
  if (typeof window === "undefined") {
    return null;
  }
  const { redirectTo, goBack } = useRedirect(); // Use both redirect and goBack
  const siteName = JSON.parse(localStorage.getItem("siteName"));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col md:max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b">
        <button onClick={() => goBack("در حال بازگشت...")}>
          <ChevronRightIcon size={24} color="#333" />
        </button>
        <h1 className="flex justify-center items-center w-full text-base sm:text-lg md:text-xl font-bold">
          درباره {siteName}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col py-4">
        {/* Item 1: وبسایت میلی */}
        <div
          className="flex items-center justify-between py-3 border-b cursor-pointer"
          onClick={() => redirectTo("/", "به وبسایت میلی خوش آمدید")}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">وبسایت {siteName}</span>
          </div>
          <RedirectIcon size={24} color="#666" />
        </div>

        {/* Item 2: مشاهده مجوزها */}
        <div
          className="flex items-center justify-between py-3 border-b cursor-pointer"
          onClick={() => redirectTo("/licenses", "در حال مشاهده مجوزها")}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">مشاهده مجوزها</span>
          </div>
          <RedirectIcon size={24} color="#666" />
        </div>

        {/* Item 3: شماره پشتیبانی */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">شماره پشتیبانی</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">۰۲۱-۹۱۰۰۱۵۵</span>
            <PhoneIcon size={24} color="#666" />
          </div>
        </div>
      </div>
    </div>
  );
}
