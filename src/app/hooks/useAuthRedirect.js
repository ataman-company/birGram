"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Config from "@/components/config";

const useAuthRedirect = (apiUrl) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    // 1. Check for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // 2. Redirect if no token
      router.push("/login");
      return;
    }

    // 3. If token found, call the /user/home endpoint
    axios
      .get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // 4. Handle different response codes
        if (res.data.code === 1) {
          // success case
          setData(res.data);
          setCurrentPrice(res.data.current_price);

          // *** Store the response data in localStorage ***
          localStorage.setItem("userData", JSON.stringify(res.data.user));
        } else if (res.data.code === 401 || res.data.code === 555) {
          // invalid or expired token
          localStorage.removeItem("token");
          router.push("/login");
        } else {
          // some other error
          alert(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally handle unexpected errors
      });
  }, [router, apiUrl]);

  // Return any data/states you want to use in your component
  return { data, currentPrice };
};

export default useAuthRedirect;
