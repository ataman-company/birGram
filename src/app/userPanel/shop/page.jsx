// import React from "react";
// import Image from "next/image";

// const GiftCardsList = () => {
//   const giftcarts = [
//     {
//       id: 1,
//       image: "images/gift/67b084057ae8b.png",
//       gold: 200,
//       price: 200000,
//     },
//     {
//       id: 2,
//       image: "images/gift/67b0845b1285e.png",
//       gold: 500,
//       price: 500000,
//     },
//     {
//       id: 5,
//       image: "images/gift/67a070ed3c3cc.png",
//       gold: 900,
//       price: 800,
//     },
//     {
//       id: 3,
//       image: "images/gift/67b084b655b6d.png",
//       gold: 1000,
//       price: 1000000,
//     },
//     {
//       id: 4,
//       image: "images/gift-card-10000.jpg",
//       gold: 10000,
//       price: 10000000,
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-screen-xl">
//       {/* Title */}
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
//         کارت هدیه
//       </h1>

//       {/* Cards Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {giftcarts.map((gift) => (
//           <div key={gift.id} className="bg-white rounded-lg shadow p-4">
//             {/* Card Image */}
//             <div className="relative w-full h-40 sm:h-48 lg:h-56">
//               <Image
//                 src={`/${gift.image}`} // e.g. "/images/gift/67b084057ae8b.png"
//                 alt={`Gift Card ${gift.gold}`}
//                 layout="fill"
//                 objectFit="cover"
//               />
//             </div>

//             {/* Card Content */}
//             <div className="mt-4 flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg sm:text-xl font-bold">{gift.gold} mg</h2>
//                 <p className="text-gray-500 text-sm sm:text-base">
//                   معادل {gift.gold} میلی‌گرم طلای 18 عیار
//                 </p>
//               </div>
//               <button className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-blue-600">
//                 افزودن
//               </button>
//             </div>

//             {/* Card Price */}
//             <div className="mt-2">
//               <p className="text-gray-700 text-sm sm:text-base">
//                 قیمت: {gift.price.toLocaleString()} ریال
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GiftCardsList;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Config from "@/components/config";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import CardRenderer from "./component/CardRenderer";

const GiftCardsList = () => {
  useAuthRedirect();
  // State to store the gift cards
  const [giftcarts, setGiftcarts] = useState([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    // Example: get token from localStorage (adjust to your auth setup)
    const fetchGiftCarts = async () => {
      try {
        const response = await axios.get(
          `${Config.apiUrl}/user/giftcart/cartlist`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add your token here
            },
          }
        );

        // Check if the response code is 1
        if (response.data.code === 1) {
          // Set the giftcarts from the response
          setGiftcarts(response.data.giftcarts);
          console.log("ok");
        } else {
          console.error("Server returned an error code:", response.data);
        }
      } catch (error) {
        console.error("Error fetching gift carts:", error);
      }
    };

    fetchGiftCarts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-xl">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        کارت هدیه
      </h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftcarts.map((gift) => (
          <CardRenderer key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  );
};

export default GiftCardsList;
