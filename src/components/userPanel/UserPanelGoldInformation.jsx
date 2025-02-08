import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Image from "next/image";
import UserChart from "./UserChart";

function UserPanelGoldInformation({
  data,
  currentPrice,
  show,
  placement,
  contentWidth,
}) {
  const currentGold = currentPrice * 1000;
  const formatted = currentGold.toLocaleString();

  const dailyPrices = Array.isArray(data.daily)
    ? data.daily.map((item) => parseFloat(item.price))
    : [];
  const weeklyPrices = Array.isArray(data.weekly)
    ? data.weekly.map((item) => parseFloat(item.price))
    : [];
  const monthlyPrices = Array.isArray(data.monthly)
    ? data.monthly.map((item) => parseFloat(item.price))
    : [];

  const dailyMinPrice = dailyPrices.length ? Math.min(...dailyPrices) : 0;
  const dailyMaxPrice = dailyPrices.length ? Math.max(...dailyPrices) : 0;
  const dailyChange = (
    Math.abs((dailyMinPrice - dailyMaxPrice) / dailyMinPrice) * 100
  ).toFixed(2);

  const weeklyMinPrice = weeklyPrices.length ? Math.min(...weeklyPrices) : 0;
  const weeklyMaxPrice = weeklyPrices.length ? Math.max(...weeklyPrices) : 0;
  const weeklyChange = (
    Math.abs((weeklyMinPrice - weeklyMaxPrice) / weeklyMinPrice) * 100
  ).toFixed(2);

  const monthlyMinPrice = monthlyPrices.length ? Math.min(...monthlyPrices) : 0;
  const monthlyMaxPrice = monthlyPrices.length ? Math.max(...monthlyPrices) : 0;
  const monthlyChange = (
    Math.abs((monthlyMinPrice - monthlyMaxPrice) / monthlyMinPrice) * 100
  ).toFixed(2);

  return (
    <div className="relative h-[500px] ">
      <div
        className={`sm:p-4 p-1 h-[400px] bg-white rounded-lg sm:absolute ${contentWidth} w-full`}
      >
        <Tabs
          placement={placement}
          aria-label="Options"
          color="primary"
          className="my-2 w-full"
          classNames={{ tabList: "w-full", cursor: "bg-blue-900 rounded-xl" }}
        >
          <Tab key="24h" title="24 ساعت اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <div className="flex flex-row gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex">
                        <span className="text-green-500 lg:text-base text-xs">
                          {dailyChange}%
                        </span>
                        <Image
                          width={12}
                          height={12}
                          src={"/icons/userPanel/chevronUp.svg"}
                          alt="up"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <UserChart width="100%" goldData={data.daily} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="lastWeek" title="هفته اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <div className="flex flex-row gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex">
                        <span className="text-green-500 lg:text-base text-xs text-labelSmall">
                          {weeklyChange}%
                        </span>
                        <Image
                          width={12}
                          height={12}
                          src={"/icons/userPanel/chevronUp.svg"}
                          alt="up"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <UserChart width="100%" goldData={data.weekly} />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="lastMonth" title="ماه اخیر">
            <Card>
              <CardBody>
                <div className="flex">
                  <div className="flex flex-row gap-3 items-start w-28 pr-3">
                    <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                      {formatted}ریال
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex">
                        <span className="text-green-500 lg:text-base text-xs text-labelSmall">
                          {monthlyChange}%
                        </span>
                        <Image
                          width={12}
                          height={12}
                          src={"/icons/userPanel/chevronUp.svg"}
                          alt="up"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <UserChart width="100%" goldData={data.monthly} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default UserPanelGoldInformation;
