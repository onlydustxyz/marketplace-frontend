import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.replace(pathname + "?" + params.toString());
      return params.toString();
    },
    [searchParams]
  );
};
