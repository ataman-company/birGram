import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCheckAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // If userData is null or confirm is not 1, redirect to the authenticate page
    if (!userData || userData.confirm == "0") {
      router.push("/authenticate"); // Redirect to authenticate page
    }
  }, [router]);
};

export default useCheckAuth;
