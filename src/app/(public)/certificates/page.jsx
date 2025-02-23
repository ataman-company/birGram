// "use client";
// import Config from "@/components/config";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import React from "react";

// const page = () => {
//   const certificates = JSON.parse(localStorage.getItem("certificates"));

//   return (
//     <div className="bg-blue-50">
//       <div className="bg-gradient-to-r from-blue-950 to-blue-800">
//         <div className="container pb-3 mx-auto relative px-3">
//           <Header />
//         </div>
//       </div>
//       <div className="certificates-list w-full">
//         {certificates.map((item) => (
//          {(item.mini == 0)&& ( <div key={item.id} className="certificate-item w-full">
//             <h3>{item.title}</h3>
//             {item.text === "1" ? (
//               <div
//                 dangerouslySetInnerHTML={{ __html: item.img }}
//                 className="certificate-img w-full"
//               />
//             ) : (
//               <img
//                 src={`${Config.baseUrl}/${item.img}`}
//                 alt={item.title}
//                 className="w-full h-auto"
//               />
//             )}
//           </div>)}
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default page;

"use client";
import Config from "@/components/config";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const page = () => {
  const certificates = JSON.parse(localStorage.getItem("certificates"));
  const siteName = JSON.parse(localStorage.getItem("siteName"));
  console.log(siteName);
  return (
    <div className="bg-blue-50">
      <div className="bg-gradient-to-r from-blue-950 to-blue-800">
        <div className="container pb-3 mx-auto relative px-3">
          <Header />
        </div>
      </div>
      <h1 className="flex items-center justify-center certificate-item w-full mt-6 text-3xl font-bold">
        مجوزهای <span className="text-[#ffbe00] mx-2 ">{siteName}</span>
      </h1>

      <div className="certificates-list w-full mt-2">
        {certificates.map((item) => {
          if (item.mini == 0) {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center certificate-item w-full m-3 "
              >
                <h3 className="text-2xl font-bold text-[#051061] tracking-wide text-right m-4">
                  {item.title}
                </h3>
                {item.text === "1" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: item.img }}
                    className="certificate-img w-full"
                  />
                ) : (
                  <img
                    src={`${Config.baseUrl}/${item.img}`}
                    alt={item.title}
                    className="w-[60%] h-auto p-4"
                  />
                )}
              </div>
            );
          }
          return null; // Return null if item.mini is not 0, ensuring no unnecessary rendering
        })}
      </div>
      <Footer />
    </div>
  );
};

export default page;
