// app/hooks/dashboard/admin/jobs/GetAllJobs.jsx
"use client";

import { useEffect, useState, useRef } from "react";

/**
 * useGetAllJobs
 *
 * - Fetches jobs from /api/dashboard/admin/jobs using query params
 * - Accepts `filters` and handles pagination (page & pageSize)
 * - Returns: jobs, loading, error, pagination helpers, refresh
 *
 * Backend expectations (recommended):
 * - Responds with { status: "success", data: [jobs], meta: { totalCount, page, pageSize, totalPages } }
 * - If backend returns different shape, the hook tries to be resilient.
 */

const buildQuery = (filters, page, pageSize) => {
  const params = new URLSearchParams();

  // pagination
  if (page) params.set("page", page);
  if (pageSize) params.set("limit", pageSize);

  // primitive filters
  if (filters.searchQuery) params.set("q", filters.searchQuery);
  if (filters.skill) params.set("skill", filters.skill);
  if (filters.region && filters.region !== "All") params.set("region", filters.region);
  if (filters.language && filters.language !== "Any") params.set("language", filters.language);
  if (filters.salaryType && filters.salaryType !== "any") params.set("salaryType", filters.salaryType);
  if (filters.minSalary) params.set("minSalary", filters.minSalary);
  if (filters.maxSalary) params.set("maxSalary", filters.maxSalary);
  if (filters.workDay && filters.workDay !== "Any") params.set("workDay", filters.workDay);
  if (filters.postTime && filters.postTime !== "Any") params.set("postTime", filters.postTime);
  if (filters.searchType) params.set("searchType", filters.searchType);

  // job types (set -> comma separated)
  if (filters.jobTypes && filters.jobTypes.size > 0) {
    const arr = Array.from(filters.jobTypes);
    params.set("jobTypes", arr.join(","));
  }

  return params.toString();
};

const useGetAllJobs = (filters = {}, initialPage = 1, initialPageSize = 5) => {
  const [allJobs, setAllJobs] = useState([]);
  const [allJobsLoading, setAllJobsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [refresh, setRefresh] = useState(0);
  const lastFiltersRef = useRef(filters);

  // whenever filters change externally, reset to page 1
  useEffect(() => {
    // shallow compare simple fields - if any difference, reset page
    const prev = JSON.stringify(lastFiltersRef.current || {});
    const next = JSON.stringify(filters || {});
    if (prev !== next) {
      setPage(1);
      lastFiltersRef.current = filters;
    }
  }, [filters]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setAllJobsLoading(true);
        setError(null);

        const query = buildQuery(filters, page, pageSize);
        const url = `/api/dashboard/admin/jobs${query ? `?${query}` : ""}`;

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        });

        if (!mounted) return;
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Failed to fetch jobs: ${res.status} ${txt}`);
        }

        const json = await res.json();

        // support multiple backend shapes:
        // - { status: 'success', data: [...], meta: {...} }
        // - { status: 'success', jobs: [...], totalCount: n }
        const jobs = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.jobs)
          ? json.jobs
          : Array.isArray(json)
          ? json
          : [];

        let meta = (json && json.meta) || {};

        // fallback meta if backend provides totals directly
        if (!meta.totalCount) {
          meta.totalCount = json.totalCount ?? json.count ?? jobs.length;
        }
        if (!meta.page) meta.page = json.page ?? page;
        if (!meta.pageSize) meta.pageSize = json.pageSize ?? pageSize;
        if (!meta.totalPages && meta.pageSize) {
          meta.totalPages = Math.max(1, Math.ceil((meta.totalCount || 0) / meta.pageSize));
        } else if (!meta.totalPages) {
          meta.totalPages = 1;
        }

        if (!mounted) return;

        setAllJobs(jobs);
        setTotalCount(Number(meta.totalCount || 0));
        setTotalPages(Number(meta.totalPages || 1));
        setPage(Number(meta.page || page));
        setPageSize(Number(meta.pageSize || pageSize));
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        if (mounted) {
          setError(err.message || "Failed to load jobs");
        }
      } finally {
        if (mounted) setAllJobsLoading(false);
      }
    };

    fetchJobs();

    return () => {
      mounted = false;
      controller.abort();
    };
    // watch filters objects by stringifying them, plus page, pageSize, refresh
  }, [JSON.stringify(filters), page, pageSize, refresh]);

  return {
    allJobs,
    setAllJobs,
    allJobsLoading,
    setAllJobsLoading,
    allJobsRefresh: refresh,
    setAllJobsRefresh: setRefresh,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalCount,
    error,
  };
};

export default useGetAllJobs;
