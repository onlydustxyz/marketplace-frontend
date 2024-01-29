import { useEffect, useState } from "react";

import { UseRestfulDataProps } from "./useRestfulData";

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

  return { data, isLoading, isError: false };
}
