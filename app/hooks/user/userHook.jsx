import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userRefetching, setUserRefetching] = useState(false);

  const token = Cookies.get("bidpoleToken");

  if (!token) {
    setUserLoading(false);
    router.push("/pages/auth/login");
  }

  if (token && !user) {
    fetch("/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          Cookies.remove("bidpoleToken");
          router.push("/pages/auth/login");
        }
      });
  }

  return {
    user,
    setUser,
    userLoading,
    setUserLoading,
    userRefetching,
    setUserRefetching,
  };
};

export default useUser;
