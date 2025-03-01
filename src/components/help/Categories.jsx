import Image from "next/image";
import Link from "next/link";
import React from "react";
import Config from "../config";

function Categories({ category }) {
  return (
    <div className="flex flex-wrap justify-center gap-5 container mx-auto mt-5">
      {category.map((item) => (
        <Link
          key={item.id}
          href={`/help/?category_id=${item.id}&search=`}
          className="flex items-center gap-2 px-4 py-10 bg-white border border-dashed rounded-xl hover:bg-blue-800 hover:text-white w-full sm:w-auto " // Use w-full on small screens and w-auto on larger screens
        >
          <Image
            width={24}
            height={24}
            src={
              item.icon
                ? `${Config.baseUrl}/${item.icon}`
                : "/icons/help/icon-register.svg"
            }
            alt={item.alt || "Icon"}
          />
          <span className="lg:text-base text-sm">
            {item.name || "ثبت نام و احراز هویت"}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
