"use client";
import useUser from "@/app/hooks/user/userHook";
import { useState, useEffect } from "react";

const useGetEmployerAllJobs = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsRefresh, setJobsRefresh] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        setJobsLoading(true);

        const res = await fetch(
          `/api/dashboard/employer/job/get?employerEmail=${user?.email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          setJobs(Array.isArray(data.data) ? data.data : []);
        } else {
          // console.error("Failed to load jobs:", data);
        }
      } catch (err) {
        // console.error(err);
      } finally {
        if (mounted) setJobsLoading(false);
      }
    };

    fetchJobs();
    return () => {
      mounted = false;
    };
  }, [jobsRefresh, user?.email]);

  return {
    jobs,
    setJobs,
    jobsLoading,
    setJobsLoading,
    jobsRefresh,
    setJobsRefresh,
  };
};

export default useGetEmployerAllJobs;
