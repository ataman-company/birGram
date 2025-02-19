"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Swiper from "./Swiper";
import Faq from "./Faq";
import ApplicationDownload from "./ApplicationDownload";
import MyReactPlayer from "./Player";

function BecomingGoldDigger() {
  return (
    <div className="bg-white w-full pt-10 mt-10">
      <div className="container flex flex-col gap-10 text-center mx-auto">
        <h2 className="sm:text-2xl text-lg font-bold">چند قدم تا طلادار شدن</h2>
        <div className="flex sm:flex-row flex-col gap-5">
          <div className="sm:w-1/2 sm:h-80 ">
            <Accordion
              itemClasses={{
                content: "text-right text-sm sm:text-base",
                indicator: "rtl:rotate-90 [&>svg]:rotate-180",
                title: "sm:text-lg text-sm font-semibold",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="ثبت‌نام و احراز هویت"
              >
                در کمتر از ۲ دقیقه تو بیرگرم ثبت‌نام کن و احراز هویتت رو انجام
                بده
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="واریز به کیف پول"
              >
                به میزان دلخواه و شبانه‌روزی، کیف‌پولت رو شارژ کن
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="خرید طلا">
                هر قدر که مایلی، به صورت آنی و بدون محدودیت زمانی طلا بخر
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Accordion 3"
                title="فروش یا دریافت فیزیکی طلا"
              >
                هر زمان که بخوای، می‌تونی موجودی طلای خودت رو بفروشی یا به صورت
                شمش‌های گرمی طلا تحویل بگیری
              </AccordionItem>
            </Accordion>
          </div>
          <div className="sm:w-1/2">
            <MyReactPlayer src="/videos/main-receive-gold.mp4" />
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
