import { useImpersonationClaims } from "./use-impersonation-claims-Bis";
import { useShowToaster } from "../../../../src/hooks/useToaster";
import MeApi from "../../../../src/api/me";
import { getGithubUserIdFromSub } from "../utils/getGithubUserIdFromSub.util";
import { useIntl } from "../../../../src/hooks/useIntl";
import { useState } from "react";

export default function useImpersonation() {
  const { impersonationSet, clearImpersonationSet } = useImpersonationClaims();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const { data: userInfo, isLoading } = MeApi.queries.useGetMe({});
  const [impersonationFields, setImpersonationFields] = useState({
    isImpersonating: false,
    isImpersonationInvalid: false,
  });

  if (isLoading) {
    setImpersonationFields({
      ...impersonationFields,
      isImpersonating: true,
    });
  }

  if (
    !isLoading &&
    userInfo &&
    impersonationSet?.sub &&
    userInfo?.githubUserId !== getGithubUserIdFromSub(impersonationSet?.sub)
  ) {
    setImpersonationFields({
      ...impersonationFields,
      isImpersonating: false,
      isImpersonationInvalid: true,
    });
    showToaster(T("impersonation.form.errors.unknownUser", { userId: getGithubUserIdFromSub(impersonationSet?.sub) }), {
      isError: true,
    });
    clearImpersonationSet();
  }

  return {
    impersonating: impersonationFields.isImpersonating,
    invalidImpersonation: impersonationFields.isImpersonationInvalid,
    stopImpersonation: clearImpersonationSet,
  };
}
