"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import physicalGoldData from "../giving-gold/goldData/physicalGoldData.json"; // Adjust the path if needed
import Link from "next/link";

function Page() {
  if (typeof window === "undefined") {
    return null;
  }

  const data = JSON.parse(localStorage.getItem("Options"));

  const steps = [
    {
      title: data.physical_step1_title,
      description: data.physical_step1_description,
      icon: "/icons/1.svg",
    },
    {
      title: data.physical_step2_title,
      description: data.physical_step2_description,
      icon: "/icons/2.svg",
    },
    {
      title: data.physical_step3_title,
      description: data.physical_step3_description,
      icon: "/icons/3.svg",
    },
  ];

  return (
    <>
      <div className="bg-blue-50">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800">
          <div className="container pb-3 mx-auto relative px-3">
            <Header />
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-blue-800 flex flex-col gap-4 text-white p-4 container mx-auto rounded-2xl my-10">
          <h1 className="sm:text-4xl text-2xl">{data.physical_header_title}</h1>
          <div className="sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <p>{data.physical_header_descriptions}</p>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col gap-5 text-black p-4 container mx-auto rounded-2xl mt-10">
          <h1 className="sm:text-2xl text-lg font-bold text-blue-900">
            {physicalGoldData.stepsTitle}
          </h1>
          <div className="sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>

          <div className="flex flex-wrap gap-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-2 bg-white shadow-md p-3 py-6 rounded-lg sm:w-72 w-full"
              >
                <Image
                  width={34}
                  height={34}
                  src={step.icon}
                  alt=""
                  className="self-start"
                />
                <div className="flex flex-col gap-2">
                  <h6 className="font-semibold">{step.title}</h6>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <h1 className="sm:text-2xl text-lg text-blue-900 font-bold">
            {data.physical_notes_title}
          </h1>
          <div className="sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          {physicalGoldData.importantNotes.map((note, index) => (
            <p key={index}>
              {index + 1}- {note}
            </p>
          ))}

          {/* Fee Section */}
          <h1 className="sm:text-2xl text-lg text-blue-900 font-bold">
            {physicalGoldData.feeTitle}
          </h1>
          <div className="sm:w-1/12 w-1/6 p-1 border-t-2 border-b-2 border-t-yellow-500 border-b-yellow-500"></div>
          <p>{physicalGoldData.feeDescription}</p>

          <div className="flex flex-col gap-4 bg-gray-200 border rounded-lg px-3 py-5">
            {physicalGoldData.feeTable.map((fee, index) => (
              <div key={index} className="flex gap-2">
                <span className="sm:text-lg text-sm text-blue-900 font-bold">
                  {fee.label}
                </span>
                <span className="mt-3 border-t-2 border-dotted grow border-black"></span>
                <span className="sm:text-lg text-sm text-yellow-500 font-bold">
                  {fee.value}
                </span>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex w-full justify-around">
            <Link
              href="/userPanel/goldTrade"
              className="flex justify-center items-center px-6 py-3 bg-white border border-blue-500 text-blue-500 rounded-lg text-sm font-medium text-center"
            >
              {physicalGoldData.callToAction.buyButton}
            </Link>
            <Link
              href="/certificates"
              className="flex justify-center items-center px-6 py-3 bg-white border border-blue-500 text-blue-500 rounded-lg text-sm font-medium text-center"
            >
              {physicalGoldData.callToAction.licenseButton}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
