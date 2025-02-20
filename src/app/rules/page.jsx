"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BirgeramRules from "@/components/rules and regulations/BirgeramRules";
import Config from "@/components/config";

const Rules = () => {
  const [rulesData, setRulesData] = useState(null);
  const [data, setData] = useState(null);
  const [rules, setRules] = useState(null);

  useEffect(() => {
    // Fetching the JSON data from the public folder
    fetch("./rules.json")
      .then((response) => response.json())
      .then((data) => setRulesData(data))
      .catch((error) => console.error("Error loading rules data:", error));

    // Send GET request to /splash and save response data to localStorage
    axios
      .get(`${Config.apiUrl}/splash`)
      .then((response) => {
        // Assuming response.data.options is the data you want to store
        if (response.data && response.data.options) {
          localStorage.setItem(
            "Options",
            JSON.stringify(response.data.options)
          );
          localStorage.setItem("rules", JSON.stringify(response.data.rules));
          setData(JSON.parse(localStorage.getItem("Options")));
          setRules(JSON.parse(localStorage.getItem("rules")));
        }
      })
      .catch((error) => {
        console.error("Error fetching options from /splash:", error);
      });
  }, []);

  if (!rulesData) {
    return <div>Loading...</div>; // Optionally show a loading indicator while the data is being fetched
  }

  if (!data) return null;
  console.log("rules", rules);
  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container mx-auto px-3">
          <Header />
          <article>
            <div className="flex flex-col gap-8 py-5">
              <div className="text-4xl text-white flex gap-1">
                <h1>{rulesData.header.title}</h1>
                <p className="text-yellow-400">{data.sitename}</p>
              </div>
              <p className="text-white">{data.rules_header}</p>
            </div>
          </article>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-4 py-10">
        <div className="text-2xl flex gap-1 justify-center text-blue-900 font-bold">
          <h1>{rulesData.header.title}</h1>
          <p className="text-yellow-400">{data.sitename}</p>
        </div>
        <BirgeramRules rules={rules} siteName={data.sitename} />
      </div>
      <Footer footerText={rulesData.footer.text} />
    </div>
  );
};

export default Rules;
