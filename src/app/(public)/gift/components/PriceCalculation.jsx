import CrossIcon from "@public/icons/userPanel/cross";
import MenuIcon from "@public/icons/userPanel/menuIcon";
import PlusIcon from "@public/icons/userPanel/plus";

export default function CardPrice() {
  if (typeof window === "undefined") {
    return null;
  }
  const siteName = JSON.parse(localStorage.getItem("sitename"));
  return (
    <div className="bg-blue-50 p-6 sm:p-8 rounded-lg max-w-4xl mx-auto text-center">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        قیمت گذاری و نحوه خرید کارت هدیه
        <span className="text-yellow-500"> {siteName}</span> چطور است؟
      </h2>
      <p className="text-gray-600 text-xs sm:text-sm mt-1">
        (قیمت هر گرم طلای آب شده با عیار ۱۸ در بازار ۲,۶۰۰,۰۰۰ تومان است)
      </p>

      {/* Pricing Formula */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center">
        {/* هزینه چاپ و بسته‌بندی */}
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-center font-semibold">
            هزینه چاپ و بسته‌بندی
          </span>
        </div>
        <PlusIcon className="sm:block" color="#FFBE00" />

        {/* Main Row with Flex */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
          {/* Left Box */}
          <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center w-full sm:w-auto">
            <span className="text-xs sm:text-sm font-semibold">
              ((نیم درصد کارمزد) ۰۵ ۱٫۰ * (قیمت لحظه ای میلی در سامانه طلای
              میلی))
            </span>
          </div>

          {/* Cross Icon */}
          <CrossIcon className="hidden sm:block" />

          {/* Right Box */}
          <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-center font-semibold">
              تعداد و میزان میلی کارت هدیه
            </span>
          </div>
        </div>
      </div>

      {/* Example Calculation */}
      <p className="mt-6 text-gray-700 text-sm sm:text-base font-semibold">
        به عنوان مثال برای یک کارت ۲۰۰۰ میلی گرمی، قیمت کارت طبق فرمول بالا به
        صورت زیر می‌شود:
      </p>

      {/* <div className="sm:flex sm:flex-row gap-4 mt-6 sm:justify-center justify-around  items-center">
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            ۶/۱۶۸/۲۰۰ تومان
          </span>
        </div>
        <div className="flex justify-center items-center m-2">
          <MenuIcon className="sm:block" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            ۵۰/۰۰۰
          </span>
        </div>

        <div className="flex justify-center items-center m-2">
          <PlusIcon className="sm:block" color="#FFBE00" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm font-semibold">
            (۱/۰۰۵) * (۲/۸۲۰)
          </span>
        </div>
        <div className="flex justify-center items-center m-2">
          <CrossIcon className="hidden sm:block" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            2000
          </span>
        </div>
      </div> */}

      <div className="sm:flex sm:flex-row-reverse gap-4 mt-6 sm:justify-center justify-around items-center">
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            2000
          </span>
        </div>
        <div className="flex justify-center items-center m-2">
          <CrossIcon className="hidden sm:block" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm font-semibold">
            (۱/۰۰۵) * (۲/۸۲۰)
          </span>
        </div>
        <div className="flex justify-center items-center m-2">
          <PlusIcon className="sm:block" color="#FFBE00" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            ۵۰/۰۰۰
          </span>
        </div>
        <div className="flex justify-center items-center m-2">
          <MenuIcon className="sm:block" />
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xs sm:text-sm text-center font-semibold">
            ۶/۱۶۸/۲۰۰ تومان
          </span>
        </div>
      </div>

      <div className="bg-[#EEF3FF] p-4 rounded-2xl flex flex-col sm:flex-row items-center mt-6">
        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="blue"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14.25a1 1 0 0 1-2 0v-4.5a1 1 0 0 1 2 0Zm-1-6a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 12 10.25Z" />
          </svg>
        </div>
        <span className="text-blue-700 text-xs sm:text-sm font-semibold flex-1 text-right">
          فرآیند آماده‌سازی کارت هدیه بین ۲ تا ۶ روز کاری زمان می‌برد و پس از آن
          توسط پیک (در تهران) و پست پیشتاز (در شهرستان‌ها) و یا با حضور در دفاتر
          میلی تحویل می‌شود.
        </span>
      </div>
    </div>
  );
}
