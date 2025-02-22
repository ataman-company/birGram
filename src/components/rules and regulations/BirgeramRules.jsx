"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

const BirgeramRules = ({ rules, siteName }) => {
  const [rulesData, setRulesData] = useState(null);

  useEffect(() => {
    // Fetch or import the JSON data
    const fetchData = async () => {
      const response = await fetch("/birRules.json");
      const data = await response.json();
      setRulesData(data);
    };

    fetchData();
  }, []);

  if (!rules || rules.length === 0) {
    return <div>No rules available.</div>; // Handle case when rules is empty or undefined
  }

  return (
    <Accordion variant="splitted">
      {rules.map((section) => (
        <AccordionItem
          key={section.id}
          title={
            <div className="flex text-lg font-semibold gap-1">
              <p className="text-blue-900">{section.q}</p>
            </div>
          }
        >
          <ul className="text-sm">
            <li>{section.q}</li>
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default BirgeramRules;
