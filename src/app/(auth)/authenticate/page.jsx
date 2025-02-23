// "use client";
// import { Button, Input } from "@nextui-org/react";
// import Link from "next/link";
// import { useState } from "react";
// import MyDatePicker from "./MyDatePicker";
// import useRedirect from "@/app/hooks/useRedirect";

// function Authentication({ phone }) {
//   const { redirectTo } = useRedirect();
//   const user = JSON.parse()
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [nationalCode, setNationalCode] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState(null);

//   const submitUser = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("token", localStorage.getItem("token"));
//       formData.append("nc", nCode);
//       formData.append("name", fName);
//       formData.append("family", lName);
//       formData.append("birth", dateBirth);
//       const res = await axios.post(`${Config.apiUrl}/user/identify`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: "Bearer " + token,
//         },
//       });

//       if (res.data.code === 1) {
//         window.location.href = "/userPanel";
//         toast.success("به پنل کاربری خوش آمدید");
//       } else {
//         toast.error(res.data.error);
//       }
//     } catch (error) {
//       toast.error("Error verifying OTP:", error);
//     }
//   };
//   const isFormValid = () => {
//     return (
//       firstName.trim() !== "" &&
//       lastName.trim() !== "" &&
//       nationalCode.trim() !== "" &&
//       dateOfBirth !== null
//     );
//   };
//   return (
//     <div className="flex flex-col py-5 px-2 h-screen justify-between max-w-2xl mx-auto">
//       <div className="flex flex-col gap-6">
//         <div className="relative h-4">
//           <div className="absolute h-1 w-full ml-2 top-1/2 bg-green-400"></div>
//           <div className="absolute w-full flex justify-between items-center text-sm text-gray-400">
//             <p className="pl-2 bg-white text-green-600">ثبت نام</p>
//             <p className="px-4 bg-white text-green-600">کد فعال‌سازی</p>
//             <p className="mx-2 px-4 bg-white text-green-600">رمز عبور</p>
//             <p className="px-4 bg-white text-black">احراز هویت</p>
//           </div>
//         </div>
//         <p className="text-lg">احراز هویت</p>
//         <Input
//           value={firstName}
//           onChange={(e) => {
//             setFirstName(e.target.value);
//             setFirstName(e.target.value);
//           }}
//           type="text"
//           variant="bordered"
//           label="نام"
//         />
//         <Input
//           value={lastName}
//           onChange={(e) => {
//             setLastName(e.target.value);
//             setLastName(e.target.value);
//           }}
//           type="text"
//           variant="bordered"
//           label="نام و نام خانوادگی"
//         />
//         <div className="w-full flex">
//           <p>تاریخ تولد:</p>
//           <MyDatePicker
//             setDateOfBirth={setDateOfBirth}
//             setDateBirth={setDateOfBirth}
//           />
//         </div>
//         <Input
//           type="number"
//           value={nationalCode}
//           onChange={(e) => {
//             setNationalCode(e.target.value);
//             setNationalCode(e.target.value);
//           }}
//           variant="bordered"
//           label="کد ملی"
//         />
//         <Input
//           value={phone}
//           color={"primary"}
//           label="شماره موبایل"
//           type="number"
//           size="lg"
//           variant="bordered"
//           errorMessage="فیلد اجباری"
//           disabled={true}
//         />
//       </div>
//       <div className="flex flex-col gap-2">
//         <Button
//           color="primary"
//           onClick={() => {
//             submitUser();
//             redirectTo("/userPanel");
//           }}
//         >
//           ثبت اطلاعات
//         </Button>
//         {/* <Link
//           href={"/userPanel"}
//           className="bg-gray-300 p-2 rounded-lg text-center text-sm"
//         >
//           رد کردن
//         </Link> */}
//       </div>
//     </div>
//   );
// }

// export default Authentication;

"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import UserPanelDatePicker from "@/components/userPanel/UserPanelDatePicker";
import Config from "@/components/config";

const IdentifyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [phone, setPhone] = useState("");
  const [token, setToken] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const router = useRouter();

  // Load phone and token from localStorage when the component mounts
  useEffect(() => {
    const user = localStorage.getItem("userData");
    const storedPhone = user.phone;
    const storedToken = localStorage.getItem("token");
    if (storedPhone && storedToken) {
      setPhone(storedPhone);
      setToken(storedToken);
    }
  }, []);

  const onSubmit = async (data) => {
    const storedToken = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("token", storedToken);
    formData.append("nc", data.nationalCode);
    formData.append("name", data.firstName);
    formData.append("family", data.lastName);
    formData.append("birth", birthDate);
    try {
      const response = await axios.post(
        `${Config.apiUrl}/user/identify`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.code === 1) {
        router.push("/userPanel"); // Redirect to user panel
      } else {
        alert("خطا: اطلاعات نامعتبر است.");
      }
    } catch (error) {
      console.error("Error identifying user:", error);
      alert("خطایی رخ داده است. لطفاً دوباره امتحان کنید.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          احراز هویت
        </h2>

        {/* Display phone number (read-only) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">شماره تلفن</label>
          <input
            type="text"
            value={phone}
            disabled
            className="w-full p-2 border border-gray-300 rounded mt-1 bg-gray-100"
          />
        </div>

        {/* First Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">نام</label>
          <input
            type="text"
            {...register("firstName", { required: "نام را وارد کنید" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            نام خانوادگی
          </label>
          <input
            type="text"
            {...register("lastName", { required: "نام خانوادگی را وارد کنید" })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* National Code Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">کد ملی</label>
          <input
            type="text"
            {...register("nationalCode", {
              required: "کد ملی را وارد کنید",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "کد ملی باید 10 رقم باشد",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {errors.nationalCode && (
            <p className="text-red-500 text-sm">
              {errors.nationalCode.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <span className="text-sm text-gray-600">تا تاریخ</span>
          <UserPanelDatePicker setdate={setBirthDate} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default IdentifyForm;
