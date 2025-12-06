"use client";
import { useEffect, useState } from "react";

const useGetProfessionalAllJobPropose = (professionalId) => {
  const [professionalProposes, setProfessionalProposes] = useState([]);
  const [professionalProposesLoading, setProfessionalProposesLoading] =
    useState(false);
  const [professionalProposesRefresh, setProfessionalProposesRefresh] =
    useState(1);

  useEffect(() => {
    if (!professionalId) return;
    setProfessionalProposesLoading(true);

    fetch(
      `/api/dashboard/professional/proposeForJob/single?professionalId=${professionalId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProfessionalProposes(data.data);
        } else {
          setProfessionalProposes([]);
        }
      })
      .finally(() => {
        setProfessionalProposesLoading(false);
      });
  }, [professionalProposesRefresh, professionalId]);

  const refreshProfessionalProposes = () => {
    setProfessionalProposesRefresh((prev) => prev + 1);
  };

  return {
    professionalProposes,
    professionalProposesLoading,
    refreshProfessionalProposes,
  };
};

export default useGetProfessionalAllJobPropose;
