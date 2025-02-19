"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FeaturesSection from "./components/FeaturesSection";
import GiftCardSection from "./components/GiftSection";
import CardPrice from "./components/PriceCalculation";

function Help() {
  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container mx-auto px-3 pb-3">
          <Header />
        </div>
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
