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

const GoldPurchaseForm = () => {
  const [isClient, setIsClient] = useState(false);
  const [serverData, setServerData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastChanged, setLastChanged] = useState(null);
  const [priceInPersian, setPriceInPersian] = useState("");
  const [goldInPersian, setGoldInPersian] = useState("");
  const [siteName, setSiteName] = useState("");
  const [token, setToken] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  useAuthRedirect();
  useCheckAuth();
  const { redirectTo } = useRedirect();
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      setToken(window.localStorage.getItem("token"));
      setSiteName(window.localStorage.getItem("siteName"));
    }
  }, []);

  const fetchData = async () => {
    try {
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
        window.localStorage.removeItem("token");
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
    if (isClient) {
      fetchData();
      const interval = setInterval(getCurrentPrice, 5000);
      return () => clearInterval(interval);
    }
  }, [isClient, token]);

  const watchedPrice = useWatch({ control, name: "price" });
  const watchedGold = useWatch({ control, name: "gold" });

  useEffect(() => {
    if (!isClient || (!watchedPrice && !watchedGold)) return;

    const delayDebounceFn = setTimeout(() => {
      calcTrade({ price: watchedPrice, gold: watchedGold });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watchedPrice, watchedGold, isClient]);

  const calcTrade = async ({ price, gold }) => {
    try {
      if (!token) return;

      if (lastChanged === "price") {
        if (Number(price) < Number(currentPrice)) {
          setError("price", {
            type: "min",
            message: `مبلغ پرداختی باید حداقل ${currentPrice} ریال باشد.`,
          });
          return;
        } else {
          clearErrors("price");
        }
      }

      const formData = new FormData();
      formData.append("type", "buy");

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
          },
        }
      );

      if (res.data.code === 1) {
        if (lastChanged === "price" && res.data.gold !== undefined) {
          setValue("gold", res.data.gold, {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else if (lastChanged === "gold" && res.data.price !== undefined) {
          setValue("price", res.data.price, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }

        if (res.data.price) {
          setPriceInPersian(Num2persian(res.data.price.toString()));
        }
        if (res.data.gold) {
          setGoldInPersian(Num2persian(res.data.gold.toString()));
        }
      }
    } catch (error) {
      console.error("Error calculating trade:", error);
    }
  };

  const valueForSubmission =
    lastChanged === "price"
      ? watchedPrice
      : lastChanged === "gold"
      ? watchedGold
      : "";
  const fieldError =
    lastChanged === "price"
      ? errors.price
      : lastChanged === "gold"
      ? errors.gold
      : undefined;
  const isSubmitDisabled = !lastChanged || !valueForSubmission || !!fieldError;

  const onSubmit = async (data) => {
    try {
      if (!token) return;

      const formData = new FormData();
      formData.append("type", "buy");

      if (lastChanged === "price") {
        formData.append("price", data.price);
      } else if (lastChanged === "gold") {
        formData.append("gold", data.gold);
      }

      const res = await axios.post(
        `${Config.apiUrl}/user/trade/buy`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.code === 1) {
        redirectTo("/userPanel/transactions");
      }
    } catch (error) {
      console.error("Error during trade purchase:", error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="h-[90vh] max-w-2xl mx-auto flex flex-col px-2 bg-white relative">
      <Header currentPrice={currentPrice} />

      <div className="flex justify-between items-center mx-2 py-3 border-b border-gray-200">
        <Link href="/userPanel/wallet">
          <ChevronRight className="w-5 h-5 text-gray-700 cursor-pointer" />
        </Link>
        <h1 className="text-md font-bold">خرید {siteName}</h1>

        <button onClick={() => setIsModalOpen(true)}>
          <Info className="w-5 h-5 text-gray-700 cursor-pointer" />
        </button>
      </div>

      {isModalOpen && (
        <TransactionLimitsModal onClose={() => setIsModalOpen(false)} />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-2 mt-3 space-y-6 h-full pb-12 grow"
      >
        <div className="flex flex-col grow py-2">
          <div className="my-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              مبلغ پرداختی به ریال
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
              }}
              render={({ field }) => (
                <div>
                  <input
                    {...field}
                    id="price"
                    type="number"
                    onChange={(e) => {
                      field.onChange(e);
                      setLastChanged("price");
                      setPriceInPersian(Num2persian(e.target.value));
                    }}
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {priceInPersian} ریال
                  </p>
                </div>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="gold"
              className="block text-sm font-medium text-gray-700"
            >
              مقدار طلا به گرم
            </label>
            <Controller
              name="gold"
              control={control}
              defaultValue=""
              rules={{
                required: "این فیلد الزامی است",
                min: {
                  value: 0.1,
                  message: "حداقل مقدار باید 0.1 گرم باشد",
                },
              }}
              render={({ field }) => (
                <div>
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
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  />
                  {errors.gold && (
                    <p className="text-sm text-red-500">
                      {errors.gold.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {goldInPersian} گرم
                  </p>
                </div>
              )}
            />
          </div>

          {serverData && (
            <div className="flex justify-between items-center my-4 p-4 border border-gray-200 rounded-xl bg-white">
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-2">موجودی</p>
                <p className="text-blue-800 font-bold text-xs">
                  {new Intl.NumberFormat("fa-IR").format(
                    serverData?.user.wallet
                  )}{" "}
                  ریال
                </p>
              </div>
              <button
                type="button"
                onClick={() => redirectTo("/userPanel/walletDeposit")}
                className="text-blue-600 flex items-center justify-center space-x-1"
              >
                <span className="text-lg ml-1">+</span>
                <span className="text-xs font-medium">شارژ کیف پول</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-0">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
          >
            تایید و ادامه
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoldPurchaseForm;
