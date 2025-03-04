import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import ChevronDownIcon from "@public/icons/userPanel/chevronDown";
import ChevronUpIcon from "@public/icons/userPanel/chevronUp";
import UserChart from "./UserChart";

function UserPanelGoldInformation({
  data,
  currentPrice,
  placement,
  contentWidth,
}) {
  const formatNumber = (number) =>
    new Intl.NumberFormat("fa-IR").format(Number(number));
  const currentGold = currentPrice * 1000;
  const formatted = currentGold.toLocaleString();

  const calculateStats = (prices) => {
    if (!prices.length) return { min: 0, max: 0 };
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  };

  const getChangeColor = (change) =>
    parseFloat(change) < 0 ? "text-red-500" : "text-green-500";

  const getIconColor = (change) => (parseFloat(change) < 0 ? "red" : "green");

  const dailyPrices = data.daily?.map((item) => parseFloat(item.price)) || [];
  const weeklyPrices = data.weekly?.map((item) => parseFloat(item.price)) || [];
  const monthlyPrices =
    data.monthly?.map((item) => parseFloat(item.price)) || [];

  const dailyStats = calculateStats(dailyPrices);
  const weeklyStats = calculateStats(weeklyPrices);
  const monthlyStats = calculateStats(monthlyPrices);

  const dailyChange = (
    dailyStats.min
      ? ((dailyStats.max - dailyStats.min) / dailyStats.min) * 100
      : 0
  ).toFixed(2);

  const weeklyChange = (
    weeklyStats.min
      ? ((weeklyStats.max - weeklyStats.min) / weeklyStats.min) * 100
      : 0
  ).toFixed(2);

  const monthlyChange = (
    monthlyStats.min
      ? ((monthlyStats.max - monthlyStats.min) / monthlyStats.min) * 100
      : 0
  ).toFixed(2);

  return (
    <div className="relative h-[500px]">
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
          {/* 24-Hour Tab */}
          <Tab key="24h" title="24 ساعت اخیر">
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 text-sm px-3">
                  <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                    {formatted}ریال
                  </p>
                  <span
                    className={`lg:text-base text-xs ${getChangeColor(
                      dailyChange
                    )}`}
                  >
                    {Math.abs(dailyChange)}%
                  </span>
                  {dailyChange < 0 ? (
                    <ChevronDownIcon
                      color={getIconColor(dailyChange)}
                      size={12}
                    />
                  ) : (
                    <ChevronUpIcon
                      color={getIconColor(dailyChange)}
                      size={12}
                    />
                  )}
                </div>
                {/* Max & Min Values */}
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-3">
                  <span>🔺 بیشترین: {formatNumber(dailyStats.max)} ریال</span>
                  <span>🔻 کمترین: {formatNumber(dailyStats.min)} ریال</span>
                </div>

                {/* Change Percentage */}

                <UserChart width="100%" goldData={data.daily} />
              </CardBody>
            </Card>
          </Tab>

          {/* Weekly Tab */}
          <Tab key="lastWeek" title="هفته اخیر">
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 text-sm px-3">
                  <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                    {formatted}ریال
                  </p>
                  <span
                    className={`lg:text-base text-xs ${getChangeColor(
                      weeklyChange
                    )}`}
                  >
                    {Math.abs(weeklyChange)}%
                  </span>
                  {weeklyChange < 0 ? (
                    <ChevronDownIcon
                      color={getIconColor(weeklyChange)}
                      size={12}
                    />
                  ) : (
                    <ChevronUpIcon
                      color={getIconColor(weeklyChange)}
                      size={12}
                    />
                  )}
                </div>
                {/* Max & Min Values */}
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-3">
                  <span>🔺 بیشترین: {formatNumber(weeklyStats.max)} ریال</span>
                  <span>🔻 کمترین: {formatNumber(weeklyStats.min)} ریال</span>
                </div>

                {/* Change Percentage */}

                <UserChart width="100%" goldData={data.weekly} />
              </CardBody>
            </Card>
          </Tab>

          {/* Monthly Tab */}
          <Tab key="lastMonth" title="ماه اخیر">
            <Card>
              <CardBody>
                <div className="flex items-center gap-2 text-sm px-3">
                  <p className="lg:text-xl md:text-base text-indigo-900 font-semibold">
                    {formatted}ریال
                  </p>
                  <span
                    className={`lg:text-base text-xs ${getChangeColor(
                      monthlyChange
                    )}`}
                  >
                    {Math.abs(monthlyChange)}%
                  </span>
                  {monthlyChange < 0 ? (
                    <ChevronDownIcon
                      color={getIconColor(monthlyChange)}
                      size={12}
                    />
                  ) : (
                    <ChevronUpIcon
                      color={getIconColor(monthlyChange)}
                      size={12}
                    />
                  )}
                </div>
                {/* Max & Min Values */}
                <div className="flex justify-between text-xs text-gray-600 mt-2 px-3">
                  <span>🔺 بیشترین: {formatNumber(monthlyStats.max)} ریال</span>
                  <span>🔻 کمترین: {formatNumber(monthlyStats.min)} ریال</span>
                </div>

                {/* Change Percentage */}

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
