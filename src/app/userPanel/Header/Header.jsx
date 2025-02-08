import Image from "next/image";
import React from "react";

const Header = ({ currentPrice }) => {
  return (
    <div className="flex justify-between bg-blue-100 p-2 text-sm text-blue-900">
      <div className="flex items-center gap-1">
        <Image width={50} height={20} src={"/images/2.png"} alt="gold" />
        <h6 className="">قیمت لحظه‌ای ۱ میلی گرم طلای ۱۸ عیار:</h6>
      </div>
      <p>{currentPrice ? currentPrice + " ریال " : "در حال برآورد قیمت ..."}</p>
    </div>
  );
};

export default Header;
