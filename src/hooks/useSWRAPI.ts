import { BASE_URL, getFromSessionStorage } from "@/utils";
import useSWR, { SWRConfiguration } from "swr";

// Define the type for your data. Adjust this type based on the actual data structure.
type ApiResponse<T> = {
  data: T;
};

const useSWRAPI = <T>(url?: string | null, options?: SWRConfiguration) => {
  const fetcher = async (url: string, options?: any) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromSessionStorage("ACCESS_TOKEN")}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.message || "Failed to fetch");
    }

    const data: T = await res.json();
    return data;
  };

  const { data, error, mutate, isValidating } = useSWR(
    url
      ? `${BASE_URL}/${url}`?.includes("undefined")
        ? null
        : `${BASE_URL}/${url}`
      : null,
    fetcher,
    {
      ...options,
      errorRetryCount: options?.errorRetryCount || 1,
      revalidateOnFocus: options?.revalidateOnFocus || false,
    }
  );
  return {
    data,
    error,
    isValidating,
    mutate,
  };
};
export default useSWRAPI;
