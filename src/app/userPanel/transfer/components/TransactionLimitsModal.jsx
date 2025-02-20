// import { useState, useEffect } from "react";
// import { X } from "lucide-react";

// const TransactionLimitsModal = ({ onClose }) => {
//   const [data, setData] = useState(null); // Will store the options data

//   // Function to get options from localStorage
//   useEffect(() => {
//     const options = JSON.parse(localStorage.getItem("Options"));
//     setData(options);
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4">
//           <X size={20} className="text-gray-600" />
//         </button>

//         {/* Modal Title */}
//         <h2 className="text-lg font-bold text-center mb-4">
//           راهنمای تراکنش‌ها
//         </h2>

//         {/* Transaction List */}
//         <div className="mt-6 space-y-4">
//           {data && (
//             <>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>کارمزد شارژ حساب</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.chargefee}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>حداقل مقدار واریز</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.mindeposit}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>کارمزد ارسال طلا</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.sendgoldfee}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>کارمزد ضرب طلا</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.physicalfee}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>پاداش دعوت دوستان</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.referralreward}</p>
//                 </div>
//               </div>
//               <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
//                 <p>تعداد کارمزد رایگان اولیه</p>
//                 <div className="text-right">
//                   <p className="text-gray-600">{data.freefeecount}</p>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionLimitsModal;

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TransactionLimitsModal = ({ onClose }) => {
  const [data, setData] = useState(null); // Will store the options data

  // Function to get options from localStorage
  useEffect(() => {
    const options = JSON.parse(localStorage.getItem("Options"));
    setData(options);
  }, []);

  // Function to format numbers with commas
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-bold text-center mb-4">
          راهنمای تراکنش‌ها
        </h2>

        {/* Transaction List */}
        <div className="mt-6 space-y-4">
          {data && (
            <>
              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>کارمزد شارژ حساب</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.chargefee)}%
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>کارمزد ارسال طلا</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.sendgoldfee)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>کارمزد ضرب طلا</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.physicalfee)}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>پاداش دعوت دوستان</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.referralreward)} میلی گرم
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>حداقل مقدار واریز</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.mindeposit)} تومان
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm p-2 border-b border-gray-200">
                <p>تعداد کارمزد رایگان اولیه</p>
                <div className="text-right">
                  <p className="text-gray-600">
                    {formatNumber(data.freefeecount)} تراکنش
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionLimitsModal;
