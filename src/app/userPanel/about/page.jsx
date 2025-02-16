// "use client";

// import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
// import PhoneIcon from "@public/icons/userPanel/phone";
// import RedirectIcon from "@public/icons/userPanel/redirect";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // Example icon components (you can replace these with your own SVG icons)

// export default function AboutMili() {
//   const router = useRouter();

//   // For demonstration: copying text to clipboard

//   return (
//     <div className="h-screen w-full max-w-md mx-auto flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between py-4 px-4 border-b">
//         <button onClick={() => router.back()}>
//           <ChevronRightIcon size={5} color="#333" />
//         </button>
//         <h1 className="flex justify-center items-center w-full text-lg font-bold">
//           درباره میلی
//         </h1>
//         {/* Back button example (if you want to navigate back) */}
//       </div>

//       {/* Content */}
//       <div className="flex flex-col px-4 py-2">
//         {/* Item 1: وبسایت میلی */}
//         <div className="flex items-center justify-between py-3 border-b">
//           <div className="flex items-center gap-2">
//             <span className="text-sm">وبسایت میلی</span>
//           </div>
//           <Link href={"/"}>
//             <RedirectIcon size={24} color="#666" />
//           </Link>
//           {/* Optional: Another icon or arrow on the right */}
//         </div>

//         {/* Item 2: مشاهده مجوزها */}
//         <div className="flex items-center justify-between py-3 border-b">
//           <div className="flex items-center gap-2">
//             <span className="text-sm">مشاهده مجوزها</span>
//           </div>
//           <Link href={"/"}>
//             <RedirectIcon size={24} color="#666" />
//           </Link>
//           {/* Optional: Another icon or arrow on the right */}
//         </div>

//         {/* Item 3: شماره پشتیبانی */}
//         <div className="flex items-center justify-between py-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm">شماره پشتیبانی</span>
//           </div>
//           <div className="flex">
//             <span className="text-sm text-gray-600">۰۲۱-۹۱۰۰۱۵۵</span>
//             <PhoneIcon size={24} color="#666" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import PhoneIcon from "@public/icons/userPanel/phone";
import RedirectIcon from "@public/icons/userPanel/redirect";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AboutMili() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col md:max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between py-4 border-b">
        <button onClick={() => router.back()}>
          <ChevronRightIcon size={24} color="#333" />
        </button>
        <h1 className="flex justify-center items-center w-full text-base sm:text-lg md:text-xl font-bold">
          درباره میلی
        </h1>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col py-4">
        {/* Item 1: وبسایت میلی */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">وبسایت میلی</span>
          </div>
          <Link href="/">
            <RedirectIcon size={24} color="#666" />
          </Link>
        </div>

        {/* Item 2: مشاهده مجوزها */}
        <div className="flex items-center justify-between py-3 border-b">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">مشاهده مجوزها</span>
          </div>
          <Link href="/">
            <RedirectIcon size={24} color="#666" />
          </Link>
        </div>

        {/* Item 3: شماره پشتیبانی */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base">شماره پشتیبانی</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">۰۲۱-۹۱۰۰۱۵۵</span>
            <PhoneIcon size={24} color="#666" />
          </div>
        </div>
      </div>
    </div>
  );
}
