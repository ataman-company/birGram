// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import InformationOfGold from "./InformationOfGold";
// import axios from "axios";
// import Config from "../config";
// import Loading from "../Loading";
// const Content = () => {
//   const [data, setData] = useState(false);
//   const [currentPrice, setCurrentPrice] = useState(0);
//   const serverdata = async () => {
//     try {
//       const res = await axios.get(`${Config.apiUrl}/splash`);
//       if (res.data.code === 1) {
//         setData(res.data);
//         setCurrentPrice(res.data.current_price);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     serverdata();
//     let interval = setInterval(getCurrentPrice, 5000);
//   }, []);
//   const getCurrentPrice = async () => {
//     try {
//       const res = await axios.get(`${Config.apiUrl}/lastprice`);
//       if (res.data.code === 1) {
//         setCurrentPrice(res.data.current_price);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const headerSub = data?.options?.header_sub || "";
//   const headerH1 = data?.options?.header_h1 || "";
//   const header_description = data?.options?.header_description || "";

//   const words = headerSub.split(" ");
//   const words2 = headerH1.split(" ");

//   const firstword =
//     words.length > 1 ? words[0] + " " + words[1] : words[0] || "";
//   const sectword = words.length > 3 ? words[2] + " " + words[3] : "";
//   const firstword2 =
//     words2.length > 4 ? words2.slice(0, 5).join(" ") : words2.join(" ");
//   const sectword2 = words2[5] || "";

//   return (
//     <>
//       {data ? (
//         <>
//           <div className="flex md:flex-row flex-col gap-10 sm:mt-20 mt-5">
//             <div className="flex flex-col gap-4 sm:w-1/2 w-full">
//               <div className="flex gap-1">
//                 <h1 className="sm:text-2xl text-sm text-white">{firstword}</h1>
//                 <span className="sm:text-2xl text-sm text-yellow-400">
//                   {sectword}
//                 </span>
//               </div>
//               <div className="flex gap-1">
//                 <h1 className="sm:text-4xl text-xl text-white">{firstword2}</h1>
//                 <span className="sm:text-4xl text-xl text-yellow-400">
//                   {sectword2}
//                 </span>
//               </div>
//               <p className="sm:text-lg text-sm text-white">
//                 {header_description}
//               </p>

//               <Link
//                 href={"/login"}
//                 className="sm:text-lg text-sm bg-yellow-400 rounded-xl md:px-10 lg:px-20 py-3 xl:w-1/2 lg:w-2/3 md:w-full sm:w-full flex justify-center"
//               >
//                 ورود | ثبت نام
//               </Link>
//             </div>
//             <InformationOfGold
//               contentWidth="xl:w-[500px] lg:w-[400px] md:w-[300px]"
//               placement="top"
//               show={true}
//               data={data}
//               currentPrice={currentPrice}
//             />
//           </div>
//         </>
//       ) : (
//         <>
//           <Loading />
//         </>
//       )}
//     </>
//   );
// };

// export default Content;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import InformationOfGold from "./InformationOfGold";
import axios from "axios";
import Config from "../config";
import Loading from "../Loading";

const Content = () => {
  const [data, setData] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [token, setToken] = useState(null); // State to track the token

  // Check if token exists in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Set token if found in localStorage
    }
  }, []);

  const serverdata = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/splash`);
      if (res.data.code === 1) {
        setData(res.data);
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    serverdata();
    let interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const getCurrentPrice = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/lastprice`);
      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const headerSub = data?.options?.header_sub || "";
  const headerH1 = data?.options?.header_h1 || "";
  const header_description = data?.options?.header_description || "";

  const words = headerSub.split(" ");
  const words2 = headerH1.split(" ");

  const firstword =
    words.length > 1 ? words[0] + " " + words[1] : words[0] || "";
  const sectword = words.length > 3 ? words[2] + " " + words[3] : "";
  const firstword2 =
    words2.length > 4 ? words2.slice(0, 5).join(" ") : words2.join(" ");
  const sectword2 = words2[5] || "";

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    setToken(null); // Clear the token state
  };

  return (
    <>
      {data ? (
        <>
          <div className="flex md:flex-row flex-col gap-10 sm:mt-20 mt-5">
            <div className="flex flex-col gap-4 sm:w-1/2 w-full">
              <div className="flex gap-1">
                <h1 className="sm:text-2xl text-sm text-white">{firstword}</h1>
                <span className="sm:text-2xl text-sm text-yellow-400">
                  {sectword}
                </span>
              </div>
              <div className="flex gap-1">
                <h1 className="sm:text-4xl text-xl text-white">{firstword2}</h1>
                <span className="sm:text-4xl text-xl text-yellow-400">
                  {sectword2}
                </span>
              </div>
              <p className="sm:text-lg text-sm text-white">
                {header_description}
              </p>

              {/* Conditionally render Login/Register or Logout */}
              <Link
                href={token ? "#" : "/login"} // If token exists, do nothing on click (show logout)
                className="sm:text-lg text-sm bg-yellow-400 rounded-xl md:px-10 lg:px-20 py-3 xl:w-1/2 lg:w-2/3 md:w-full sm:w-full flex justify-center"
                onClick={token ? handleLogout : undefined} // If token exists, handle logout
              >
                {token ? "خروج" : "ورود | ثبت نام"}
              </Link>
            </div>
            <InformationOfGold
              contentWidth="xl:w-[500px] lg:w-[400px] md:w-[300px]"
              placement="top"
              show={true}
              data={data}
              currentPrice={currentPrice}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Content;
