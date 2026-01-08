"use client";
import { useState, useEffect } from "react";

const useGetSingleJob = (jobId) => {
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);
  const [jobRefresh, setJobRefresh] = useState(1);

  useEffect(() => {
    if (!jobId) {
      setJob(null);
      return;
    }

    let mounted = true;

    const fetchJob = async () => {
      try {
        setJobLoading(true);

        const res = await fetch(`/api/jobs/single?jobId=${jobId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setJob(data.data || null);
        } else {
          console.error("Failed to load job:", data);
        }
      } catch (err) {
        // console.error(err);
      } finally {
        if (mounted) setJobLoading(false);
      }
    };

    fetchJob();
    return () => { mounted = false; };
  }, [jobId, jobRefresh]);

  return {
    job,
    setJob,
    jobLoading,
    setJobLoading,
    jobRefresh,
    setJobRefresh,
  };
};

export default useGetSingleJob;

