"use client";
import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import Loading from "@/components/Loading";
import ChevronLeftIcon from "@public/icons/userPanel/chevronLeft";
import ChevronRightIcon from "@public/icons/userPanel/chevronRight";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

export default function ReceiveGold() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm({ mode: "onChange" }); // Enable validation on form value change

  useAuthRedirect();

  const { redirectTo } = useRedirect();

  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [balanceError, setBalanceError] = useState(false);
  const [user, setUser] = useState(null);
  const [fee, setFee] = useState("");
  const [total, setTotal] = useState("");

  const watchedGold = useWatch({ control, name: "gold" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage when the component mounts
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Assuming the user data is stored as a JSON string
    }

    // Debounce API call
    const delayDebounceFn = setTimeout(() => {
      if (watchedGold) {
        calcTrade(watchedGold);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedGold]);

  const validateBalance = () => {
    if (user && watchedGold > user.gold) {
      setBalanceError(true);
    } else {
      setBalanceError(false);
    }
  };

  useEffect(() => {
    if (watchedGold) {
      validateBalance();
    }
  }, [watchedGold]);
  // -------------------------
  // Call calc endpoint and update only the complementary field.
  // -------------------------
  const calcTrade = async (gold) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Set loading to true before the request
      setIsLoading(true);

      // Guard: if the modified field is invalid, skip calling the API.
      const goldNum = Number(gold);
      if (goldNum < 1 || (user?.gold && goldNum > Number(user.gold))) return;

      // Create a FormData instance and append only the modified field plus type.
      const formData = new FormData();
      formData.append("gold", gold);

      const res = await axios.post(
        `${Config.apiUrl}/user/physical/calc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set loading to false after the request
      setIsLoading(false);

      if (res.data.code === 1) {
        // When the user types in one field, update the complementary field.
        if (
          res.data !== undefined &&
          getValues("gold") !== res.data.physicalgold
        ) {
          setValue("gold", res.data.physicalgold, {
            shouldValidate: true,
            shouldDirty: true,
          });
          setFee(res.data.fee);
          setTotal(res.data.total);
        }
      }
    } catch (error) {
      // Set loading to false if there was an error
      setIsLoading(false);
      console.error("Error calculating trade:", error);
    }
  };

  const onSubmit = async (data) => {
    // Log the real value entered by the user
    console.log("Gold entered by user:", watchedGold);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Set loading state to true while the request is being made
      setIsLoading(true);

      // Create FormData with the data from the form
      const formData = new FormData();
      formData.append("gold", data.gold); // Add the gold value from the form

      const res = await axios.post(
        `${Config.apiUrl}/user/physical/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Set loading state to false after the request is complete
      setIsLoading(false);

      // Check if the response code is 1 and redirect to ServicePage
      if (res.data.code === 1) {
        redirectTo("/userPanel/ServicePage"); // Redirect to the ServicePage
      } else {
        // Handle any other response codes (if needed)
        console.error("Error in response:", res.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting data:", error);
    }
  };
  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col p-2 bg-white relative">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-1 py-3 ">
        <Link href="/userPanel/ServicePage">
          <ChevronRightIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="flex justify-center grow text-md font-bold text-center">
          دریافت طلا
        </h1>
      </div>

      <div className="flex justify-between border-b border-gray-200 px-1 pb-3">
        <Link
          href="/userPanel/transactions?type=physical&status=&startdate=&enddate="
          className="flex justify-between w-full text-sm text-gray-500"
        >
          <p>مشاهده لیست درخواست‌ها</p>
          <ChevronLeftIcon className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
      </div>

      {/* Account Balance Section */}
      <div className="bg-gray-50 p-4 mt-4 rounded-xl">
        <p className="text-gray-500 text-sm">موجودی حساب میلی</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-blue-600 font-bold">{user?.gold} میلی</span>
        </div>
      </div>

      {/* Gold Input Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-2 mt-3 space-y-6 h-full grow"
      >
        <div className="flex flex-col grow py-2">
          {/* Gold Input */}
          <div className="flex flex-col">
            <label
              htmlFor="gold"
              className="my-3 block text-sm font-medium text-gray-700"
            >
              مقدار طلا به میلی گرم
            </label>
            <Controller
              name="gold"
              control={control}
              defaultValue=""
              rules={{
                required: "این فیلد الزامی است",
                validate: (value) => {
                  // Validate that the entered gold is less than the user's available gold
                  if (user?.gold && Number(value) > Number(user.gold)) {
                    return `حداکثر مقدار مجاز ${user.gold} میلی گرم است`;
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id="gold"
                  type="number"
                  step="0.01"
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="p-3 w-full border border-gray-300 rounded-lg"
                />
              )}
            />
            {errors.gold && (
              <p className="text-sm text-red-500">{errors.gold.message}</p>
            )}
            {isLoading && (
              <Loading /> // Show loading text or spinner
            )}
            {balanceError && (
              <p className="text-red-500 text-sm mt-1">
                موجودی میلی کافی نمی‌باشد
              </p>
            )}
          </div>
          {watchedGold && (
            <div className="space-y-4 mt-5">
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="text-sm text-gray-900">کارمزد ضرب طلا:</span>

                <span className="text-sm text-blue-900">{fee} میلی</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="text-sm text-gray-900">جمع کل</span>
                <span className="text-sm text-blue-900">{total} میلی</span>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || balanceError || isLoading} // Disable if the form is not valid, balance error exists, or loading
            className={`w-full p-3 rounded-xl transition ${
              !isValid || balanceError || isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            تایید و ادامه
          </button>
        </div>
      </form>

      {/* MODAL - Opens on Info Click */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
          <div className="bg-white w-full max-w-2xl rounded-t-xl p-5">
            <h2 className="text-md font-bold text-center">توضیحات</h2>
            <ul className="text-sm text-gray-700 mt-4 leading-relaxed space-y-2">
              <li>• طلای فیزیکی در قالب شمش‌های ۱۸ عیار تحویل داده می‌شود.</li>
              <li>
                • حداقل میزان قابل تحویل ۵۰۰ میلی‌ است و طلای فیزیکی مورد تقاضای
                شما باید مضرب صحیحی از ۵۰۰ گرم باشد.
              </li>
              <li>
                • در حال حاضر تحویل فیزیکی طلا فقط به‌صورت حضوری و در دفتر مرکزی
                میلی انجام می‌شود.
              </li>
              <li>
                • هنگام تحویل فیزیکی طلا، به‌همراه داشتن کارت ملی الزامی است.
              </li>
              <li>
                • امکان بازگرداندن طلای فیزیکی تحویل داده شده به میلی وجود دارد.
              </li>
            </ul>

            {/* Close Button */}
            <button
              className="w-full bg-blue-700 text-white mt-6 p-3 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
