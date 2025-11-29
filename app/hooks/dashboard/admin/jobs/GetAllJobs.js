"use client";
import useUser from "@/app/hooks/user/userHook";
import { useState, useEffect } from "react";

const useGetAllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [allJobsLoading, setAllJobsLoading] = useState(false);
  const [allJobsRefresh, setAllJobsRefresh] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        setAllJobsLoading(true);

        const res = await fetch(
          `/api/dashboard/admin/jobs`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setAllJobs(Array.isArray(data.data) ? data.data : []);
        } else {
          console.error("Failed to load jobs:", data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setAllJobsLoading(false);
      }
    };

    fetchJobs();
    return () => {
      mounted = false;
    };
  }, [allJobsRefresh]);

  return {
    allJobs,
    setAllJobs,
    allJobsLoading,
    setAllJobsLoading,
    allJobsRefresh,
    setAllJobsRefresh,
  };
};

export default useGetAllJobs;
