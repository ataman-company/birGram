// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/swiper-bundle.css";
// import Link from "next/link";
// import Image from "next/image";

// const UserPanelSwipper = ({ slides }) => {
//   const data = [
//     { src: "/images/userPanel/1.png" },
//     { src: "/images/userPanel/2.jpg" },
//     { src: "/images/userPanel/3.jpg" },
//     { src: "/images/userPanel/4.jpg" },
//     { src: "/images/userPanel/1.png" },
//   ];

//   return (
//     <div>
//       <Swiper
//         className="panel-paginiation"
// autoplay={{
//   delay: 3000, // تأخیر بین اسلایدها
//   disableOnInteraction: false, // غیرفعال کردن اتوپلی در تعامل کاربر
// }}
//         effect="fade" // نوع انیمیشن
//         modules={[Navigation, Pagination, Autoplay]} // افزودن ماژول‌ها
//         spaceBetween={50} // فاصله بین اسلایدها
//         slidesPerView={1.6} // نمایش یک اسلاید و نیم (یک اسلاید در وسط و نیمه اسلایدهای کناری)
//         navigation // دکمه‌های ناوبری
//         loop // اسلاید به صورت لوپ
//         centeredSlides={true} // اسلاید فعلی در مرکز قرار می‌گیرد
//         pagination={{
//           clickable: true, // فعال کردن قابلیت کلیک بر روی صفحه‌بندی
//         }} // صفحه‌بندی قابل کلیک
//         breakpoints={{
//           // تنظیمات برای اندازه‌های مختلف صفحه نمایش
//           640: {
//             slidesPerView: 1.2, // نمایش یک اسلاید و نیم
//             spaceBetween: 10, // فاصله بین اسلایدها
//           },
//           768: {
//             slidesPerView: 1.5, // نمایش یک اسلاید و نیم
//             spaceBetween: 10, // فاصله بین اسلایدها
//           },
//           1024: {
//             slidesPerView: 1.6, // نمایش یک اسلاید و نیم
//             spaceBetween: 50, // فاصله بین اسلایدها
//           },
//         }}
//       >
//         {data.map((item) => {
//           return (
//             <SwiperSlide>
//               <Link href={"#"}>
//                 <Image
//                   src={item.src}
//                   alt="image"
//                   width={300}
//                   height={200}
//                   className="w-full"
//                 />
//               </Link>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// };

// export default UserPanelSwipper;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // Removed Navigation
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Image from "next/image";
import Config from "../config";

const UserPanelSwipper = ({ slides }) => {
  return (
    <div>
      <Swiper
        className="panel-pagination"
        effect="fade"
        autoplay={{
          delay: 3000, // تأخیر بین اسلایدها
          disableOnInteraction: false, // غیرفعال کردن اتوپلی در تعامل کاربر
        }}
        loop
        modules={[Autoplay]} // Removed Navigation
        spaceBetween={50}
        slidesPerView={1.6}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 10 },
          768: { slidesPerView: 1.5, spaceBetween: 10 },
          1024: { slidesPerView: 1.6, spaceBetween: 50 },
        }}
      >
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link1}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img1}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link2}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img2}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link3}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img3}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link4}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img4}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link5}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img5}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide className="rounded-[5px] overflow-hidden">
          <Link href={slides.slider_link1}>
            <Image
              src={`${Config.baseUrl}/${slides.slider_img1}`}
              alt="image"
              width={300}
              height={200}
              className="w-full rounded-lg" // Added border-radius
            />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserPanelSwipper;
