import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import { GetTermsAndConditionsAcceptancesDocument, useAcceptTermsAndConditionsMutation } from "src/__generated/graphql";
import TermsAndConditionsMainCard from "./MainCard";
import TermsAndConditionsPromptCard from "./PromptCard";

export default function TermsAndConditions() {
  const { user } = useAuth();
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [acceptTermsAndConditionsMutation, { data }] = useAcceptTermsAndConditionsMutation({
    update: cache => {
      cache.writeQuery({
        query: GetTermsAndConditionsAcceptancesDocument,
        variables: { userId: user?.id },
        data: {
          termsAndConditionsAcceptancesByPk: {
            acceptanceDate: new Date(),
          },
        },
      });
    },
    onCompleted: () => {
      navigate(RoutePaths.Home);
    },
  });
  const navigate = useNavigate();

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} centeredContent={!showTermsAndConditions}>
      <div className="flex flex-col justify-center items-center text-greyscale-50">
        <div className="w-1/2">
          {!showTermsAndConditions ? (
            <TermsAndConditionsPromptCard {...{ setShowTermsAndConditions }} />
          ) : (
            <>
              {!data && (
                <TermsAndConditionsMainCard handleAcceptTermsAndConditions={acceptTermsAndConditionsMutation} />
              )}
            </>
          )}
        </div>
      </div>
    </Background>
  );
}
