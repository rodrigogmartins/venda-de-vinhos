import useSWR from "swr";
import customersApi from "../services/customersApi";

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate } = useSWR<Data, Error>(url, async (url) => {
    const response = await customersApi.get(url);

    return response.data;
  });

  return { data, error, mutate };
}
