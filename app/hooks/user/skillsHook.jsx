// app/hooks/user/skillsHook.js
"use client";
import { useState, useEffect } from "react";

const useGetUserSkills = (userId) => {
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [skillsRefresh, setSkillsRefresh] = useState(false);

  useEffect(() => {
    if (!userId) {
      setSkills([]);
      return;
    }

    let mounted = true;
    const fetchSkills = async () => {
      try {
        setSkillsLoading(true);
        const res = await fetch(`/api/dashboard/profile/skill?userId=${encodeURIComponent(userId)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!mounted) return;

        if (data.status === "success") {
          // data.data.skills is the array per server response
          setSkills(Array.isArray(data.data?.skills) ? data.data.skills : []);
        } 
      } catch (err) {
        // console.error(err);
      } finally {
        if (mounted) setSkillsLoading(false);
      }
    };

    fetchSkills();

    return () => {
      mounted = false;
    };
  }, [userId, skillsRefresh]);

  return {
    skills,
    setSkills,
    skillsLoading,
    setSkillsLoading,
    skillsRefresh,
    setSkillsRefresh,
  };
};

export default useGetUserSkills;
