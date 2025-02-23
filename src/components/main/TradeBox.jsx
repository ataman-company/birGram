import useRedirect from "@/app/hooks/useRedirect";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function TradeBox() {
  const [activeTab, setActiveTab] = useState("buy");

  const { redirectTo } = useRedirect();
  // Ensure currentPrice is a number
  const currentPrice = parseFloat(
    JSON.parse(localStorage.getItem("current_price"))
  );

  // Buy form: include setValue from useForm
  const {
    register: registerBuy,
    handleSubmit: handleSubmitBuy,
    reset: resetBuy,
    setValue: setValueBuy,
  } = useForm();

  // Sell form: include setValue from useForm
  const {
    register: registerSell,
    handleSubmit: handleSubmitSell,
    reset: resetSell,
    setValue: setValueSell,
  } = useForm();

  const onSubmitBuy = (data) => {
    console.log("Buy data:", data);
    // TODO: Handle buy logic
    redirectTo("/userPanel/goldTrade");
  };

  const onSubmitSell = (data) => {
    console.log("Sell data:", data);
    // TODO: Handle sell logic
    redirectTo("/userPanel/sellGold");
  };

  return (
    <div className="py-2 md:px-20 sm:px-10 lg:w-[98%] bg-white rounded-lg sm:absolute sm:-bottom-20 sm:shadow-lg sm:mt-0 mt-6">
      {/* Tabs Header */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("buy")}
          className={`py-2 px-4 font-medium text-lg focus:outline-none ${
            activeTab === "buy"
              ? "border-b-2 border-green-400 text-green-400"
              : "text-gray-500"
          }`}
        >
          خرید
        </button>
        <button
          onClick={() => setActiveTab("sell")}
          className={`py-2 px-4 font-medium text-lg focus:outline-none ${
            activeTab === "sell"
              ? "border-b-2 border-red-400 text-red-400"
              : "text-gray-500"
          }`}
        >
          فروش
        </button>
      </div>

      {/* Buy Tab Content */}
      {activeTab === "buy" && (
        <form onSubmit={handleSubmitBuy(onSubmitBuy)}>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="مبلغ پرداختی به ریال"
                {...registerBuy("payment", {
                  onChange: (e) => {
                    const payment = parseFloat(e.target.value) || 0;
                    if (currentPrice) {
                      const computedGold = payment / currentPrice;
                      setValueBuy("gold", computedGold);
                    }
                  },
                })}
                className="block w-full py-2 px-4 text-lg rounded-md border border-gray-300 shadow-sm focus:border-green-400 focus:ring-green-400"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="مقدار طلا به  گرم"
                {...registerBuy("gold", {
                  onChange: (e) => {
                    const gold = parseFloat(e.target.value) || 0;
                    if (currentPrice) {
                      const computedPayment = gold * currentPrice;
                      setValueBuy("payment", computedPayment);
                    }
                  },
                })}
                className="block w-full py-2 px-4 text-lg rounded-md border border-gray-300 shadow-sm focus:border-green-400 focus:ring-green-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={onSubmitBuy}
                className="py-2 px-4 bg-green-700 text-white rounded-md text-lg"
              >
                خرید
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Sell Tab Content */}
      {activeTab === "sell" && (
        <form onSubmit={handleSubmitSell(onSubmitSell)}>
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="مقدار طلا به گرم"
                {...registerSell("gold", {
                  onChange: (e) => {
                    const gold = parseFloat(e.target.value) || 0;
                    if (currentPrice) {
                      const computedPayment = gold * currentPrice;
                      setValueSell("payment", computedPayment);
                    }
                  },
                })}
                className="block w-full py-2 px-4 text-lg rounded-md border border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                placeholder="مبلغ دریافتی به ریال"
                {...registerSell("payment", {
                  onChange: (e) => {
                    const payment = parseFloat(e.target.value) || 0;
                    if (currentPrice) {
                      const computedGold = payment / currentPrice;
                      setValueSell("gold", computedGold);
                    }
                  },
                })}
                className="block w-full py-2 px-4 text-lg rounded-md border border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={onSubmitSell}
                className="py-2 px-4 bg-red-700 text-white rounded-md text-lg"
              >
                فروش
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default TradeBox;
