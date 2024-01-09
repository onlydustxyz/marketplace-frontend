import { useImpersonation } from "./use-impersonation.tsx";
import MeApi from "../../../src/api/me";

export default function useIsValidImpersonation() {
  const { isImpersonating, getImpersonateClaim } = useImpersonation();
  const { data: userInfo } = MeApi.queries.useGetMe({});

  console.log("getImpersonateClaim", getImpersonateClaim);

  const isValidImpersonation =
    isImpersonating && userInfo?.githubUserId === Number(getImpersonateClaim.sub.split("|")[1]);

  return { isValidImpersonation };
}
