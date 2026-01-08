import { useState, useEffect, useCallback } from "react";

const useGetAllProposeForSingleBid = (bidId) => {
    const [allProposals, setAllProposals] = useState([]);
    const [bidProposeLoading, setBidProposeLoading] = useState(false);
    const [bidProposeRefresh, setBidProposeRefresh] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If no bidId, don't fetch
        if (!bidId) {
            setAllProposals([]);
            return;
        }

        // Create abort controller for cleanup
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchProposals = async () => {
            setBidProposeLoading(true);
            setError(null);
            
            try {
                const response = await fetch(
                    `/api/dashboard/professional/proposeForBid?bidId=${bidId}`,
                    { signal } // Pass abort signal
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status === "success") {
                    setAllProposals(data.data || []);
                } else {
                    setError(data.message || "Failed to load proposals");
                    setAllProposals([]);
                }
            } catch (error) {
                // Don't set error if request was aborted
                if (error.name !== 'AbortError') {
                    setError(error.message);
                    setAllProposals([]);
                }
            } finally {
                setBidProposeLoading(false);
            }
        };

        fetchProposals();

        // Cleanup function to abort fetch on unmount or bidId change
        return () => {
            abortController.abort();
        };
    }, [bidId, bidProposeRefresh]);

    // Optional: Manual refresh function
    const refreshProposals = useCallback(() => {
        setBidProposeRefresh(prev => prev + 1);
    }, []);

    return { 
        allProposals, 
        bidProposeLoading, 
        error, 
        refreshProposals 
        // Or return as array if you prefer:
        // [allProposals, bidProposeLoading, error, refreshProposals]
    };
};

export default useGetAllProposeForSingleBid;