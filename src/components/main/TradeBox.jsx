import React from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";

function TradeBox() {
  return (
    <div className="py-2 md:px-20 sm:px-10 lg:w-[98%] bg-white rounded-lg sm:absolute sm:-bottom-20 sm:shadow-lg sm:mt-0 mt-6">
      <Tabs
        aria-label="Options"
        size="lg"
        variant="underlined"
        classNames={{ tab: "text-lg" }}
      >
        <Tab
          key="buy"
          title="خرید"
          className="data-[selected=true]:text-green-400 [&>span]:data-[selected=true]:bg-green-400"
        >
          <Card className="shadow-none">
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  min={0}
                  variant="bordered"
                  label="مبلغ پرداختی به ریال"
                  type="number"
                />
                <Input
                  min={0}
                  variant="bordered"
                  label="مقدار طلا به بیرگرم گرم"
                  type="number"
                />
                <Button color="" className="text-white bg-green-700" size="lg">
                  خرید
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="sell"
          title="فروش"
          className="data-[selected=true]:text-red-400 [&>span]:data-[selected=true]:bg-red-400"
        >
          <Card className="shadow-none">
            <CardBody>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  min={0}
                  variant="bordered"
                  label="مقدار طلا به بیرگرم گرم"
                  type="number"
                />
                <Input
                  min={0}
                  variant="bordered"
                  label="مبلغ دریافتی به ریال"
                  type="number"
                />
                <Button color="" className="text-white bg-red-700" size="lg">
                  فروش
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TradeBox;
