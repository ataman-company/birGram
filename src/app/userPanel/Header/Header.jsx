"use client";
import Config from "@/components/config";
import Image from "next/image";
import React from "react";

const Header = ({ currentPrice }) => {
  const formattedPrice = currentPrice
    ? new Intl.NumberFormat("fa-IR").format(currentPrice) + " ریال "
    : "در حال برآورد قیمت ...";

  const options = JSON.parse(localStorage.getItem("Options"));

  return (
    <div className="flex justify-between bg-blue-100 p-2 text-sm text-blue-900">
      <div className="flex items-center gap-1">
        <Image
          width={50}
          height={20}
          src={`${Config.baseUrl}/${options.logo}`}
          alt="gold"
        />
        <h6 className="flex items-center text-xs sm:text-sm">
          قیمت لحظه‌ای ۱ میلی گرم طلای ۱۸ عیار:
        </h6>
      </div>
      <p className="flex items-center text-xs sm:text-sm">{formattedPrice}</p>
    </div>
  );
};

export default Header;
