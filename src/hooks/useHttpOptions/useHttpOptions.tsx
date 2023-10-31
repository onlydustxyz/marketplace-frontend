import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useTokenSet } from "src/hooks/useTokenSet";

export function useHttpOptions(method: "GET" | "POST" | "PUT" | "DELETE"): {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: {
    Authorization?: string;
  };
} {
  const { getImpersonationHeaders } = useImpersonationClaims();
  const impersonationHeaders = getImpersonationHeaders();
  // getImpersonationHeaders returns either an object with headers or an empty array
  const parsedImpersonationHeaders = Array.isArray(impersonationHeaders) ? {} : impersonationHeaders;

  const { tokenSet } = useTokenSet();
  const token = tokenSet?.accessToken;

  const options = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      accept: "application/json",
      ...parsedImpersonationHeaders,
    },
  };

  return options;
}
