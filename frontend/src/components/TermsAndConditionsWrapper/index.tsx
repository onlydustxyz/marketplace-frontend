import { PropsWithChildren } from "react";
import { useGetTermsAndConditionsAcceptancesQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";

const TERMS_AND_CONDITIONS_LAST_REDACTION_DATE = "2023-06-01";

export default function TermsAndConditionsAcceptanceDateProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const userId = user?.id;
  const { data, loading } = useGetTermsAndConditionsAcceptancesQuery({
    variables: { userId: user?.id },
    skip: !userId,
  });
  const location = useLocation();

  const termsAndConditionsValidationNeeded =
    location.pathname !== RoutePaths.TermsAndConditions &&
    user?.id &&
    !loading &&
    (!data?.termsAndConditionsAcceptancesByPk?.acceptanceDate ||
      new Date(data?.termsAndConditionsAcceptancesByPk?.acceptanceDate) <
        new Date(TERMS_AND_CONDITIONS_LAST_REDACTION_DATE));

  return termsAndConditionsValidationNeeded ? (
    <Navigate to={generatePath(RoutePaths.TermsAndConditions)} />
  ) : (
    <> {children}</>
  );
}
