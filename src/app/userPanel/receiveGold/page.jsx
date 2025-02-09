// "use client";
// import { useState } from "react";
// import { ChevronLeft, Info } from "lucide-react";
// import Link from "next/link";

// export default function ReceiveGold() {
//   const [goldAmount, setGoldAmount] = useState("");

//   return (
//     <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white">
//       {/* Top Navigation */}
//       <div className="flex justify-between items-center py-3 border-b border-gray-200">
//         <Link href="/userPanel">
//           <ChevronLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
//         </Link>
//         <h1 className="text-md font-bold">دریافت طلا</h1>
//         <Link href="/userPanel/requests" className="text-sm text-gray-500">
//           مشاهده لیست درخواست‌ها
//         </Link>
//       </div>

//       {/* Account Balance Section */}
//       <div className="bg-gray-50 p-4 mt-4 rounded-xl">
//         <p className="text-gray-500 text-sm">موجودی حساب میلی</p>
//         <div className="flex justify-between items-center mt-1">
//           <span className="text-blue-600 font-bold">0 میلی</span>
//         </div>
//       </div>

//       {/* Gold Input Section */}
//       <div className="mt-6">
//         <div className="flex items-center ">
//           <p className="text-gray-800 font-semibold">مقدار طلا</p>
//           <Info className="w-4 h-4 text-gray-500 cursor-pointer m-2" />
//         </div>
//         <div className="bg-gray-100 text-gray-400 mt-2 p-3 text-center rounded-xl">
//           مقدار طلا به گرم
//         </div>
//       </div>

//       {/* Confirm Button */}
//       <button
//         className="w-full p-4 text-gray-400 bg-gray-100 rounded-xl mt-10 cursor-not-allowed"
//         disabled
//       >
//         تایید و ادامه
//       </button>
//     </div>
//   );
// }

"use client";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReceiveGold() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3 ">
        <Link href="/userPanel/ServicePage">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          دریافت طلا
        </h1>
      </div>

      <div className="flex justify-between border-b border-gray-200 pb-3">
        <Link href="/userPanel/requests" className="text-sm text-gray-500">
          مشاهده لیست درخواست‌ها
        </Link>
        <ChevronLeftIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
      </div>
      {/* Account Balance Section */}
      <div className="bg-gray-50 p-4 mt-4 rounded-xl">
        <p className="text-gray-500 text-sm">موجودی حساب میلی</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-blue-600 font-bold">0 میلی</span>
        </div>
      </div>

      {/* Gold Input Section */}
      <div className="mt-6">
        <div className="flex items-center">
          <p className="text-gray-800 font-semibold">مقدار طلا</p>
          <Info
            className="w-4 h-4 text-gray-500 cursor-pointer m-2"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="bg-gray-100 text-gray-400 mt-2 p-3 text-center rounded-xl">
          مقدار طلا به گرم
        </div>
      </div>

      {/* Confirm Button */}
      <button
        className="w-full p-4 text-gray-400 bg-gray-100 rounded-xl mt-10 cursor-not-allowed"
        disabled
      >
        تایید و ادامه
      </button>

      {/* MODAL - Opens on Info Click */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-white w-full max-w-2xl rounded-t-xl p-5">
            <h2 className="text-md font-bold text-center">توضیحات</h2>
            <ul className="text-sm text-gray-700 mt-4 leading-relaxed space-y-2">
              <li>• طلای فیزیکی در قالب شمش‌های ۱۸ عیار تحویل داده می‌شود.</li>
              <li>
                • حداقل میزان قابل تحویل ۵۰۰ میلی‌ است و طلای فیزیکی مورد تقاضای
                شما باید مضرب صحیحی از ۵۰۰ گرم باشد.
              </li>
              <li>
                • در حال حاضر تحویل فیزیکی طلا فقط به‌صورت حضوری و در دفتر مرکزی
                میلی انجام می‌شود.
              </li>
              <li>
                • هنگام تحویل فیزیکی طلا، به‌همراه داشتن کارت ملی الزامی است.
              </li>
              <li>
                • امکان بازگرداندن طلای فیزیکی تحویل داده شده به میلی وجود دارد.
              </li>
            </ul>

            {/* Close Button */}
            <button
              className="w-full bg-blue-700 text-white mt-6 p-3 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
