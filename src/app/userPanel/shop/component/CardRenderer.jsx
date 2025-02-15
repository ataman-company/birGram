import React from "react";
import Image from "next/image";
import Config from "@/components/config";

const CardRenderer = ({ gift }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Card Image */}
      <div className="relative w-full h-48 sm:h-56 lg:h-62 rounded-lg">
        <Image
          src={`${Config.baseUrl}/${gift.image}`}
          alt={`Gift Card ${gift.gold}`}
          layout="fill"
          objectFit="cover"
          className="w-full rounded-lg"
        />
      </div>

      {/* Card Content */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs sm:text-base md:text-lg">
              کارت هدیه {gift.gold.toLocaleString()} میلی‌
            </p>
          </div>
          <div className="mt-2">
            <p className="text-gray-700 text-xs sm:text-base md:text-lg">
              معادل: {gift.price.toLocaleString()} ریال
            </p>
          </div>
        </div>
        {/* Card Price */}
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600 text-xs sm:text-base md:text-lg">
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardRenderer;
