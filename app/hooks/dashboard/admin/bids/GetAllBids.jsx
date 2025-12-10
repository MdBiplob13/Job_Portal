import { useEffect, useState } from "react";

const useGetAllBids = () => {
  const [allBids, setAllBids] = useState([]);
  const [allBidsLoading, setAllBidsLoading] = useState(false);
  const [allBidsRefresh, setAllBidsRefresh] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchBids = async () => {
      try {
        setAllBidsLoading(true);

        const res = await fetch(`/api/dashboard/employer/bid`);
        const data = await res.json();

        if (!mounted) return;

        if (data.status === "success") {
          setAllBids(data.data || []);
        } else {
          console.error("Failed to load bids:", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setAllBidsLoading(false);
      }
    };

    fetchBids();
    return () => {
      mounted = false;
    };
  }, [allBidsRefresh]);

  return {
    allBids,
    setAllBids,
    allBidsLoading,
    setAllBidsLoading,
    allBidsRefresh,
    setAllBidsRefresh,
  };
};

export default useGetAllBids;
