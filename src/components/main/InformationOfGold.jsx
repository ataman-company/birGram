import React, { useState } from "react";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import CustomAreaChart from "./AreaChart";

function InformationOfGold({
  data,
  currentPrice,
  show,
  placement,
  contentWidth,
}) {
  const currentGold = currentPrice * 1000;
  const formatted = currentGold.toLocaleString();

  const dailyPrices = Array.isArray(data.daily)
    ? data.daily.map((item) => parseFloat(item.price))
    : [];
  const weeklyPrices = Array.isArray(data.weekly)
    ? data.weekly.map((item) => parseFloat(item.price))
    : [];
  const monthlyPrices = Array.isArray(data.monthly)
    ? data.monthly.map((item) => parseFloat(item.price))
    : [];

  const dailyMinPrice = dailyPrices.length ? Math.min(...dailyPrices) : 0;
  const dailyMaxPrice = dailyPrices.length ? Math.max(...dailyPrices) : 0;
  const dailyChange = (
    Math.abs((dailyMinPrice - dailyMaxPrice) / dailyMinPrice) * 100
  ).toFixed(2);

  const weeklyMinPrice = weeklyPrices.length ? Math.min(...weeklyPrices) : 0;
  const weeklyMaxPrice = weeklyPrices.length ? Math.max(...weeklyPrices) : 0;
  const weeklyChange = (
    Math.abs((weeklyMinPrice - weeklyMaxPrice) / weeklyMinPrice) * 100
  ).toFixed(2);

  const monthlyMinPrice = monthlyPrices.length ? Math.min(...monthlyPrices) : 0;
  const monthlyMaxPrice = monthlyPrices.length ? Math.max(...monthlyPrices) : 0;
  const monthlyChange = (
    Math.abs((monthlyMinPrice - monthlyMaxPrice) / monthlyMinPrice) * 100
  ).toFixed(2);

  return (
    <div className="relative">
      {show && (
        <>
          <div className="bg-yellow-400 xl:w-[500px] lg:w-[400px] md:w-[300px] h-[350px] hidden sm:block rounded-lg rotate-12 absolute"></div>
          <div className="bg-yellow-400 xl:w-[500px] lg:w-[400px] md:w-[300px] h-[350px] hidden sm:block rounded-lg -rotate-12 absolute"></div>
        </>
      )}
      <div
        className={`p-1 bg-white rounded-lg sm:absolute ${contentWidth} w-full`}
      >
        <Tabs
          placement={placement}
          aria-label="Options"
          color="primary"
          className="my-2 w-full"
          classNames={{ tabList: "w-full", cursor: "bg-blue-900 rounded-xl" }}
        >
          <Tab key="24h" title="24 ساعت اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <CustomAreaChart width="50%" goldData={data.daily} />
                  <div className="flex flex-col gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <p className="text-xs text-right whitespace-nowrap">
                      قیمت ۱ گرم طلای ۱۸ عیار
                    </p>
                    <p className="text-gray-400 text-xs">معادل ۱۰۰۰ بیرگرم</p>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex">
                      <Image
                        width={24}
                        height={24}
                        src={"/icons/up.svg"}
                        alt="up"
                      />
                      <span className="text-green-500 lg:text-base text-xs">
                        {dailyChange}%
                      </span>
                    </div>
                    <span className="text-gray-400 lg:text-base text-xs">
                      تغییرات
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(dailyMaxPrice * 1000).toLocaleString()}ریال
                    </span>
                    <span className="text-gray-400">بالاترین قیمت</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(dailyMinPrice * 1000).toLocaleString()}ریال
                    </span>
                    <span className="text-gray-400">پایین ترین قیمت</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="lastWeek" title="هفته اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <CustomAreaChart width="50%" goldData={data.weekly} />
                  <div className="flex flex-col gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <p className="text-xs text-right whitespace-nowrap">
                      قیمت ۱ گرم طلای ۱۸ عیار
                    </p>
                    <p className="text-gray-400 text-xs">معادل ۱۰۰۰ بیرگرم</p>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex">
                      <Image
                        width={24}
                        height={24}
                        src={"/icons/up.svg"}
                        alt="up"
                      />
                      <span className="text-green-500 lg:text-base text-xs">
                        {weeklyChange}%
                      </span>
                    </div>
                    <span className="text-gray-400 lg:text-base text-xs">
                      تغییرات
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(weeklyMaxPrice * 1000).toLocaleString()}
                      ریال
                    </span>
                    <span className="text-gray-400">بالاترین قیمت</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(weeklyMinPrice * 1000).toLocaleString()}ریال
                    </span>
                    <span className="text-gray-400">پایین ترین قیمت</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="lastMonth" title="ماه اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <CustomAreaChart width="50%" goldData={data.monthly} />
                  <div className="flex flex-col gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <p className="text-xs text-right whitespace-nowrap">
                      قیمت ۱ گرم طلای ۱۸ عیار
                    </p>
                    <p className="text-gray-400 text-xs">معادل ۱۰۰۰ بیرگرم</p>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex">
                      <Image
                        width={24}
                        height={24}
                        src={"/icons/up.svg"}
                        alt="up"
                      />
                      <span className="text-green-500 lg:text-base text-xs">
                        {monthlyChange}%
                      </span>
                    </div>
                    <span className="text-gray-400 lg:text-base text-xs">
                      تغییرات
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(monthlyMaxPrice * 1000).toLocaleString()}ریال
                    </span>
                    <span className="text-gray-400">بالاترین قیمت</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 lg:text-base text-xs">
                    <span className="">
                      {(monthlyMinPrice * 1000).toLocaleString()}ریال
                    </span>
                    <span className="text-gray-400">پایین ترین قیمت</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default InformationOfGold;
