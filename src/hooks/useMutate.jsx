import { useState } from "react";
import api from "../services/api"; // Assuming you have an axios instance configured

const useMutation = (url, method = "post") => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (body, options = {}, urlAdd = "") => {
    try {
      setIsLoading(true);
      // const response = await api[method](url, body); // Method can be 'post', 'put', or 'delete'
      const response = await api({
        method,
        url: urlAdd ? `${url}/${urlAdd}` : url,
        data: body,
        headers: {
          ...api.defaults.headers, // Preserve default headers
          ...options.headers, // Override/add custom headers
        },
        ...options, // Include any other axios options like params, timeout, etc.
      });
      console.log(response, "resssss");
      setData(response?.data);
      return response?.data;
    } catch (err) {
      setIsError(true);
      setError(err.response?.data || "Error In Api");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, mutate, isError }; // Return the mutate function to call it on-demand
};

export default useMutation;
