"use client";
import { useEffect, useState } from "react";

const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersLoading, setAllUsersLoading] = useState(false);
  const [allUsersRefresh, setAllUsersRefresh] = useState(1);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setAllUsersLoading(true);

        const params = new URLSearchParams({
          search,
          status: statusFilter,
          page,
          limit: 10,
        });

        const res = await fetch(`/api/auth/getUsers?${params.toString()}`);
        const data = await res.json();

        if (data.status === "success") {
          setAllUsers(data.data);
          setTotalPages(data.totalPages);
        } else {
          setAllUsers([]);
        }
      } catch (err) {
        setAllUsers([]);
      } finally {
        setAllUsersLoading(false);
      }
    };

    fetchAllUsers();
  }, [allUsersRefresh, search, statusFilter, page]);

  return {
    allUsers,
    allUsersLoading,
    allUsersRefresh,
    setAllUsersRefresh,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    totalPages,
  };
};

export default useAllUsers;
