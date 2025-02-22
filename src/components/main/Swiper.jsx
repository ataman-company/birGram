// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/swiper-bundle.css";
// import Link from "next/link";

// const Swipper = () => {
//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]} // افزودن ماژول‌ها
//         spaceBetween={20} // فاصله بین اسلایدها
//         slidesPerView={2} // تعداد اسلایدهای قابل مشاهده
//         // دکمه‌های ناوبری
//         // صفحه‌بندی قابل کلیک
//         autoplay={{ delay: 3000 }} // اسلاید خودکار با تأخیر ۳ ثانیه
//         loop // اسلاید به صورت لوپ
//         breakpoints={{
//           // تنظیمات برای اندازه‌های مختلف صفحه نمایش
//           640: {
//             slidesPerView: 2, // تعداد اسلایدها در حالت موبایل
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 3, // تعداد اسلایدها در حالت تبلت
//             spaceBetween: 30,
//           },
//           1024: {
//             slidesPerView: 4, // تعداد اسلایدها در حالت دسکتاپ
//             spaceBetween: 40,
//           },
//         }}
//       >
//         {/* اسلایدها */}
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img
//               src="/images/ettehadiyeh.png"
//               alt="Slide 2"
//               className="w-32 h-32"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img
//               src="/images/nezam-senfi.png"
//               alt="Slide 3"
//               className="w-32 h-32"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img
//               src="/images/otagh-bazargani.png"
//               alt="Slide 4"
//               className="w-32 h-32"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img
//               src="/images/samandehi.png"
//               alt="Slide 5"
//               className="w-32 h-32"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img
//               src="/images/vezarat-sanat.png"
//               alt="Slide 6"
//               className="w-32 h-32"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"#"}>
//             <img src="/images/namad2.png" alt="Slide 7" className="w-32 h-32" />
//           </Link>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default Swipper;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Config from "../config";

const data = [
  {
    id: 1,
    title: "ای نماد",
    img: '<img alt="enamad" fetchpriority="high" src="https://trustseal.enamad.ir/logo.aspx?id=482424&amp;Code=RkFt8T4Jwng9WFLRe8vEqmOTzZtlrfYA" width="140" height="140" referrerpolicy="origin" style="cursor:pointer">',
    mini: 1,
    text: 1,
  },
  {
    id: 2,
    title: "samandehi",
    img: '<img alt="logo-samandehi" fetchpriority="high" src="https://logo.samandehi.ir/logo.aspx?id=366913&amp;p=qftiwlbqwlbqbsiynbpdqfti" width="140" height="140" referrerpolicy="origin" style="cursor:pointer">',
    mini: 1,
    text: 1,
  },
  {
    id: 3,
    title: "big",
    img: "images/certificates/1.png",
    mini: 1,
    text: 0,
  },
  {
    id: 4,
    title: "123",
    img: "321",
    mini: 1,
    text: 1,
  },
];

const Swipper = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 3000 }}
        loop
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Link href={"#"}>
              <img
                src={`${Config.baseUrl}/${item.img}`}
                alt="Slide 7"
                className="w-32 h-32"
              />
              <span>{item.title}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
