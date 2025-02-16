"use client";
import React from "react";
import Header from "@/components/Header";
import CanIHelp from "@/components/help/CanIHelp";
import Categories from "@/components/help/Categories";
import RecentQues from "@/components/help/RecentQues";
import Footer from "@/components/Footer";

function Help() {
  return (
    <div className="bg-[#f7f7f9]">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container mx-auto px-3">
          <Header />
          <CanIHelp />
        </div>
      </div>
      <div className="flex flex-col gap-10 px-3">
        <Categories />
        <RecentQues />
      </div>
      <Footer />
    </div>
  );
}

export default Help;
