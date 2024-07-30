"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { Layout } from "components/features/terms-and-conditions/layout/layout";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

function TermsAndConditionsPage() {
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const router = useRouter();

  const { data: user } = UserReactQueryAdapter.client.useGetMe({});

  function handleSwitchChange() {
    if (!user?.hasAcceptedLatestTermsAndConditions) {
      setIsTermsAccepted(!isTermsAccepted);
    }
  }

  const { mutateAsync: setMe } = UserReactQueryAdapter.client.useSetMe({
    options: {
      onSuccess: () => {
        toast.default(<Translate token="v2.pages.legalNotice.common.toast.success" />);
        router.push(NEXT_ROUTER.signup.onboarding.root);
      },
      onError: () => {
        toast.error(<Translate token="v2.pages.legalNotice.common.toast.error" />);
      },
    },
  });

  function handleSubmit() {
    if (!user?.hasAcceptedLatestTermsAndConditions) {
      setMe({ hasAcceptedTermsAndConditions: isTermsAccepted });
    }
  }

  useEffect(() => {
    if (user) {
      setIsTermsAccepted(user.hasAcceptedLatestTermsAndConditions);
    }
  }, [user]);

  return (
    <div className="h-full overflow-hidden">
      <div className="flex h-full items-center justify-center px-2 py-4 md:p-6">
        <Paper
          size="l"
          container="2"
          classNames={{
            base: "flex flex-col gap-6 w-[600px] h-full md:p-6 p-4",
          }}
        >
          <div className="flex flex-col gap-1">
            <Typo
              variant="brand"
              size="xl"
              translate={{
                token: "v2.pages.legalNotice.common.title",
              }}
            />

            <Typo
              size="s"
              color="text-2"
              translate={{
                token: "v2.pages.legalNotice.common.description",
              }}
            />
          </div>

          <Layout
            handleTerms={handleSwitchChange}
            isTermsAccepted={isTermsAccepted}
            hasAlreadyAccepted={user?.hasAcceptedLatestTermsAndConditions}
          />

          {!user?.hasAcceptedLatestTermsAndConditions ? (
            <div>
              <Button
                size="l"
                translate={{
                  token: "v2.pages.legalNotice.common.submit",
                }}
                endIcon={{
                  remixName: "ri-arrow-right-s-line",
                }}
                classNames={{
                  base: "ml-auto",
                }}
                onClick={handleSubmit}
                isDisabled={!isTermsAccepted}
              />
            </div>
          ) : null}
        </Paper>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;
