// import { Input } from "@nextui-org/react";
// import React, { useState } from "react";

// const SearchIcon = () => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1.5em"
//       width="1.5em"
//       role="presentation"
//       viewBox="0 0 24 24"
//     >
//       <path
//         d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//         stroke="#808080"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M22 22L20 20"
//         stroke="#808080"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// function CanIHelp() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     // می‌توانید اینجا هر عملی که می‌خواهید با مقدار جستجو انجام دهید
//     console.log("جستجو:", e.target.value);
//   };
//   return (
//     <div className="flex flex-col gap-5 text-white items-center py-20">
//       <h1 className="text-3xl">چطور میتونم کمکتون کنم؟</h1>
//       <p>پاسخ سوالات خود دربارۀ محصول میلی را در اینجا پیدا کنید</p>
//       <Input
//         className="sm:w-1/2 w-full"
//         type="search"
//         label="جستجو"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         clearable
//         endContent={<SearchIcon />}
//       />
//     </div>
//   );
// }

// export default CanIHelp;

import { Input } from "@nextui-org/react";
import React, { useState } from "react";

const SearchIcon = () => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1.5em"
      width="1.5em"
      role="presentation"
      viewBox="0 0 24 24"
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
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    console.log("جستجو:", e.target.value);
  };

  return (
    <div className="flex flex-col gap-5 text-white items-center py-20">
      <h1 className="text-3xl">چطور میتونم کمکتون کنم؟</h1>
      <p>پاسخ سوالات خود دربارۀ محصول میلی را در اینجا پیدا کنید</p>
      <Input
        className="sm:w-1/2 w-full"
        type="search"
        label="جستجو"
        value={searchTerm}
        onChange={handleSearchChange}
        clearable
        endContent={
          <div className="flex items-center justify-center h-full">
            <SearchIcon />
          </div>
        }
      />
    </div>
  );
}

export default CanIHelp;
