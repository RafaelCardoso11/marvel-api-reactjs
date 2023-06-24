import apiClient from "@/services/apiClient";
import useSWR from "swr";

export const useDataFetcher = <Data> (url: string) => {
  const fetcher = async (url: string) => {
    const response = await apiClient.get(url);
    return response.data;
  };

  const results = useSWR<Data>(url, fetcher);

  const data = results.data as Data;
  return { ...results, data };
};
