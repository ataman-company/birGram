import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Config from "../config";

// const data = [
//   {
//     id: "6",
//     title: "farzad",
//     img: "images/certificate/67bac8c963250.png",
//     mini: "1",
//     text: "0",
//   },
//   {
//     id: "8",
//     title: "pa",
//     img: '<picture><img alt="vezarat-sanat" fetchpriority="high" src="https://milli.s3.ir-thr-at1.arvanstorage.ir/images/certificates/vezarat-sanat.png" width="140" height="140"></picture>',
//     mini: "1",
//     text: "1",
//   },
// ];

const Swipper = () => {
  const data = JSON.parse(localStorage.getItem("certificates"));
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
            {item.mini == 1 && (
              <Link
                className="flex flex-col items-center text-center"
                href={"#"}
              >
                {item.text == "1" ? (
                  <span
                    dangerouslySetInnerHTML={{ __html: item.img }}
                    className="w-32 h-32"
                  />
                ) : (
                  <img
                    src={`${Config.baseUrl}/${item.img}`}
                    alt={item.title}
                    className="w-32 h-32"
                  />
                )}
                <span>{item.title}</span>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Swipper;
