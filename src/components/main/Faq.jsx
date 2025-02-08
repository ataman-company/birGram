import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../config";

function Faq() {
  const [data, setData] = useState(false);
  const serverdata = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/splash`);
      if (res.data.code === 1) {
        setData(res.data.faq);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    serverdata();
  }, [])
  console.log(data);
  return (
    data ?
      <div className="flex flex-col gap-10">
        <h2 className="font-bold sm:text-2xl text-lg">سوالات متداول خریداران طلای آب شده</h2>
        <Accordion
          itemClasses={{
            content: "text-right text-sm sm:text-base",
            indicator: "rtl:rotate-90 [&>svg]:rotate-180",
            heading: "font-semibold",
            title: "sm:text-lg text-sm font-semibold"
          }}
        >
          {
            data?.map((item, index) => (<AccordionItem key={index} aria-label={`Accordion ${index}`} title={item.q}>
              <div dangerouslySetInnerHTML={{ __html: item.answer || '' }}></div>
            </AccordionItem>))
          }
        </Accordion>
      </div>
      : <p>Loading...</p>
  );
}

export default Faq;
