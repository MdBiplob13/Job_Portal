"use client";
import { useState, useEffect } from "react";

const useGetAllProposeForSingleJob = (jobId) => {
  const [allProposals, setAllProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    if (!jobId) return;
    let mounted = true;

    const fetchProposals = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/dashboard/professional/proposeForJob?jobId=${jobId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();

        if (!mounted) return;

        if (data.status === "success") {
          setAllProposals(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error("Failed to load proposals:", data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProposals();

    return () => {
      mounted = false;
    };
  }, [jobId, refresh]);

  return {
    allProposals,
    loading,
    refresh,
    setRefresh,
    setAllProposals,
    setLoading,
  };
};

export default useGetAllProposeForSingleJob;
