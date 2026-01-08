import { useEffect, useState } from "react";

const useGetEmployerBids = (email) => {
  const [employerBids, setEmployerBids] = useState([]);
  const [employerBidsLoading, setEmployerBidsLoading] = useState(false);
  const [employerBidsRefresh, setEmployerBidsRefresh] = useState(1);

  useEffect(() => {
    if (!email) {
      setEmployerBids([]);
      return;
    }

    let mounted = true;

    const fetchEmployerBids = async () => {
      try {
        setEmployerBidsLoading(true);

        const res = await fetch(`/api/dashboard/employer/bid/get`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setEmployerBids(data.data || []);
        } else {
          // console.error("Failed to load employer bids:", data);
        }
      } catch (error) {
        // console.error(error);
      } finally {
        if (mounted) setEmployerBidsLoading(false);
      }
    };

    fetchEmployerBids();

    return () => {
      mounted = false;
    };
  }, [email, employerBidsRefresh]);

  return {
    employerBids,
    setEmployerBids,
    employerBidsLoading,
    setEmployerBidsLoading,
    employerBidsRefresh,
    setEmployerBidsRefresh,
  };
};

export default useGetEmployerBids;
