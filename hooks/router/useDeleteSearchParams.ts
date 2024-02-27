import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useDeleteSearchParams = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  return useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.replace(pathname + "?" + params.toString());
      return params.toString();
    },
    [searchParams]
  );
};
