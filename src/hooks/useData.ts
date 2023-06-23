import apiClient from "@/services/apiClient";
import useSWR from "swr";


export const useData = (url: string) => {
  
    const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
  };

  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};
