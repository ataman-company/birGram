// "use client";
// import React from "react";
// import Header from "@/components/Header";
// import CanIHelp from "@/components/help/CanIHelp";
// import Categories from "@/components/help/Categories";
// import RecentQues from "@/components/help/RecentQues";
// import Footer from "@/components/Footer";

// function Help() {
//   return (
//     <div className="bg-[#f7f7f9]">
//       <div className="bg-gradient-to-r from-blue-950 to-blue-800">
//         <div className="container mx-auto px-3">
//           <Header />
//           <CanIHelp />
//         </div>
//       </div>
//       <div className="flex flex-col gap-10 px-3">
//         <Categories />
//         <RecentQues />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Help;

"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import CanIHelp from "@/components/help/CanIHelp";
import Categories from "@/components/help/Categories";
import RecentQues from "@/components/help/RecentQues";
import Footer from "@/components/Footer";
import Config from "@/components/config";

function Help() {
  const searchParams = useSearchParams();
  const [faqData, setFaqData] = useState(null);

  useEffect(() => {
    // Build a query string from the URL's search parameters
    const params = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      params.append(key, value);
    }

    // Use axios to send a GET request to /mainfaq with the query parameters
    axios
      .get(`${Config.apiUrl}/mainfaq?${params.toString()}`)
      .then((response) => {
        setFaqData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
      });
  }, [searchParams]);

  console.log("faq", faqData);
  if (!faqData) return null;

  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container mx-auto px-3">
          <Header />
          {/* Pass the fetched data to your components as needed */}
          <CanIHelp faqData={faqData} />
        </div>
      </div>
      <div className="flex flex-col gap-10 px-3">
        <Categories category={faqData.category} />
        <RecentQues recent={faqData.recent} faq={faqData.faq} />
      </div>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Help />
    </Suspense>
  );
}
