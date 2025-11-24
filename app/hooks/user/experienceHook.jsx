// app/hooks/user/experienceHook.js
"use client";
import { useState, useEffect } from "react";

const useGetUserExperience = (userId) => {
  const [experiences, setExperiences] = useState([]);
  const [expLoading, setExpLoading] = useState(false);
  const [expRefresh, setExpRefresh] = useState(1);

  useEffect(() => {
    if (!userId) {
      setExperiences([]);
      return;
    }

    fetch(`/api/dashboard/profile/experience?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setExperiences(data.data);
        } else {
          console.error("Failed to load experiences:", data);
        }
      });
      
  }, [userId, expRefresh]);

  return {
    experiences,
    expLoading,
    expRefresh,
    setExpRefresh,
    setExperiences,
    setExpLoading,
  };
};

export default useGetUserExperience;
