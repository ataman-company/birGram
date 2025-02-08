import Image from "next/image";
import Link from "next/link";
import React from "react";

function ApplicationDownload() {
  return (
    <div className="flex gap-5 justify-between bg-blue-400 rounded-lg p-3 text-white relative mt-16">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 items-start">
          <h3 className="font-semibold">دانلود اپلیکیشن موبایل بیرگرم</h3>
          <p className="text-sm">با طلا قدرتمند شوید</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={36}
              height={36}
              src={"/icons/android.svg"}
              alt="android"
            />
            <p>اندروید</p>
          </div>
          <div className="flex sm:flex-row flex-col gap-2">
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/bazar.svg"}
                  alt="bazar"
                />
                کافه بازار
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/myket.svg"}
                  alt="bazar"
                />
                <span>مایکت</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/download2.svg"}
                  alt="bazar"
                />
                <span>دانلود مستقیم</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={36}
              height={36}
              src={"/icons/ios.svg"}
              alt="android"
            />
            <p>آی او اس</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/sibche.svg"}
                  alt="bazar"
                />
                سیبچه
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/sibap.svg"}
                  alt="bazar"
                />
                <span>سیب اپ</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={36}
              height={36}
              src={"/icons/pwa.svg"}
              alt="android"
            />
            <p>تحت وب</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Link
                href={"#"}
                className="bg-white py-1 px-3 text-black rounded-md flex items-center"
              >
                <Image
                  width={36}
                  height={36}
                  src={"/icons/pwa2.svg"}
                  alt="bazar"
                />
                تحت وب
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 h-[calc(100%+100px)] overflow-hidden absolute left-1/4 bottom-0 sm:block hidden">
        <picture>
          <Image
            width={300}
            height={500}
            src={"/images/birgeram-app.png"}
            alt="birgeram"
            className="shadow-large rounded-xl border"
          />
        </picture>
      </div>
    </div>
  );
}

export default ApplicationDownload;
