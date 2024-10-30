import { useCallback, useEffect, useState } from "react";
import api from "../services/api"; // Assuming you have an axios instance configured in api.js

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get(url); // Make the API request using your service
      setData(response.data); // Access the data from the response
    } catch (err) {
      setIsError(true);
      setError(err); // Set error if the request fails
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData(); // Call fetchData if the URL is available
    }
  }, [url, fetchData]); // Re-run if the URL changes

  return { data, setData, error, isLoading, isError, refetch: fetchData }; // Return the data, error, and loading state
};

export default useFetch;
