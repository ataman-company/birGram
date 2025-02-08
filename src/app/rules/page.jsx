'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BirgeramRules from "@/components/rules and regulations/BirgeramRules";
import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Rules = () => {
    return (
        <div className="bg-[#f7f7f9]">
            <div className="bg-gradient-to-r from-blue-950 to-blue-800">
                <div className="container mx-auto px-3">
                    <Header />
                    <article>
                        <div className="flex flex-col gap-8 py-5">
                            <div className="text-4xl text-white flex gap-1">
                                <h1>
                                    قوانین و مقررات
                                </h1>
                                <p className="text-yellow-400">بیرگرم</p>
                            </div>
                            <p className="text-white">کاربر گرامی، قوانین و مقررات پیش رو، به منزله قرارداد بین شما و شرکت سرمایه زرین ماندگار به شناسه ملی ۱۴۰۱۱۷۴۵۱۹۱ و شماره ثبت ۶۰۵۹۸۷ ؛ و تایید آن توسط شما و استفاده از خدمات سامانه بیرگرم، به معنای امضای این قرارداد است. بنابراین خواهشمندیم پیش از هرگونه استفاده از سامانه، این سند را به طور کامل و به دقت مطالعه فرمایید. تعامل در بیرگرم، منوط به موافقیت با قوانین و مقرراتی اسیت که در زیر خدمت شما به تفصیل ارائه شده است.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
            <div className="container mx-auto flex flex-col gap-4 py-10">
                <div className="text-2xl flex gap-1 justify-center text-blue-900 font-bold">
                    <h1>
                        قوانین و مقررات
                    </h1>
                    <p className="text-yellow-400">بیرگرم</p>
                </div>
                <BirgeramRules/>
            </div>
            <Footer />
        </div>
    )
}
export default Rules;