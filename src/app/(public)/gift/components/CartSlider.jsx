// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
// import axios from "axios";
// import Config from "@/components/config";
// import { Pagination, Autoplay } from "swiper/modules";

// const ImageSlider = () => {
//   const [giftCarts, setGiftCarts] = useState([]);

//   // Fetch gift carts from the server
//   useEffect(() => {
//     const fetchGiftCarts = async () => {
//       try {
//         // Get the token from localStorage
//         const token = localStorage.getItem("token"); // Make sure your token is saved as 'token' in localStorage

//         if (!token) {
//           console.error("Token is missing");
//           return;
//         }

//         // Set up the axios request with Bearer token
//         const response = await axios.get(
//           `${Config.apiUrl}/user/giftcart/cartlist`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Assuming the 'giftcarts' array contains the image, gold, and price information
//         setGiftCarts(response.data.giftcarts);
//       } catch (error) {
//         console.error("Error fetching gift carts:", error);
//       }
//     };

//     fetchGiftCarts();
//   }, []);

//   return (
//     <div style={{ width: "100%", padding: "20px 0" }}>
//       <Swiper
//         spaceBetween={30}
//         slidesPerView={3} // Adjust based on how many cards you want visible at once
//         centeredSlides={true}
//         grabCursor={true}
//         className="image-slider"
//       >
//         {giftCarts.map((gift) => (
//           <SwiperSlide key={gift.id}>
//             <div
//               style={{
//                 position: "relative",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 border: "1px solid #ddd",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               <img
//                 src={`${Config.baseUrl}/${gift.image}`} // Use the 'image' key from the API response
//                 alt={`Gift Card ${gift.id}`}
//                 style={{
//                   width: "100%",
//                   height: "auto",
//                   display: "block",
//                   borderRadius: "8px",
//                 }}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "10px",
//                   left: "10px",
//                   color: "#fff",
//                   backgroundColor: "rgba(0, 0, 0, 0.5)",
//                   padding: "5px 10px",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <h4 style={{ margin: 0 }}>{`Gold: ${gift.gold} mg`}</h4>
//                 <p
//                   style={{ margin: 0 }}
//                 >{`Price: ${gift.price.toLocaleString()} IRR`}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSlider;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import axios from "axios";
import Config from "@/components/config";
import { Pagination, Autoplay } from "swiper/modules";

const ImageSlider = () => {
  const [giftCarts, setGiftCarts] = useState([]);

  // Fetch gift carts from the server
  useEffect(() => {
    const fetchGiftCarts = async () => {
      try {
        // Get the token from localStorage

        // Set up the axios request with Bearer token
        const response = await axios.get(`${Config.apiUrl}/splash`);

        // Assuming the 'giftcarts' array contains the image, gold, and price information
        setGiftCarts(response.data.giftcarts);
      } catch (error) {
        console.error("Error fetching gift carts:", error);
      }
    };

    fetchGiftCarts();
  }, []);

  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <Swiper
        spaceBetween={30}
        slidesPerView={3} // Adjust based on how many cards you want visible at once
        centeredSlides={true}
        grabCursor={true}
        autoplay={{
          delay: 2500, // Time between slides in milliseconds
          disableOnInteraction: false, // Allows autoplay to continue after user interaction
        }}
        loop={true} // Allows looping through slides continuously
        className="image-slider"
        modules={[Autoplay, Pagination]} // Don't forget to include the Autoplay module here
      >
        {giftCarts.map((gift) => (
          <SwiperSlide key={gift.id}>
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={`${Config.baseUrl}/${gift.image}`} // Use the 'image' key from the API response
                alt={`Gift Card ${gift.id}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
