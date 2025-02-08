import Image from "next/image";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Config from "../config";
import axios from "axios";

function BenefitsOfBuyingGold() {
  const [data, setData] = useState(false);
  const [h2items, setH2items] = useState([]);
  const serverdata = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/splash`);
      if (res.data.code === 1) {
        setData(res.data);
        const benefitsItems = JSON.parse(res.data.options.h2_items);
        setH2items(benefitsItems);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    serverdata();
  }, []);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    sources: [
      {
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        type: "video/mp4",
      },
    ],
  };
  const h2Video = data?.options?.h2_video || "";

  return data ? (
    <div className="container flex flex-col mx-auto sm:gap-10 gap-5 text-center sm:mt-32 mt-16 px-2">
      <h2 className="font-bold sm:text-2xl text-lg">
        مزایای خرید طلای آب‌ شده از بیرگرم
      </h2>
      <div className="w-full bg-white rounded-lg flex sm:flex-row flex-col gap-4 py-6 sm:px-20 px-5 mx-auto">
        <div className="sm:w-1/2 flex flex-col gap-4">
          {h2items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <Image
                width={24}
                height={24}
                src={"/icons/check.svg"}
                alt="check"
              />
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
        <VideoPlayer options={videoJsOptions} className="w-full" />
      </div>
      <div className="flex sm:flex-row flex-col gap-3 sm:justify-between">
        <div className="bg-white p-3 flex flex-col gap-3 items-center rounded-2xl sm:w-96 w-full">
          <div className="rounded-full bg-red-100 w-12 h-12 flex justify-center items-center">
            <picture
              className="mr-1"
              dangerouslySetInnerHTML={{
                __html: data?.options?.h2_cart_icon1 || "",
              }}
            ></picture>
          </div>
          <h3 className="text-lg">{data?.options?.h2_cart_header1}</h3>
          <p className="text-sm">{data?.options?.h2_cart_des1}</p>
        </div>
        <div className="bg-blue-950 text-white p-3 flex flex-col gap-3 items-center rounded-2xl sm:w-96 w-full">
          <div className="rounded-full bg-red-100 w-12 h-12 flex justify-center items-center">
            <picture
              className="mr-1"
              dangerouslySetInnerHTML={{
                __html: data?.options?.h2_cart_icon2 || "",
              }}
            ></picture>
          </div>
          <h3 className="text-lg">{data?.options?.h2_cart_header2}</h3>
          <p className="text-sm">{data?.options?.h2_cart_des2}</p>
        </div>
        <div className="bg-white p-3 flex flex-col gap-3 items-center rounded-2xl sm:w-96 w-full">
          <div className="rounded-full bg-red-100 w-12 h-12 flex justify-center items-center">
            <picture
              className="mr-1"
              dangerouslySetInnerHTML={{
                __html: data?.options?.h2_cart_icon3 || "",
              }}
            ></picture>
          </div>
          <div className="text-lg">
            <h3 className="text-lg">{data?.options?.h2_cart_header3}</h3>
          </div>
          <p className="text-sm">{data?.options?.h2_cart_des3}</p>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-4xl text-center">loading...</h1>
  );
}

export default BenefitsOfBuyingGold;
