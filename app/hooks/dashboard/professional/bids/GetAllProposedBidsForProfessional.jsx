"use client";
import { useEffect, useState } from "react";

const useGetAllProposedBidsForProfessional = (professionalId) => {
  const [proposedBids, setProposedBids] = useState([]);
  const [proposedBidsLoading, setProposedBidsLoading] = useState(false);
  const [proposedBidsError, setProposedBidsError] = useState(null);
  const [proposedBidsRefresh, setProposedBidsRefresh] = useState(1);

  useEffect(() => {
    if (!professionalId) return;

    setProposedBidsLoading(true);
    setProposedBidsError(null);

    fetch(
      `/api/dashboard/professional/proposeForBid/all?professionalId=${professionalId}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "success") {
          setProposedBids(data.data || []);
        } else {
          setProposedBidsError(data.message || "Failed to fetch proposed bids");
          setProposedBids([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching proposed bids:", error);
        setProposedBidsError(
          error.message || "An error occurred while fetching proposed bids"
        );
        setProposedBids([]);
      })
      .finally(() => {
        setProposedBidsLoading(false);
      });
  }, [proposedBidsRefresh, professionalId]);

  const refreshProposedBids = () => {
    setProposedBidsRefresh((prev) => prev + 1);
  };

  return {
    proposedBids,
    proposedBidsLoading,
    proposedBidsError,
    refreshProposedBids,
  };
};

export default useGetAllProposedBidsForProfessional;
