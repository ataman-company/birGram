// "use client";
// import Config from "@/components/config";
// import Link from "next/link";
// import React from "react";

// const TicketsTable = ({ tickets, loading, error }) => {
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false, // 24-hour format
//     };
//     return date.toLocaleString("fa-IR", options); // Formats in 24-hour format, using Farsi locale
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {loading ? (
//         <div className="text-center text-lg font-semibold">Loading...</div>
//       ) : error ? (
//         <div className="text-center text-red-500 font-semibold">{error}</div>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-xl bg-white p-4">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   موضوع
//                 </th>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   تاریخ
//                 </th>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   وضعیت
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {tickets.map((ticket, index) => (
//                 <tr
//                   key={ticket.id}
//                   className={`hover:bg-blue-50 transition-colors ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//                 >
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     <Link href={`/userPanel/chatBox?id=${ticket.id}`}>
//                       {ticket.subject}
//                     </Link>
//                   </td>
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     {formatDate(ticket.date)}
//                   </td>
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     {ticket.unseen == 1 ? "پاسخ داده شده" : "در انتظار پاسخ"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketsTable;

// "use client";
// import Config from "@/components/config";
// import Link from "next/link";
// import React from "react";

// const TicketsTable = ({ tickets, loading, error }) => {
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
//     const options = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false, // 24-hour format
//     };
//     return date.toLocaleString("fa-IR", options); // Formats in 24-hour format, using Farsi locale
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {loading ? (
//         <div className="text-center text-lg font-semibold">Loading...</div>
//       ) : error ? (
//         <div className="text-center text-red-500 font-semibold">{error}</div>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-xl bg-white p-4">
//           <table className="min-w-full divide-y divide-gray-200 table-auto">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   موضوع
//                 </th>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   تاریخ
//                 </th>
//                 <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   وضعیت
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {tickets.map((ticket, index) => (
//                 <tr
//                   key={ticket.id}
//                   className={`hover:bg-blue-50 transition-colors ${
//                     index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   }`}
//                 >
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     <Link href={`/userPanel/chatBox?id=${ticket.id}`}>
//                       {ticket.subject}
//                     </Link>
//                   </td>
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     {formatDate(ticket.date)}
//                   </td>
//                   <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
//                     {ticket.unseen == 1 ? "پاسخ داده شده" : "در انتظار پاسخ"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Responsive adjustments */}
//           <div className="block lg:hidden">
//             {tickets.map((ticket) => (
//               <div
//                 key={ticket.id}
//                 className="bg-white shadow-md rounded-lg mb-4 p-4"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-sm font-semibold text-gray-900">
//                     {ticket.subject}
//                   </h3>
//                   <p className="text-xs text-gray-500">
//                     {formatDate(ticket.date)}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-900 mt-2">
//                   {ticket.unseen == 1 ? "پاسخ داده شده" : "در انتظار پاسخ"}
//                 </p>
//                 <div className="mt-3">
//                   <Link
//                     href={`/userPanel/chatBox?id=${ticket.id}`}
//                     className="text-blue-500 text-sm"
//                   >
//                     مشاهده جزئیات
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TicketsTable;

"use client";
import Config from "@/components/config";
import Loading from "@/components/Loading";
import Link from "next/link";
import React from "react";

const TicketsTable = ({ tickets, loading, error }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };
    return date.toLocaleString("fa-IR", options); // Formats in 24-hour format, using Farsi locale
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl bg-white p-4">
          {/* Table - Visible on large screens */}
          <table className="min-w-full divide-y divide-gray-200 hidden lg:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  موضوع
                </th>
                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ
                </th>
                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    <Link
                      className="text-blue-500"
                      href={`/userPanel/chatBox?id=${ticket.id}`}
                    >
                      {ticket.subject}
                    </Link>
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {formatDate(ticket.date)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {ticket.unseen == 1 ? "پاسخ داده شده" : "در انتظار پاسخ"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card View - Visible on small screens */}
          <div className="lg:hidden">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-md rounded-lg mb-4 p-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {ticket.subject}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatDate(ticket.date)}
                  </p>
                </div>
                <p className="text-sm text-gray-900 mt-2">
                  {ticket.unseen == 1 ? "پاسخ داده شده" : "در انتظار پاسخ"}
                </p>
                <div className="mt-3">
                  <Link
                    href={`/userPanel/chatBox?id=${ticket.id}`}
                    className="text-blue-500 text-sm"
                  >
                    مشاهده جزئیات
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsTable;
