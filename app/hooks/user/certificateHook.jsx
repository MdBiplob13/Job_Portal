// app/hooks/user/certificateHook.js
"use client";
import { useState, useEffect } from "react";

const useGetUserCertificates = (userId) => {
  const [certificates, setCertificates] = useState([]);
  const [certLoading, setCertLoading] = useState(false);
  const [certRefresh, setCertRefresh] = useState(1);

  useEffect(() => {
    if (!userId) {
      setCertificates([]);
      return;
    }

    fetch(`/api/dashboard/profile/certificate?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCertificates(data.data);
        } else {
          console.error("Failed to load certificates:", data);
        }
      });
  }, [userId, certRefresh]);

  return {
    certificates,
    certLoading,
    certRefresh,
    setCertRefresh,
    setCertificates,
    setCertLoading,
  };
};

export default useGetUserCertificates;
