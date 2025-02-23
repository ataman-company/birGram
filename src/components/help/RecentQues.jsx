import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function RecentQues({ faq, recent }) {
  if (faq.length === 0 || recent.length === 0) return <></>;
  const siteName = JSON.parse(localStorage.getItem("sitename"));
  return (
    <>
      <div className="flex flex-col gap-5 container mx-auto">
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center gap-1">
            <Image
              width={34}
              height={24}
              src={"/icons/help/bookmark.webp"}
              alt="new"
            />
            <span className="font-bold">سوالات مهم</span>
          </div>
          <div className="flex flex-col gap-2">
            {faq.map((item) => (
              <Accordion key={item.id} variant="splitted">
                <AccordionItem
                  title={
                    <div className="flex items-center justify-between bg-white  p-3 text-sm h-1">
                      <p className="text-black-900">{item.q}</p>
                    </div>
                  }
                >
                  <ul className="text-sm">
                    <li>{item.answer}</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
        <div className="flex flex-col  gap-2 w-full">
          <div className="flex items-center gap-1">
            <Image
              width={34}
              height={24}
              src={"/icons/help/new.webp"}
              alt="new"
            />
            <span className="font-bold">سوالات اخیر</span>
          </div>

          <div className="flex flex-col gap-2">
            {recent.map((item) => (
              <Accordion key={item.id} variant="splitted">
                <AccordionItem
                  title={
                    <div className="flex items-center justify-between bg-white  p-3 text-sm h-1">
                      <p className="text-black-900">{item.q}</p>
                    </div>
                  }
                >
                  <ul className="text-sm">
                    <li>{item.answer}</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-2 justify-between items-center p-5 bg-gray-200 container mx-auto rounded-xl mb-10">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-semibold">
            چیزی که دنبالش بودی رو نیافتی؟
          </h4>
          <h6 className="text-lg">
            همین حالا با پشتیبانی {siteName} تماس بگیر و بپرس
          </h6>
        </div>
        <Link
          href={"/contact-us"}
          className="bg-blue-900 text-white rounded-xl p-3"
        >
          تماس با پشتیبانی
        </Link>
      </div>
    </>
  );
}

export default RecentQues;
