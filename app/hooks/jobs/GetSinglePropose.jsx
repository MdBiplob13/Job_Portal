"use client";
import { useState, useEffect } from "react";

const useGetSinglePropose = (proposeId) => {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    if (!proposeId) return;
    let mounted = true;

    const fetchProposal = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/dashboard/professional/proposeForJob/single?proposeId=${proposeId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (!mounted) return;

        if (data.status === "success") {
          setProposal(data.data || null);
        } else {
          console.error("Failed to load proposal:", data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProposal();

    return () => {
      mounted = false;
    };
  }, [proposeId, refresh]);

  return {
    proposal,
    loading,
    refresh,
    setRefresh,
    setProposal,
    setLoading,
  };
};

export default useGetSinglePropose;
