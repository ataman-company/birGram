// import React from "react";

// const TransactionTable = ({ transactions = [] }) => {
//   const formatDate = (dateString) => {
//     const str = String(dateString);
//     if (str.length !== 8) return str;
//     return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6)}`;
//   };

//   // Returns a Tailwind color class based on the value
//   const getColorClass = (value) => {
//     return Number(value) < 0 ? "text-red-500" : "text-green-500";
//   };

//   return (
//     <div className="w-full" dir="rtl">
//       {/* Desktop Table (visible on small screens and up) */}
//       <div className="hidden sm:block overflow-x-auto mx-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 عنوان
//               </th>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 مبلغ
//               </th>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 میلی گرم
//               </th>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 تاریخ
//               </th>
//               <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 گد رهگیری
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {transactions.map((transaction) => (
//               <tr key={transaction.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                   {transaction.text}
//                 </td>
//                 <td
//                   className={`px-6 py-4 whitespace-nowrap text-center text-sm ${getColorClass(
//                     transaction.amount
//                   )}`}
//                 >
//                   {Math.abs(Number(transaction.amount))}
//                 </td>
//                 <td
//                   className={`px-6 py-4 whitespace-nowrap text-center text-sm ${getColorClass(
//                     transaction.gold
//                   )}`}
//                 >
//                   {Math.abs(Number(transaction.gold))}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                   {formatDate(transaction.jdate)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap  text-center text-sm text-gray-900">
//                   {transaction.refid}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Card Layout (visible on screens smaller than sm) */}
//       <div className="sm:hidden space-y-4">
//         {transactions.map((transaction) => (
//           <div
//             key={transaction.id}
//             className="bg-white shadow overflow-hidden rounded-lg"
//           >
//             <div className="px-4 py-5 border-b border-gray-200">
//               <h3 className="text-lg font-medium text-gray-900">
//                 {transaction.text}
//               </h3>
//             </div>
//             <div className="px-4 py-5">
//               <dl className="grid grid-cols-2 gap-y-2">
//                 <div className="bg-gray-50 p-2 rounded">
//                   <dt className="text-xs font-medium text-gray-500">مبلغ</dt>
//                   <dd
//                     className={`text-sm ${getColorClass(transaction.amount)}`}
//                   >
//                     {Math.abs(Number(transaction.amount))}
//                   </dd>
//                 </div>
//                 <div className="bg-white p-2 rounded">
//                   <dt className="text-xs font-medium text-gray-500">طلا</dt>
//                   <dd className={`text-sm ${getColorClass(transaction.gold)}`}>
//                     {Math.abs(Number(transaction.gold))}
//                   </dd>
//                 </div>
//                 <div className="bg-gray-50 p-2 rounded">
//                   <dt className="text-xs font-medium text-gray-500">تاریخ</dt>
//                   <dd className="text-sm text-gray-900">
//                     {formatDate(transaction.jdate)}
//                   </dd>
//                 </div>
//                 <div className="bg-white p-2 rounded">
//                   <dt className="text-xs font-medium text-gray-500">
//                     گد رهگیری
//                   </dt>
//                   <dd className="text-sm text-gray-900">{transaction.refid}</dd>
//                 </div>
//               </dl>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;

import React from "react";

const TransactionTable = ({ transactions = [] }) => {
  const formatDate = (dateString) => {
    const str = String(dateString);
    if (str.length !== 8) return str;
    return `${str.slice(0, 4)}/${str.slice(4, 6)}/${str.slice(6)}`;
  };

  // Format numbers with commas for Persian users
  const formatNumber = (number) => {
    return new Intl.NumberFormat("fa-IR").format(Math.abs(Number(number)));
  };

  // Returns a Tailwind color class based on the value
  const getColorClass = (value) => {
    return Number(value) < 0 ? "text-red-500" : "text-green-500";
  };

  return (
    <div className="w-full" dir="rtl">
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                عنوان
              </th>
              <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                مبلغ
              </th>
              <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                میلی گرم
              </th>
              <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ
              </th>
              <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                گد رهگیری
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {transaction.text}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm ${getColorClass(
                    transaction.amount
                  )}`}
                >
                  {formatNumber(transaction.amount)}
                </td>
                <td
                  className={`px-2 py-4 whitespace-nowrap text-center text-sm ${getColorClass(
                    transaction.gold
                  )}`}
                >
                  {formatNumber(transaction.gold)}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {formatDate(transaction.jdate)}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                  {transaction.refid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white shadow overflow-hidden rounded-lg"
          >
            <div className="px-4 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {transaction.text}
              </h3>
            </div>
            <div className="px-4 py-5">
              <dl className="grid grid-cols-2 gap-y-2">
                <div className="bg-gray-50 p-2 rounded">
                  <dt className="text-xs font-medium text-gray-500">مبلغ</dt>
                  <dd
                    className={`text-sm ${getColorClass(transaction.amount)}`}
                  >
                    {formatNumber(transaction.amount)}
                  </dd>
                </div>
                <div className="bg-white p-2 rounded">
                  <dt className="text-xs font-medium text-gray-500">طلا</dt>
                  <dd className={`text-sm ${getColorClass(transaction.gold)}`}>
                    {formatNumber(transaction.gold)}
                  </dd>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <dt className="text-xs font-medium text-gray-500">تاریخ</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(transaction.jdate)}
                  </dd>
                </div>
                <div className="bg-white p-2 rounded">
                  <dt className="text-xs font-medium text-gray-500">
                    گد رهگیری
                  </dt>
                  <dd className="text-sm text-gray-900">{transaction.refid}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
