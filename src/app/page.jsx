"use client";

import Content from "../components/main/Content";
import Header from "../components/Header";
import TradeBox from "../components/main/TradeBox";
import BenefitsOfBuyingGold from "../components/main/BenefitsOfBuyingGold";
import BecomingGoldDigger from "../components/main/BecomingGoldDigger";
import AboutUs from "../components/main/AboutUs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-blue-50">
        <div className="bg-gradient-to-r from-blue-950 to-blue-800">
          <div className="container sm:h-[700px] h-[900px] mx-auto relative px-3">
            <Header />
            <main>
              <Content />
              <TradeBox />
            </main>
          </div>
        </div>
        <BenefitsOfBuyingGold />
        <BecomingGoldDigger />
        <AboutUs />
        <Footer />
      </div>
    </>
  );
}
