import { useState, useEffect } from "react";

interface FetchState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
  refetch: () => void;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<number>(0);

  const refetch = () => setTrigger((trigger) => trigger + 1);

  useEffect(() => {
    let cancelled: boolean = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong fetching data");
        }
        const result: T = await response.json();
        if (cancelled) return;
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      cancelled = true;
    };
  }, [trigger, url]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
