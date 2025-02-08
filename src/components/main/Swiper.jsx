import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import Link from "next/link";

const Swipper = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // افزودن ماژول‌ها
        spaceBetween={20} // فاصله بین اسلایدها
        slidesPerView={2} // تعداد اسلایدهای قابل مشاهده
        navigation // دکمه‌های ناوبری
        // صفحه‌بندی قابل کلیک
        autoplay={{ delay: 3000 }} // اسلاید خودکار با تأخیر ۳ ثانیه
        loop // اسلاید به صورت لوپ
        breakpoints={{
          // تنظیمات برای اندازه‌های مختلف صفحه نمایش
          640: {
            slidesPerView: 2, // تعداد اسلایدها در حالت موبایل
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3, // تعداد اسلایدها در حالت تبلت
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4, // تعداد اسلایدها در حالت دسکتاپ
            spaceBetween: 40,
          },
        }}
      >
        {/* اسلایدها */}
        <SwiperSlide>
          <Link href={"#"}>
            <img
              src="/images/ettehadiyeh.png"
              alt="Slide 2"
              className="w-32 h-32"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"#"}>
            <img
              src="/images/nezam-senfi.png"
              alt="Slide 3"
              className="w-32 h-32"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"#"}>
            <img
              src="/images/otagh-bazargani.png"
              alt="Slide 4"
              className="w-32 h-32"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"#"}>
            <img
              src="/images/samandehi.png"
              alt="Slide 5"
              className="w-32 h-32"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"#"}>
            <img
              src="/images/vezarat-sanat.png"
              alt="Slide 6"
              className="w-32 h-32"
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href={"#"}>
            <img src="/images/namad2.png" alt="Slide 7" className="w-32 h-32" />
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Swipper;
