import Image from "next/image";
import React, { useEffect, useState } from "react";
import Config from "../config";
import axios from "axios";
import { Skeleton } from "@nextui-org/react";
import MyReactPlayer from "./Player";
// import VideoPlayer from "./videoPlyr";

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

  return data ? (
    <div className="container flex flex-col mx-auto sm:gap-10 gap-5 text-center sm:mt-32 mt-16 px-2">
      <h2 className="font-bold sm:text-2xl text-lg">
        مزایای خرید طلای آب‌ شده از بیرگرم
      </h2>
      <div className="flex sm:flex-row flex-col gap-5">
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
        <div className="sm:w-1/2">
          {/* <VideoPlayer options={videoJsOptions} className="w-full" /> */}

          <MyReactPlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            controls={true}
          />
        </div>
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
    <div className="flex md:flex-row flex-col gap-10 sm:mt-20 mt-5 w-full">
      {/* Left Section - Text Content Skeleton */}
      <div className="flex flex-col gap-6 sm:w-1/2 w-full">
        {/* First Heading Line */}
        <div className="flex gap-2">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>

        {/* Second Heading Line */}
        <div className="flex gap-2">
          <Skeleton className="h-12 w-64 rounded-lg" />
          <Skeleton className="h-12 w-20 rounded-lg" />
        </div>

        {/* Description Paragraph */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
          <Skeleton className="h-4 w-3/5 rounded-lg" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-12 w-48 rounded-xl" />
      </div>

      {/* Right Section - Gold Info Skeleton */}
      <div className="xl:w-[500px] lg:w-[400px] md:w-[300px]">
        <div className="flex flex-col gap-4 p-6 bg-white bg-opacity-5 rounded-3xl">
          <Skeleton className="h-7 w-1/2 rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 rounded-lg" />
            <Skeleton className="h-12 rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default BenefitsOfBuyingGold;
