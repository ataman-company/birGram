"use client";

import Content from "../components/main/Content";
import Header from "../components/Header";
import TradeBox from "../components/main/TradeBox";
import BenefitsOfBuyingGold from "../components/main/BenefitsOfBuyingGold";
import BecomingGoldDigger from "../components/main/BecomingGoldDigger";
import AboutUs from "../components/main/AboutUs";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="bg-blue-50">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800">
          <div className="container sm:h-[700px] h-[900px] mx-auto relative px-3">
            <Header />
            <main>
              <Content setLoading={setLoading} loading={loading} />
              {!loading && <TradeBox />}
            </main>
          </div>
        </div>

        {!loading && (
          <>
            <BenefitsOfBuyingGold />
            <BecomingGoldDigger />
            <AboutUs />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
