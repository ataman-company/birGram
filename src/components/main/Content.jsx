"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import InformationOfGold from "./InformationOfGold";
import axios from "axios";
import Config from "../config";
import { Skeleton } from "@nextui-org/react"; // Import Skeleton from NextUI

const Content = ({ loading, setLoading }) => {
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [token, setToken] = useState(null);
  // const [loading, setLoading] = useState(true);

  // Check if token exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const serverdata = async () => {
    // Ensure loading state is true at the start of the request
    setLoading(true);
    try {
      const res = await axios.get(`${Config.apiUrl}/splash`);
      if (res.data.code === 1) {
        setData(res.data);
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Always turn off loading once the request is complete
      setLoading(false);
    }
  };

  useEffect(() => {
    serverdata();
    let interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentPrice = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/lastprice`);
      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const headerSub = data?.options?.header_sub || "";
  const headerH1 = data?.options?.header_h1 || "";
  const header_description = data?.options?.header_description || "";

  const words = headerSub.split(" ");
  const words2 = headerH1.split(" ");

  const firstword =
    words.length > 1 ? words[0] + " " + words[1] : words[0] || "";
  const sectword = words.length > 3 ? words[2] + " " + words[3] : "";
  const firstword2 =
    words2.length > 4 ? words2.slice(0, 5).join(" ") : words2.join(" ");
  const sectword2 = words2[5] || "";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      {/* Show Skeleton Loader while loading */}
      {loading ? (
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
      ) : (
        // Content when data is loaded
        <div className="flex md:flex-row flex-col gap-10 sm:mt-20 mt-5">
          <div className="flex flex-col gap-4 sm:w-1/2 w-full">
            <div className="flex gap-1">
              <h1 className="sm:text-2xl text-sm text-white">{firstword}</h1>
              <span className="sm:text-2xl text-sm text-yellow-400">
                {sectword}
              </span>
            </div>
            <div className="flex gap-1">
              <h1 className="sm:text-4xl text-xl text-white">{firstword2}</h1>
              <span className="sm:text-4xl text-xl text-yellow-400">
                {sectword2}
              </span>
            </div>
            <p className="sm:text-lg text-sm text-white">
              {header_description}
            </p>

            {/* Conditionally render Login/Register or Logout */}
            <Link
              href={token ? "#" : "/login"}
              className="sm:text-lg text-sm bg-yellow-400 rounded-xl md:px-10 lg:px-20 py-3 xl:w-1/2 lg:w-2/3 md:w-full sm:w-full flex justify-center"
              onClick={token ? handleLogout : undefined}
            >
              {token ? "خروج" : "ورود | ثبت نام"}
            </Link>
          </div>
          <InformationOfGold
            contentWidth="xl:w-[500px] lg:w-[400px] md:w-[300px]"
            placement="top"
            show={true}
            data={data}
            currentPrice={currentPrice}
          />
        </div>
      )}
    </>
  );
};

export default Content;
