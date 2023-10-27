import { UseRestfulDataProps } from "./useRestfulData";
import { useEffect, useState } from "react";

export function useRestfulMockData({ mock }: UseRestfulDataProps & { mock?: unknown }) {
  const [data, setData] = useState<unknown>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mock);
      setIsLoading(false);
    }, 100);
  }, []);

  return { data: data, isLoading: isLoading, isError: false };
}
