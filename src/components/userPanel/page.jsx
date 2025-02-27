import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules"; // Removed Navigation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
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
