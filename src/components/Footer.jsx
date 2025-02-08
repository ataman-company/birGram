import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Config from "./config";
import axios from "axios";

function Footer() {
  const [data, setData] = useState(false);
  const serverdata = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/splash`);
      if (res.data.code === 1) {
        setData(res.data.options);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    serverdata();
  }, [])
  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-800">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col gap-3 text-white">
          <Image width={100} height={50} src={"/images/1.png"} alt="gold" />
          <p>
            {
              data?.mini_description
            }
          </p>

          <div className="flex sm:flex-row flex-col sm:gap-32 gap-10">
            <div className="flex flex-col gap-4 w-64">
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                دسترسی سریع
              </h5>
              <div className="flex flex-col gap-2">
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  مشتریان حقوقی
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  بیرگرم مگ
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  راهنمای استفاده
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-64">
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                بیرگرم
              </h5>
              <div className="flex flex-col gap-2">
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  تماس با ما
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  درباره ما
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  قوانین و مقررات
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  مجوز ها
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  کارمزد ها
                </Link>
                <Link
                  href={"#"}
                  className="flex items-center gap-1 hover:text-yellow-400 hover:pr-3 duration-250"
                >
                  <Image
                    width={16}
                    height={16}
                    src={"/icons/left.svg"}
                    alt="left"
                  />
                  امنیت، شفافیت و حریم خصوصی
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-72">
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                اندروید
              </h5>
              <div className="flex gap-10">
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400  duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/bazar.svg"}
                    alt="left"
                  />
                  کافه بازار
                </Link>
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400 duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/myket.svg"}
                    alt="left"
                  />
                  مایکت
                </Link>
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400 duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/download2.svg"}
                    alt="left"
                  />
                  دانلود مستقیم
                </Link>
              </div>
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                آی او اس
              </h5>
              <div className="flex gap-10">
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400  duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/sibche.svg"}
                    alt="left"
                  />
                  کافه بازار
                </Link>
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400 duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/sibap.svg"}
                    alt="left"
                  />
                  مایکت
                </Link>
              </div>
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                تحت وب
              </h5>
              <div className="flex gap-10">
                <Link
                  href={"#"}
                  className="flex flex-col gap-1 hover:text-yellow-400  duration-250"
                >
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/pwa.svg"}
                    alt="left"
                  />
                  اپلیکیشن وب
                </Link>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-20 gap-5">
            <div className="flex flex-col gap-3">
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                نماد ها
              </h5>
              <div className="flex flex-wrap gap-5">
                <Link href={"#"} className="p-2 bg-white rounded-lg w-14">
                  <Image
                    width={70}
                    height={16}
                    src={"/images/namad.png"}
                    alt="namad"
                  />
                </Link>
                <Link href={"#"} className="p-2 bg-white rounded-lg w-14">
                  <Image
                    width={70}
                    height={16}
                    src={"/images/ettehadiyeh.png"}
                    alt="namad"
                  />
                </Link>
                <Link href={"#"} className="p-2 bg-white rounded-lg w-14">
                  <Image
                    width={70}
                    height={16}
                    src={"/images/samandehi.png"}
                    alt="namad"
                  />
                </Link>
                <Link href={"#"} className="p-2 bg-white rounded-lg w-14">
                  <Image
                    width={70}
                    height={16}
                    src={"/images/namad2.png"}
                    alt="namad"
                  />
                </Link>

              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-lg pr-2 border-r-1 border-yellow-400 text-yellow-400 font-semibold">
                شبکه های مجازی
              </h5>
              <div className="flex gap-10">
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/bale.svg"}
                    alt="bale"
                  />
                </Link>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/instagram.svg"}
                    alt="instagram"
                  />
                </Link>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/linkedin.svg"}
                    alt="linkedin"
                  />
                </Link>
                <Link href={"#"}>
                  <Image
                    width={24}
                    height={16}
                    src={"/icons/telegram.svg"}
                    alt="telegram"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex sm:flex-row flex-col sm:gap-20 gap-5">
            <div className="flex items-center gap-1">
              <Image width={24} height={24} src={"/icons/location.svg"} alt="location" />
              <p className="text-sm">{data?.address}</p>
            </div>
            <Link href={"tel:021-91200150"} className="flex items-center gap-1">
              <Image width={24} height={24} src={"/icons/phone.svg"} alt="phone" />
              <p className="text-sm">{data?.phone}</p>
            </Link>
            <Link href={"mailto:birgeram.gmail.com"} className="flex items-center gap-1">
              <Image width={24} height={24} src={"/icons/email.svg"} alt="phone" />
              <p className="text-sm">{data?.email}</p>
            </Link>
          </div>
          <Divider className="bg-white" />
          <p className="text-center">&copy;همه حقوق مادی و معنوی برای شرکت سرمایه زرین ماندگار محفوظ است.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
