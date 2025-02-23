export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-center">
      <h1 className="text-[8rem] font-extrabold text-blue-600 drop-shadow-lg animate-bounce">
        ۴۰۴
      </h1>
      <p className="mt-4 text-2xl text-gray-700">
        صفحه‌ای که به دنبال آن هستید یافت نشد!
      </p>
      <p className="mt-2 text-lg text-gray-500">
        ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white text-lg font-medium shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
      >
        بازگشت به صفحه اصلی
      </a>
      <div className="mt-12 flex items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
          alt="404 Illustration"
          className="w-52 opacity-80"
        />
      </div>
    </div>
  );
}
