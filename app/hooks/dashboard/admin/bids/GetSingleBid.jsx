import { useEffect, useState } from "react";

const useGetSingleBid = (bidId) => {
  const [singleBid, setSingleBid] = useState(null);
  const [singleBidLoading, setSingleBidLoading] = useState(false);
  const [singleBidRefresh, setSingleBidRefresh] = useState(1);

  useEffect(() => {
    if (!bidId) {
      setSingleBid(null);
      return;
    }

    let mounted = true;

    const fetchBid = async () => {
      try {
        setSingleBidLoading(true);

        const res = await fetch(`/api/dashboard/employer/bid/get`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bidId }),
        });

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setSingleBid(data.data || null);
        } else {
          // console.error("Failed to load single bid:", data);
        }
      } catch (error) {
        // console.error(error);
      } finally {
        if (mounted) setSingleBidLoading(false);
      }
    };

    fetchBid();

    return () => {
      mounted = false;
    };
  }, [bidId, singleBidRefresh]);

  const refreshSingleBid = () => setSingleBidRefresh(singleBidRefresh + 1);

  return {
    singleBid,
    singleBidLoading,
    refreshSingleBid,
  };
};

export default useGetSingleBid;
