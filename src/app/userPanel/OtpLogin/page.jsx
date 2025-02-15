// "use client";
// import Image from "next/image";
// import { Button, InputOtp } from "@nextui-org/react";
// import React, { useState, useEffect } from "react";

// function ActivingCode() {
//   // دریافت تابع به عنوان prop
//   const [value, setValue] = useState("");
//   const [isVisible, setIsVisible] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [showNewDiv, setShowNewDiv] = useState(false);
//   const [otpValue, setOtpValue] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//       setShowNewDiv(true);
//     }, 60000);

//     const countdown = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(countdown);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => {
//       clearTimeout(timer);
//       clearInterval(countdown);
//     };
//   }, []);
//   const submitOtp = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("code", otpValue);

//       const res = await axios.post(
//         `${Config.apiUrl}/user/activeauth`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.data.code === 1) {
//         setStep(2);
//         setToken(res.data.user.token);
//       } else {
//         alert(res.data.error);
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//     }
//   };

//   // فراخوانی تابع onOtpChange هنگام تغییر مقدار OTP
//   useEffect(() => {
//     onOtpChange(value); // ارسال مقدار OTP به کامپوننت پدر
//   }, [value]);
//   const onOtpChange = (otp) => {
//     setOtpValue(otp);
//   };

//   return (
//     <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
//       <div className="flex flex-col gap-6">
//         <div className="relative h-4">
//           <div className="absolute h-1 w-full ml-2 top-1/2 bg-gradient-to-l from-green-500 to-gray-400  to-40%"></div>
//           <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
//             <p className="pl-2 bg-white text-green-600">ثبت نام</p>
//             <p className="px-4 bg-white text-black">کد فعال‌سازی</p>
//             <p className="mx-2 px-4 bg-white">رمز عبور</p>
//             <p className="px-4 bg-white">احراز هویت</p>
//           </div>
//         </div>
//         <p className="text-lg">کد فعال‌سازی</p>

//         <button className="flex gap-2" onClick={() => setStep(0)}>
//           <Image width={24} height={24} src={"/icons/edit.svg"} alt="edit" />
//           <p className="text-sm text-indigo-600">ویرایش شماره</p>
//         </button>
//         <div dir="ltr" className="flex flex-col items-center gap-2">
//           <InputOtp
//             length={5}
//             value={value}
//             onValueChange={(val) => {
//               setValue(val);
//               onOtpChange(val); // ارسال مقدار OTP به کامپوننت پدر
//             }}
//             size="lg"
//             variant="bordered"
//           />

//           {isVisible ? (
//             <div className="my-div">
//               <p className="text-sm">زمان باقی‌مانده: {timeLeft} ثانیه</p>
//             </div>
//           ) : (
//             showNewDiv && (
//               <div className="flex gap-1 items-center">
//                 <Button variant="bordered" color="primary">
//                   ارسال مجدد
//                   <Image
//                     width={24}
//                     height={24}
//                     src={"/icons/again.svg"}
//                     alt="again"
//                   />
//                 </Button>
//                 <p className="text-sm text-red-400">کد شما منقضی شده است</p>
//               </div>
//             )
//           )}
//           <button
//             onClick={submitOtp}
//             className="w-[100px] py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
//           >
//             ارسال کد
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ActivingCode;

"use client";
import Image from "next/image";
import { Button, InputOtp } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "@/components/config";
import { useRouter } from "next/navigation";

function ActivingCode() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  // Start timer countdown and change view when time expires
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowNewDiv(true);
    }, 60000);

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, []);

  // Function to send OTP for verification (called on "ارسال کد")
  const submitOtp = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("code", otpValue);

      const res = await axios.post(
        `${Config.apiUrl}/user/activeauthlast`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 1) {
        // For example, proceed to the next step and set the

        router.push("/userPanel/Profile");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // Update otpValue whenever the InputOtp value changes
  useEffect(() => {
    onOtpChange(value);
  }, [value]);

  const onOtpChange = (otp) => {
    setOtpValue(otp);
  };

  // New: When the user clicks on the expired message area,
  // send a GET request to /user/activewauth to resend the OTP.
  const handleResendCode = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${Config.apiUrl}/user/activeauth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code === 1) {
        // Optionally show a success message
        // Reset the timer and show the OTP input again
        setTimeLeft(60);
        setIsVisible(true);
        setShowNewDiv(false);
      } else {
        alert(res.data.error || "خطا در ارسال مجدد کد");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    }
  };

  return (
    <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <div dir="ltr" className="flex flex-col items-center gap-2">
          <InputOtp
            length={5}
            value={value}
            onValueChange={(val) => {
              setValue(val);
              onOtpChange(val);
            }}
            size="lg"
            variant="bordered"
          />

          {isVisible ? (
            <div className="my-div">
              <p className="text-sm">زمان باقی‌مانده: {timeLeft} ثانیه</p>
            </div>
          ) : (
            showNewDiv && (
              // Wrap the resend area with an onClick to trigger the GET request.
              <div className="flex gap-1 items-center cursor-pointer">
                <button
                  onClick={handleResendCode}
                  variant="bordered"
                  color="primary"
                >
                  ارسال مجدد
                  <Image
                    width={24}
                    height={24}
                    src={"/icons/again.svg"}
                    alt="again"
                  />
                </button>
                <p className="text-sm text-red-400">کد شما منقضی شده است</p>
              </div>
            )
          )}
          <button
            onClick={submitOtp}
            className="w-[100px] py-3 text-white font-semibold rounded-md bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            ارسال کد
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActivingCode;
