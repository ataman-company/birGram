"use client";
import TickIcon from "@public/icons/userPanel/tickIcon";

const FeaturesSection = () => {
  const siteName = JSON.parse(localStorage.getItem("sitename"));
  return (
    <div className="bg-blue-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
          خرید طلا از {siteName} چه مزایایی دارد؟
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950  text-center">
              دریافت فیزیکی طلا 18 عیار
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950 text-center">
              تضمین کیفیت طلا 18 عیار
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950 text-center">
              پشتیبانی آنلاین و تلفنی
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950 text-center">
              نرخ یکسان خرید و فروش
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950 text-center">
              نگهداری طلا در خزانه امن
            </h3>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex  items-center justify-center text-center">
            <div className="flex items-center justify-center mx-2">
              <TickIcon size={36} />
            </div>
            <h3 className="text-lg font-bold text-blue-950 text-center">
              کارمزدی شفاف در معاملات
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
