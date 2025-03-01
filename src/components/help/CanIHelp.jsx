import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

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

const ClearIcon = ({ onClick }) => {
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
        d="M6 18L18 6M6 6L18 18"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

function CanIHelp() {
  const { control, handleSubmit, watch, setValue, reset } = useForm();
  const router = useRouter();
  const siteName = JSON.parse(localStorage.getItem("siteName"));
  const onSubmit = (data) => {
    const currentSearchTerm = data.searchTerm;

    if (currentSearchTerm.length > 0) {
      router.push(`/help/?category_id=&search=${currentSearchTerm}`);
    } else {
      router.push(`/help/?category_id=&search=`);
    }
  };

  const clearSearchTerm = () => {
    setValue("searchTerm", "");
    router.push(`/help/?category_id=&search=`);
  };

  return (
    <div className="flex flex-col gap-5 text-white items-center py-20">
      <h1 className="text-3xl">چطور میتونم کمکتون کنم؟</h1>
      <p>پاسخ سوالات خود دربارۀ محصول را در اینجا پیدا کنید</p>

      <div className="sm:w-1/2 w-full ">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <Controller
            name="searchTerm"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                placeholder="جستجو"
                className="w-full p-2 border rounded-md text-black h-[50px]"
                onChange={(e) => setValue("searchTerm", e.target.value)} // Update form state on input change
              />
            )}
          />

          {watch("searchTerm") ? (
            <>
              <div
                onClick={handleSubmit(onSubmit)}
                className={`absolute top-1/2 left-8 transform -translate-y-1/2 cursor-pointer`}
              >
                <SearchIcon />
              </div>
              <div
                onClick={clearSearchTerm}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer"
              >
                <ClearIcon />
              </div>
            </>
          ) : (
            <div
              onClick={handleSubmit(onSubmit)}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer`}
            >
              <SearchIcon />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CanIHelp;
