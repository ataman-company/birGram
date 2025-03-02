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

  function renderAnswer(answer) {
    // A simple regex to detect HTML tags.
    const containsHTML = /<\/?[a-z][\s\S]*>/i.test(answer);
    if (containsHTML) {
      return <span dangerouslySetInnerHTML={{ __html: answer }} />;
    }
    return answer;
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
            <li>{renderAnswer(section.answer)}</li>
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default BirgeramRules;
