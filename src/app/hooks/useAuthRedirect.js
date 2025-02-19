"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Config from "@/components/config";
import useRedirect from "./useRedirect";

const useAuthRedirect = (apiUrl) => {
  const { redirectTo } = useRedirect();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    // 1. Check for token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // 2. Redirect if no token

      redirectTo("/login");
      return;
    }

    // 3. If token is found, call the /user/home endpoint
    axios
      .get(`${Config.apiUrl}/user/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const code = res.data.code;

        if (code === 1 || code === 321) {
          // Success case
          setData(res.data);
          setCurrentPrice(res.data.current_price);

          // Store the response data in localStorage
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          localStorage.setItem("Options", JSON.stringify(res.data.options));
        } else if (code === 555) {
          // Code 555: token expired or requires retokenization
          redirectTo(`/retoken?token=${token}`);
        } else if (code === 401) {
          // Invalid token, remove and redirect to login
          redirectTo("/login");
        } else {
          // Some other error
          alert(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Optionally handle unexpected errors here
      });
  }, [router, apiUrl]);

  return { data, currentPrice };
};

export default useAuthRedirect;
