"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Swiper from "./Swiper";
import Faq from "./Faq";
import ApplicationDownload from "./ApplicationDownload";
import MyReactPlayer from "./Player";
import Config from "../config";

function BecomingGoldDigger() {
  const stepgold = JSON.parse(localStorage.getItem("stepgold"));
  const options = JSON.parse(localStorage.getItem("Options"));

  return (
    <div className="bg-white w-full pt-10 mt-10">
      <div className="container flex flex-col gap-10 text-center mx-auto">
        <h2 className="sm:text-2xl text-lg font-bold">چند قدم تا طلادار شدن</h2>
        <div className="flex sm:flex-row flex-col justify-between w-full items-center">
          <div className="w-full sm:h-80 px-3">
            <Accordion
              itemClasses={{
                content: "text-right text-sm sm:text-base",
                indicator: "rtl:rotate-90 [&>svg]:rotate-180",
                title: "sm:text-2xl md:text-3xl text-sm font-semibold my-2",
              }}
            >
              {stepgold.map((item) => (
                <AccordionItem key={item.id} title={item.q}>
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="hidden sm:flex items-center justify-center w-full ">
            <img
              src={`${Config.baseUrl}/${options.digger_image}`}
              alt="image"
              className="  w-[250px]"
            />
          </div>
        </div>
        <h2 className="sm:text-2xl text-lg font-bold">مجوز ها</h2>
        <Swiper />
        <Faq />
        <ApplicationDownload />
      </div>
    </div>
  );
}

export default BecomingGoldDigger;
