"use client";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import GiftIcon from "@public/icons/userPanel/giftIcon";
import ReferralIcon from "@public/icons/userPanel/referral";
import { Copy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const InviteFriends = () => {
  const { goBack } = useRedirect();
  const [inviteCode, setInviteCode] = useState("");

  // Fetch user referral code when component mounts
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setInviteCode(parsedData?.referral || "کدی یافت نشد");
      } catch (error) {
        console.error("Error parsing userData:", error);
        setInviteCode("کدی یافت نشد");
      }
    }
  }, []);

  const handleCopy = (type) => {
    if (!inviteCode || inviteCode === "کدی یافت نشد") {
      toast.error("کد دعوتی برای کپی وجود ندارد!");
      return;
    }

    let textToCopy = inviteCode; // Default: Only invite code
    if (type === "link") {
      textToCopy = `${Config.baseUrl}/register?referral=${inviteCode}`;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      // ✅ Use Clipboard API if available
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => toast.success("کپی شد!"))
        .catch(() => fallbackCopy(textToCopy));
    } else {
      // ❌ If clipboard API is not available, use fallback
      fallbackCopy(textToCopy);
    }
  };

  // 📌 Fallback method for older browsers and Safari
  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("کپی شد!");
  };

  return (
    <div className="bg-[#EEF3FF] min-h-screen py-6 px-4 max-w-2xl mx-auto">
      <Toaster position="top-center" />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => goBack()}>
          <ChevronRightIcon fill="rgb(59 130 246 / .5)" size={24} />
        </button>
        <h2 className="text-lg font-semibold text-center w-full">
          دعوت از دوستان
        </h2>
      </div>

      {/* Image Section */}
      <div className="flex justify-center">
        <Image
          src="/images/userPanel/gift-box.png"
          alt="Invite Gift"
          width={150}
          height={150}
        />
      </div>

      {/* Reward Text */}
      <p className="text-center text-lg mt-4 font-bold text-gray-800">
        با دعوت از دوستان، تا <span className="text-blue-500">2500</span>{" "}
        میلی‌گرم طلا جایزه ببر!
      </p>

      {/* Invite Code Section */}
      <div className="bg-white rounded-xl p-3 mt-6 flex items-center justify-between shadow-md">
        <Copy
          size={20}
          className="text-gray-500 cursor-pointer z-50"
          onClick={() => handleCopy("code")}
        />
        <span className="text-gray-700 font-medium">{inviteCode}</span>
        <button
          onClick={() => handleCopy("link")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm z-50"
        >
          ارسال کد دعوت
        </button>
      </div>

      {/* Explanation Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800">توضیحات:</h3>
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          شما می‌توانید پس از انجام فرآیند احراز هویت، با ارسال کد دعوت به ۵۰۰
          نفر از دوستان خود، مجموعاً تا ۲۵۰۰ میلی‌گرم طلا ببرید! این جایزه پس از
          ثبت نام و احراز هویت تمامی دوستان دعوت‌شده، به حساب شما واریز خواهد
          شد.
        </p>
      </div>

      {/* Steps Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800">چطور پاداش دریافت کنیم؟</h3>
        <ul className="text-gray-600 text-sm leading-relaxed mt-2 space-y-2">
          <li>1. اشتراک‌گذاری لینک دعوت</li>
          <li>2. ثبت نام و احراز هویت در میلی</li>
          <li>3. دریافت پاداش</li>
        </ul>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
          <ReferralIcon size={40} />
          <p className="text-gray-800 font-semibold mt-2">۰ نفر</p>
          <p className="text-xs text-gray-500">دعوت‌های انجام‌شده</p>
        </div>
        <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center shadow-md">
          <GiftIcon size={40} />
          <p className="text-gray-800 font-semibold mt-2">0 میلی</p>
          <p className="text-xs text-gray-500">میزان هدیه دریافت‌شده</p>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
