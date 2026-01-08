'use client'
import { useEffect, useState, useCallback } from 'react'

const useGetSingleBidPropose = (proposeId) => {
  const [singleBidPropose, setSingleBidPropose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const fetchSingleBidPropose = useCallback(async () => {
    // Don't fetch if no proposeId
    if (!proposeId) {
      setSingleBidPropose(null);
      setLoading(false);
      setError("No proposal ID provided");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/dashboard/professional/proposeForBid?proposeId=${proposeId}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.status === "success") {
        setSingleBidPropose(data.data || null);
      } else {
        setError(data.message || "Failed to load proposal");
        setSingleBidPropose(null);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch proposal");
      setSingleBidPropose(null);
    } finally {
      setLoading(false);
    }
  }, [proposeId]);

  useEffect(() => {
    fetchSingleBidPropose();
  }, [fetchSingleBidPropose, refresh]);

  // Refresh function
  const refreshProposal = useCallback(() => {
    setRefresh(prev => prev + 1);
  }, []);

  return {
    singleBidPropose,
    loading,
    error,
    refreshProposal
  };
}

export default useGetSingleBidPropose;