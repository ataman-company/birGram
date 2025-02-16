import React, { useEffect, useState } from "react";
import Image from "next/image";
import Config from "@/components/config";
import TrashIcon from "@public/icons/userPanel/trashIcon";

const CardRenderer = ({ gift, count, onChange }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(count);
  }, []);

  const handleAddClick = async () => {
    const newCount = count + 1;
    setCartCount(newCount);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("gift_id", gift.id);
    formData.append("count", newCount);

    try {
      const response = await fetch(`${Config.apiUrl}/user/giftcart/addcart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Parse JSON here
      const data = await response.json();

      if (data.code === 1) {
        // For example, if success => update totalCount in parent
        onChange((prevCount) => prevCount + 1);
      }

      if (!response.ok) {
        console.error("Error updating gift count:", response.statusText);
      } else {
        console.log("Gift count updated successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleMinusClick = async () => {
    const newCount = Math.max(count - 1, 0);
    setCartCount(newCount);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("gift_id", gift.id);
    formData.append("count", newCount);

    try {
      const response = await fetch(`${Config.apiUrl}/user/giftcart/addcart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data.code === 1) {
        onChange((prevCount) => prevCount - 1);
      }

      if (!response.ok) {
        console.error("Error updating gift count:", response.statusText);
      } else {
        console.log("Gift count updated successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Card Image */}
      <div className="relative w-full h-48 sm:h-56 lg:h-62 rounded-lg">
        <Image
          src={`${Config.baseUrl}/${gift.image}`}
          alt={`Gift Card ${gift.gold}`}
          fill
          className="w-full rounded-lg object-cover"
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col items-center justify-between">
          <p className="text-gray-500 text-xs sm:text-base md:text-lg">
            کارت هدیه {gift.gold.toLocaleString()} میلی‌
          </p>
          <p className="text-gray-700 text-xs sm:text-base md:text-lg mt-2">
            معادل: {gift.price.toLocaleString()} ریال
          </p>
        </div>

        <div className="flex items-center justify-center">
          {count === 0 ? (
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-xs sm:text-base md:text-lg"
              onClick={handleAddClick}
            >
              افزودن
            </button>
          ) : (
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
              <button className="text-lg px-2" onClick={handleAddClick}>
                +
              </button>

              <span className="mx-2 text-sm sm:text-base md:text-lg">
                {cartCount}
              </span>

              {count === 1 ? (
                <button className="text-lg px-2" onClick={handleMinusClick}>
                  <TrashIcon />
                </button>
              ) : (
                <button className="text-lg px-2" onClick={handleMinusClick}>
                  -
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardRenderer;
