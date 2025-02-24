"use client";

import useAuthRedirect from "@/app/hooks/useAuthRedirect";
import useRedirect from "@/app/hooks/useRedirect";
import Config from "@/components/config";
import axios from "axios";
import { ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import Header from "../Header/Header";
import TransactionLimitsModal from "../transfer/components/TransactionLimitsModal";
import Num2persian from "num2persian";
import useCheckAuth from "@/app/hooks/useCheckAuth";

const SellGoldForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Enables real-time validation
  });

  useAuthRedirect();
  useCheckAuth();

  const [serverData, setServerData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Track which field the user modified last.
  const [lastChanged, setLastChanged] = useState(null);
  const [priceInPersian, setPriceInPersian] = useState(""); // Store Persian price
  const [goldInPersian, setGoldInPersian] = useState("");

  const { redirectTo } = useRedirect();

  // -------------------------
  // Fetch user data and current price
  // -------------------------
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
        setServerData(res.data);
      } else {
        localStorage.removeItem("token");
        useAuthRedirect();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCurrentPrice = async () => {
    try {
      const res = await axios.get(`${Config.apiUrl}/lastprice`);
      if (res.data.code === 1) {
        setCurrentPrice(res.data.current_price);
      }
    } catch (error) {
      console.error("Error fetching current price:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(getCurrentPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // Watch fields and trigger calculation
  // -------------------------
  const watchedPrice = useWatch({ control, name: "price" });
  const watchedGold = useWatch({ control, name: "gold" });

  useEffect(() => {
    // If both fields are empty, do nothing.
    if (!watchedPrice && !watchedGold) return;

    // Debounce API call
    const delayDebounceFn = setTimeout(() => {
      calcTrade({ price: watchedPrice, gold: watchedGold });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedPrice, watchedGold]);

  // -------------------------
  // Call calc endpoint and update only the complementary field.
  // -------------------------
  const calcTrade = async ({ price, gold }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Guard: if the modified field is invalid, skip calling the API.
      if (lastChanged === "price") {
        const priceNum = Number(price);
        if (priceNum < Number(currentPrice)) return;
        if (
          serverData?.user?.gold &&
          priceNum > Number(currentPrice) * Number(serverData.user.gold)
        )
          return;
      } else if (lastChanged === "gold") {
        const goldNum = Number(gold);
        if (goldNum < 1) return;
        if (serverData?.user?.gold && goldNum > Number(serverData.user.gold))
          return;
      }

      // Create a FormData instance and append only the modified field plus type.
      const formData = new FormData();
      formData.append("type", "sell");

      if (lastChanged === "price") {
        formData.append("price", price);
      } else if (lastChanged === "gold") {
        formData.append("gold", gold);
      }

      const res = await axios.post(
        `${Config.apiUrl}/user/trade/calc`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Removing Content-Type lets Axios set the proper multipart boundary.
          },
        }
      );

      if (res.data.code === 1) {
        // When the user types in one field, update the complementary field.
        if (lastChanged === "price" && res.data.gold !== undefined) {
          if (getValues("gold") !== res.data.gold) {
            setValue("gold", res.data.gold, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        } else if (lastChanged === "gold" && res.data.price !== undefined) {
          if (getValues("price") !== res.data.price) {
            setValue("price", res.data.price, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        } else {
          // Fallback: update both fields if necessary.
          if (
            res.data.price !== undefined &&
            getValues("price") !== res.data.price
          ) {
            setValue("price", res.data.price, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
          if (
            res.data.gold !== undefined &&
            getValues("gold") !== res.data.gold
          ) {
            setValue("gold", res.data.gold, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }
        if (res.data.price) {
          setPriceInPersian(Num2persian(res.data.price.toString()));
          setGoldInPersian(
            Num2persian((res.data.price / currentPrice).toString())
          );
        }
        if (res.data.gold) {
          setGoldInPersian(Num2persian(res.data.gold.toString()));
          setPriceInPersian(
            Num2persian((res.data.gold * currentPrice).toString())
          );
        }
      }
    } catch (error) {
      console.error("Error calculating trade:", error);
    }
  };

  // -------------------------
  // Submit the Trade (Sell)
  // -------------------------
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Build FormData with type "buy" and only the field the user typed.
      const formData = new FormData();
      formData.append("type", "sell");

      if (lastChanged === "price") {
        formData.append("price", data.price);
      } else if (lastChanged === "gold") {
        formData.append("gold", data.gold);
      } else {
        console.error("No field was modified for submission");
        return;
      }

      const res = await axios.post(
        `${Config.apiUrl}/user/trade/sell`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Let Axios set the Content-Type automatically.
          },
        }
      );

      if (res.data.code === 1) {
        redirectTo("/userPanel/transactions");
        // Optionally, handle success (e.g., redirect or display a message)
      } else {
        console.error("Trade purchase error:", res.data.message);
      }
    } catch (error) {
      console.error("Error during trade purchase:", error);
    }
  };

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col px-2 bg-white relative">
      <Header currentPrice={currentPrice} />

      <div className="flex justify-between items-center mx-2 py-3 border-b border-gray-200">
        <Link href="/userPanel/wallet">
          <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-md font-bold">فروش میلی</h1>

        {/* 🔹 Info Icon to Open Modal */}
        <button onClick={() => setIsModalOpen(true)}>
          <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
        </button>
      </div>

      {/* 🔹 Modal Component */}
      {isModalOpen && (
        <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-2 mt-3 space-y-6 h-full grow"
      >
        <div className="flex flex-col grow py-2">
          <div className="my-2">
            <div>
              {/* Gold Input */}
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
                  min: {
                    value: 1,
                    message: "حداقل مقدار باید 1 میلی گرم باشد",
                  },
                  validate: (value) => {
                    if (
                      serverData?.user?.gold &&
                      Number(value) > Number(serverData.user.gold)
                    ) {
                      return `حداکثر مقدار مجاز ${serverData.user.gold} میلی گرم است`;
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
                      setLastChanged("gold");
                      setGoldInPersian(Num2persian(e.target.value));
                    }}
                    className="p-3 w-full border border-gray-300 rounded-lg"
                  />
                )}
              />
              {errors.gold && (
                <p className="text-sm text-red-500">{errors.gold.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{goldInPersian} گرم</p>
              {/* Price Input */}
              <label
                htmlFor="price"
                className="my-3 block text-sm font-medium text-gray-700"
              >
                مبلغ دریافتی به ریال
              </label>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                rules={{
                  required: "این فیلد الزامی است",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "مقدار باید عدد باشد",
                  },
                  validate: (value) => {
                    const priceNum = Number(value);
                    if (priceNum < Number(currentPrice)) {
                      return `مبلغ پرداختی باید حداقل ${currentPrice} ریال باشد.`;
                    }
                    if (
                      serverData?.user?.gold &&
                      priceNum >
                        Number(currentPrice) * Number(serverData.user.gold)
                    ) {
                      return `مبلغ پرداختی باید حداکثر ${
                        currentPrice * serverData.user.gold
                      } ریال باشد.`;
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id="price"
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);
                      setLastChanged("price");
                      setPriceInPersian(Num2persian(e.target.value));
                    }}
                    className="p-3 w-full border border-gray-300 rounded-lg"
                  />
                )}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                {priceInPersian} ریال
              </p>
            </div>
          </div>

          {/* Balance Section */}
          <div className="flex justify-between items-center my-4 p-4 border border-gray-200 rounded-xl bg-white">
            <div className="text-right">
              <p className="text-gray-500 text-xs mb-2">موجودی</p>
              <p className="text-blue-800 font-bold text-xs">
                {new Intl.NumberFormat("fa-IR").format(serverData?.user.gold)}{" "}
                میلی
              </p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center mt-0">
          <button
            type="submit"
            disabled={!isValid} // Button is disabled if form is invalid
            className={`w-full py-3 rounded-lg ${
              isValid ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-700"
            }`}
          >
            تایید و ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellGoldForm;
