import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [userRefetching, setUserRefetching] = useState(false);

  const token = Cookies.get("bidpoleToken");

  useEffect(() => {
    // If no token → redirect to login
    if (!token) {
      setUserLoading(false);
      router.push("/pages/auth/login");
      return;
    }

    // Fetch user
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.status === "success") {
          setUser(data.user);
        } else {
          Cookies.remove("bidpoleToken");
          router.push("/pages/auth/login");
        }
      } catch (err) {
        Cookies.remove("bidpoleToken");
        router.push("/pages/auth/login");
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();

  }, [token, userRefetching, router]);

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
