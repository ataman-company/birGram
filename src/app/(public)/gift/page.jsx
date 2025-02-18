"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FeaturesSection from "../help/components/FeaturesSection";
import GiftCardSection from "../help/components/GiftSection";
import CardPrice from "../help/components/PriceCalculation";

function Help() {
  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container mx-auto px-3">
          <Header />
        </div>
        <div></div>
      </div>
      <div className="flex flex-col gap-10 px-3">
        <FeaturesSection />
        <GiftCardSection />
        <CardPrice />
      </div>
      <Footer />
    </div>
  );
}

export default Help;
