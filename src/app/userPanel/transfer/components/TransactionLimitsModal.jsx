// "use client";
// import { X } from "lucide-react";

// const TransactionLimitsModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <X size={20} className="text-gray-600" />
//         </button>

//         {/* Modal Title */}
//         <h2 className="text-lg font-bold text-center">محدودیت تراکنش‌ها</h2>

//         {/* Tabs for Daily & Monthly */}
//         <div className="flex justify-center mt-4 space-x-4">
//           <button className="bg-[#001A80] text-white px-4 py-2 rounded-lg">
//             روزانه
//           </button>
//           <button className="text-gray-700 px-4 py-2">ماهانه</button>
//         </div>

//         {/* Transaction List */}
//         <div className="mt-6 space-y-4">
//           <div className="flex justify-between text-sm">
//             <p>واریز به کیف پول</p>
//             <p className="text-gray-600">سقف: ۲۰,۰۰۰,۰۰۰ ریال</p>
//           </div>
//           <div className="flex justify-between text-sm">
//             <p>برداشت از کیف پول</p>
//             <p className="text-gray-600">سقف: ۱,۰۰۰,۰۰۰ ریال</p>
//           </div>
//           <div className="flex justify-between text-sm">
//             <p>خرید میلی</p>
//             <p className="text-gray-600">سقف: ۵۰ میلی گرم</p>
//           </div>
//           <div className="flex justify-between text-sm">
//             <p>فروش میلی</p>
//             <p className="text-gray-600">سقف: ۱۰۰ میلی گرم</p>
//           </div>
//           <div className="flex justify-between text-sm">
//             <p>انتقال میلی</p>
//             <p className="text-gray-600">سقف: ۵۰ میلی گرم</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionLimitsModal;

"use client";
import { useState } from "react";
import { X } from "lucide-react";

const TransactionLimitsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("daily"); // "daily" or "monthly"

  // Sample data for daily & monthly limits
  const dailyLimits = [
    {
      title: "واریز به کیف پول",
      limit: "۲۰,۰۰۰,۰۰۰ ریال",
      used: "۲,۰۰۰,۰۰۰ ریال",
    },
    {
      title: "برداشت از کیف پول",
      limit: "۱,۰۰۰,۰۰۰ ریال",
      used: "۱,۰۰۰,۰۰۰ ریال",
    },
    { title: "خرید میلی", limit: "۵۰ میلی گرم", used: "۵۰ میلی گرم" },
    { title: "فروش میلی", limit: "۱۰۰ میلی گرم", used: "۱۰۰ میلی گرم" },
    { title: "انتقال میلی", limit: "۵۰ میلی گرم", used: "۵۰ میلی گرم" },
  ];

  const monthlyLimits = [
    {
      title: "واریز به کیف پول",
      limit: "۶۰,۰۰۰,۰۰۰ ریال",
      used: "۴۰,۰۰۰,۰۰۰ ریال",
    },
    {
      title: "برداشت از کیف پول",
      limit: "۶۰,۰۰۰,۰۰۰ ریال",
      used: "۵۰,۰۰۰,۰۰۰ ریال",
    },
    { title: "خرید میلی", limit: "۱,۵۰۰ میلی گرم", used: "۱,۵۰۰ میلی گرم" },
    { title: "فروش میلی", limit: "۳,۰۰۰ میلی گرم", used: "۳,۰۰۰ میلی گرم" },
    { title: "انتقال میلی", limit: "۲,۵۰۰ میلی گرم", used: "۲,۵۰۰ میلی گرم" },
  ];

  const limitsData = activeTab === "daily" ? dailyLimits : monthlyLimits;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-bold text-center mb-4">
          محدودیت تراکنش‌ها
        </h2>

        {/* Tabs for Daily & Monthly */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "daily"
                ? "bg-[#001A80] text-white"
                : "text-gray-700"
            }`}
          >
            روزانه
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "monthly"
                ? "bg-[#001A80] text-white"
                : "text-gray-700"
            }`}
          >
            ماهانه
          </button>
        </div>

        {/* Transaction List */}
        <div className="mt-6 space-y-4">
          {limitsData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm p-2 border-b border-gray-200"
            >
              <p>{item.title}</p>
              <div className="text-right">
                <p className="text-gray-600">سقف: {item.limit}</p>
                <p className="text-gray-400 text-xs">باقیمانده: {item.used}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionLimitsModal;
