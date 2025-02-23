// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/swiper-bundle.css";
// import Link from "next/link";
// import Config from "../config";

// const data = [
//   {
//     id: 1,
//     title: "ای نماد",
//     img: '<img alt="enamad" fetchpriority="high" src="https://trustseal.enamad.ir/logo.aspx?id=482424&amp;Code=RkFt8T4Jwng9WFLRe8vEqmOTzZtlrfYA" width="140" height="140" referrerpolicy="origin" style="cursor:pointer">',
//     mini: 1,
//     text: 1,
//   },
//   {
//     id: 2,
//     title: "samandehi",
//     img: '<img alt="logo-samandehi" fetchpriority="high" src="https://logo.samandehi.ir/logo.aspx?id=366913&amp;p=qftiwlbqwlbqbsiynbpdqfti" width="140" height="140" referrerpolicy="origin" style="cursor:pointer">',
//     mini: 1,
//     text: 1,
//   },
//   {
//     id: 3,
//     title: "big",
//     img: "images/certificates/1.png",
//     mini: 1,
//     text: 0,
//   },
//   {
//     id: 4,
//     title: "123",
//     img: "321",
//     mini: 1,
//     text: 1,
//   },
// ];

// const Swipper = () => {
//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={20}
//         slidesPerView={2}
//         autoplay={{ delay: 3000 }}
//         loop
//         breakpoints={{
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 3,
//             spaceBetween: 30,
//           },
//           1024: {
//             slidesPerView: 4,
//             spaceBetween: 40,
//           },
//         }}
//       >
//         {data.map((item) => (
//           <SwiperSlide key={item.id}>
//             <Link href={"#"}>
//               <img
//                 src={`${Config.baseUrl}/${item.img}`}
//                 alt="Slide 7"
//                 className="w-32 h-32"
//               />
//               <span>{item.title}</span>
//             </Link>
//           </SwiperSlide>
//         ))}
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
                {item.text === "1" ? (
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
