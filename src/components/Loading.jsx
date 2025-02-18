// components/Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="m-2">در حال دریافت اطلاعات</div>
      <div className="w-5 h-5 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
