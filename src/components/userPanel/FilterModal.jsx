"use client";
import { Copy, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const FilterModal = ({ onClose, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCopyHesab = () => {
    if (!user?.hesab) return;
    navigator.clipboard
      .writeText(user.hesab)
      .then(() => {
        toast.success("حساب کپی شد!");
      })
      .catch(() => {
        toast.error("خطا در کپی کردن حساب");
      });
  };

  // Handles closing when clicking outside the modal content
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose(); // Close the modal when clicking on the backdrop
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const transactionTypes = [
    "واریز",
    "برداشت",
    "خرید ملی",
    "فروش ملی",
    "انتقال ملی",
    "دریافت شمش طلا",
    "دریافت کارت هدیه",
    "خرید کارت هدیه",
    "دریافت هدیه ملی",
    "تراکنش اصلاحی",
    "شارژ سیستمی",
  ];

  const transactionStatusTypes = ["موفق", "ناموفق", "در حال انجام"];

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOutsideClick} // Detects clicks outside the modal
    >
      <div
        className="bg-white rounded-xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray-600" />
        </button>

        {/* Modal Title */}
        <div className="modal-header mt-4 py-4">
          <h2>آدرس حساب مالی</h2>
        </div>

        {/* User Information */}
        <div className="modal-body">
          <p className="text-sm text-gray-500 mb-4">
            {user.name} {user.family}
          </p>
          <div className="border border-blue-400 rounded-lg p-3 bg-blue-50 flex justify-between items-center">
            <p className="font-semibold text-lg text-gray-900">{user.hesab}</p>
            <button onClick={handleCopyHesab} className="text-blue-600">
              <Copy className="h-5 w-5" /> {/* Copy icon */}
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="transactionType"
              className="block text-sm font-medium text-gray-700"
            >
              نوع تراکنش
            </label>
            <select
              id="transactionType"
              {...register("transactionType", {
                required: "این فیلد ضروری است",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">انتخاب کنید</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <p className="text-red-500 text-xs">
                {errors.transactionType.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="transactionStatus"
              className="block text-sm font-medium text-gray-700"
            >
              وضعیت تراکنش
            </label>
            <select
              id="transactionStatus"
              {...register("transactionStatus", {
                required: "این فیلد ضروری است",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">انتخاب کنید</option>
              {transactionStatusTypes.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.transactionStatus && (
              <p className="text-red-500 text-xs">
                {errors.transactionStatus.message}
              </p>
            )}
          </div>

          {/* Add more fields here if needed */}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
            >
              بستن
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
