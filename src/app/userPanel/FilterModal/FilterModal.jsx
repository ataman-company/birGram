"use client";
import UserPanelDatePicker from "@/components/userPanel/UserPanelDatePicker";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const FilterModal = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Handles closing when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // Close the modal when clicking on the backdrop
    }
  };

  const onSubmit = (data) => {
    const filterValues = { ...data, fromDate, toDate };

    // Optionally update the parent component's state

    // Build query parameters from the filterValues,
    // defaulting to empty strings if a value is not provided.
    const queryParams = {
      type: filterValues.transactionType || "",
      status: filterValues.transactionStatus || "",
      startdate: filterValues.fromDate || "",
      enddate: filterValues.toDate || "",
    };

    // Convert the query parameters object into a query string.
    const queryString = new URLSearchParams(queryParams).toString();

    // Update the URL with the new query parameters.
    router.push(`?${queryString}`);

    onClose(); // Close the modal after submission
  };

  const transactionTypes = [
    { name: "برداشت کیف پول", value: "out" },
    { name: "خرید", value: "buy" },
    { name: "فروش", value: "sell" },
    { name: "انتقال طلا", value: "send" },
    { name: "دریافت طلا", value: "receive" },
    { name: "هدیه معرفی", value: "ref" },
    { name: "خرید کارت هدیه", value: "cartbuy" },
    { name: "دریافت کارت هدیه", value: "receivecart" },
    { name: "دریافت فیزیکی طلا", value: "physical" },
    { name: "سیستمی", value: "system" },
  ];

  const transactionStatusTypes = ["موفق", "ناموفق", "در حال انجام"];

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 max-w-2xl mx-auto"
      onClick={handleOutsideClick} // Detects clicks outside the modal
      dir="rtl"
    >
      <div
        className="bg-white rounded-xl p-6 w-full h-[75%] relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Transaction Type */}
          <div>
            <label
              htmlFor="transactionType"
              className="block text-sm font-medium text-gray-700"
            >
              نوع تراکنش
            </label>
            <div className="relative mt-1">
              <select
                id="transactionType"
                {...register("transactionType")}
                className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              >
                <option value="">انتخاب کنید</option>
                {transactionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.transactionType && (
              <p className="text-red-500 text-xs">
                {errors.transactionType.message}
              </p>
            )}
          </div>

          {/* Transaction Status */}
          <div>
            <label
              htmlFor="transactionStatus"
              className="block text-sm font-medium text-gray-700"
            >
              وضعیت تراکنش
            </label>
            <div className="relative mt-1">
              <select
                id="transactionStatus"
                {...register("transactionStatus")}
                className="block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              >
                <option value="">انتخاب کنید</option>
                {transactionStatusTypes.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {errors.transactionStatus && (
              <p className="text-red-500 text-xs">
                {errors.transactionStatus.message}
              </p>
            )}
          </div>

          {/* Date Pickers */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="w-full">
              <span className="text-sm text-gray-600">از تاریخ</span>
              <UserPanelDatePicker setdate={setFromDate} />
            </div>
            <div className="w-full">
              <span className="text-sm text-gray-600">تا تاریخ</span>
              <UserPanelDatePicker setdate={setToDate} />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push("/userPanel/transactions");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              حذف فیلتر
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
