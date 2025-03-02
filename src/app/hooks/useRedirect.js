"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useRedirect = () => {
  const router = useRouter();

  const redirectTo = (path, message = null, token = null) => {
    if (token) {
      localStorage.setItem("token", token);
    }

    if (message) {
      toast.success(message);
    }

    router.push(path);
  };

  const goBack = (message = null) => {
    if (message) {
      toast.info(message);
    }
    router.back();
  };

  return { redirectTo, goBack };
};

export default useRedirect;
