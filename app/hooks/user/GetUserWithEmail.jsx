import { useEffect, useState } from "react";

const useGetUserWithEmail = (email) => {
  const [singleUser, setSingleUser] = useState(null);
  const [singleUserLoading, setSingleUserLoading] = useState(false);
  const [singleUserRefresh, setSingleUserRefresh] = useState(1);

  useEffect(() => {
    if (!email) {
      setSingleUser(null);
      return;
    }

    let mounted = true;

    const fetchUser = async () => {
      try {
        setSingleUserLoading(true);

        const res = await fetch(`/api/auth`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setSingleUser(data.data || null);
        } else {
          console.error("Failed to load user:", data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setSingleUserLoading(false);
      }
    };

    fetchUser();
    return () => {
      mounted = false;
    };
  }, [email, singleUserRefresh]);

  return {
    singleUser,
    setSingleUser,
    singleUserLoading,
    setSingleUserLoading,
    singleUserRefresh,
    setSingleUserRefresh,
  };
};

export default useGetUserWithEmail;
