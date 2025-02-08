import Image from "next/image";
import Link from "next/link";
import React from "react";

function Categories() {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 lg:gap-5 gap-2 container mx-auto mt-5">
      <Link
        href={"#"}
        className="lg:text-base text-sm py-10 bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/icon-register.svg"}
          alt="register"
        />
        ثبت نام و احراز هویت
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/buygold.svg"}
          alt="register"
        />
        خرید و فروش طلا
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/transfer.svg"}
          alt="register"
        />
        انتقال و دریافت طلا
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/money.svg"}
          alt="register"
        />
        واریز و برداشت طلا و ریال
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/wallet.svg"}
          alt="register"
        />
        حساب طلا و کیف پول ریالی
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/user.svg"}
          alt="register"
        />
        حساب کاربری و مالی
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/receipt.svg"}
          alt="register"
        />
       جزئیات تراکنش ها و درخواست ها
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/mojavez.svg"}
          alt="register"
        />
       قوانین و مجوزها
      </Link>
      <Link
        href={"#"}
        className="py-10 lg:text-base text-sm bg-white border border-dashed rounded-xl flex gap-2 justify-center items-center hover:bg-blue-800 hover:text-white"
      >
        <Image
          width={24}
          height={24}
          src={"/icons/help/protect.svg"}
          alt="register"
        />
       امنیت و شفافیت میلی
      </Link>
    </div>
  );
}

export default Categories;
