"use client";
import { useState, useEffect } from "react";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function GiftCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteName, setSiteName] = useState(null);

  // This ensures that localStorage is accessed only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSiteName = localStorage.getItem("siteName");
      if (storedSiteName) {
        setSiteName(storedSiteName);
      }
    }
  }, []); // Empty dependency ensures this runs once after initial render

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-screen max-w-2xl mx-auto flex flex-col p-4 bg-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3 ">
        <Link href="/userPanel/ServicePage">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          دریافت طلا
        </h1>
      </div>

      {/* Image Section */}
      <div className="flex justify-center mt-4">
        <Image
          src="/images/userPanel/gift-card.png"
          alt="Gift Card"
          width={200}
          height={200}
        />
      </div>

      {/* Description */}
      <p className="text-center text-gray-700 mt-4 leading-relaxed">
        با کارت هدیه {siteName ? siteName : "loading..."} بدون دردسر به دوستان و
        عزیزان خود طلا هدیه دهید.
      </p>

      {/* Learn More */}
      <p className="text-center text-sm text-gray-500 mt-2">
        اطلاعات بیشتر:
        <Link href="/gift" className="text-blue-500 underline mx-1">
          اینجا
        </Link>
      </p>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-500 mt-4 px-6">
        کارت هدیه پس از تاریخ درج شده روی آن منقضی شده و در صورت عدم استفاده،
        موجودی آن صرف امور خیریه می‌شود.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/userPanel/shop">
          <p className="w-full bg-yellow-400 text-black p-4 rounded-xl text-center font-semibold">
            می‌خواهم {siteName ? siteName : "loading..."} هدیه بدهم
          </p>
        </Link>
        <button
          onClick={openModal}
          className="w-full bg-blue-900 text-white p-4 rounded-xl text-center font-semibold"
        >
          هدیه گرفته‌ام
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <ShabaModal onClose={closeModal} />}
    </div>
  );
}

// Modal Component for Shaba Input
function ShabaModal({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { redirectTo } = useRedirect();

  const formatAccountNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove all non-numeric characters
      .slice(0, 16) // Limit to 16 digits
      .replace(/(\d{4})(?=\d)/g, "$1-"); // Insert "-" every 4 digits
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("serial", formatAccountNumber(data.serial));

      const res = await axios.post(
        `${Config.apiUrl}/user/giftcart/sendserial`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 1) {
        redirectTo("/userPanel/transactions");
        onClose();
        // Optionally navigate or display a success message
      } else {
        toast.error("سریال وارد شده صحیح نیست");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-lg font-bold mb-4 text-center">ورود کد هدیه</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="serial"
              className="block text-sm font-medium text-gray-700"
            >
              سریال هدیه را وارد کنید :
            </label>
            <input
              id="serial"
              type="text"
              placeholder="مثلاً 1234567890123456"
              {...register("serial", {
                required: "کد هدیه الزامی است",
                pattern: {
                  value: /^\d{16}$/,
                  message: "کد هدیه باید 16 رقم باشد",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.serial && (
              <p className="text-xs text-red-500 mt-1">
                {errors.serial.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              لغو
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-900 text-white rounded-md"
            >
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
