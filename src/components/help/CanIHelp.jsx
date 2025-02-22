import { Input } from "@nextui-org/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Config from "../config";

const SearchIcon = ({ onClick }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1.5em"
      width="1.5em"
      role="presentation"
      viewBox="0 0 24 24"
      onClick={onClick}
      className="cursor-pointer"
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

function CanIHelp() {
  const { control, setValue, watch } = useForm();
  const router = useRouter(); // Initialize useRouter

  const handleSearchIconClick = () => {
    const currentSearchTerm = watch("searchTerm");

    // Set the query parameters in the URL
    if (currentSearchTerm.length > 0)
      router.push(`/help/?category_id=&search=${currentSearchTerm}`);
  };

  return (
    <div className="flex flex-col gap-5 text-white items-center py-20">
      <h1 className="text-3xl">چطور میتونم کمکتون کنم؟</h1>
      <p>پاسخ سوالات خود دربارۀ محصول میلی را در اینجا پیدا کنید</p>

      <div className="sm:w-1/2 w-full">
        <Controller
          name="searchTerm"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="search"
              label="جستجو"
              clearable
              endContent={
                <div className="flex items-center justify-center h-full">
                  <SearchIcon onClick={handleSearchIconClick} />
                </div>
              }
              className="w-full"
            />
          )}
        />
      </div>
    </div>
  );
}

export default CanIHelp;
