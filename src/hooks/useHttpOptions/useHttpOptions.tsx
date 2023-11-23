import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useTokenSet } from "src/hooks/useTokenSet";
import { validateImpersonationHeader } from "src/utils/validateImpersonationHeader";

type useHttpOptionsReturn = {
  options: {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers: {
      Authorization?: string;
      "Content-Type": string;
      accept: string;
    } & ReturnType<ReturnType<typeof useImpersonationClaims>["getImpersonationHeaders"]>;
  };
  isImpersonating: boolean;
  isValidImpersonation: boolean;
};

export function useHttpOptions(method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"): useHttpOptionsReturn {
  const { getImpersonationHeaders } = useImpersonationClaims();
  const impersonationHeaders = getImpersonationHeaders();

  const { tokenSet } = useTokenSet();
  const token = tokenSet?.accessToken;

  const options = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      accept: "application/json",
      ...impersonationHeaders,
    },
  };

  const isImpersonating = Boolean(options.headers["X-Impersonation-Claims"]);
  const isValidImpersonation = validateImpersonationHeader(options.headers["X-Impersonation-Claims"] ?? "");

  return { options, isImpersonating, isValidImpersonation };
}
