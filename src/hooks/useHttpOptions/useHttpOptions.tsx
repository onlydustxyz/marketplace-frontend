import { useTokenSet } from "src/hooks/useTokenSet";

export function useHttpOptions(method: "GET" | "POST" | "PUT" | "DELETE"): {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers: {
    Authorization?: string;
  };
} {
  const { tokenSet } = useTokenSet();
  const token = tokenSet?.accessToken;

  const options = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  return options;
}
