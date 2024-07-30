"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { bootstrap } from "core/bootstrap";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { Content } from "./components/content/content";

function Footer({ isDisabled, onClick }: { isDisabled: boolean; onClick: () => void }) {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.signup.onboarding.verificationInformation }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.next" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
        isDisabled={isDisabled}
        onClick={onClick}
      />
    </div>
  );
}

// * Big paragraph is not translated because of the complexity of the translation
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
        toast.default(<Translate token={"v2.pages.signup.onboarding.common.updateProfile.toast.success"} />);
        router.push(NEXT_ROUTER.signup.onboarding.root);
      },
      onError: () => {
        toast.error(<Translate token={"v2.pages.signup.onboarding.common.updateProfile.toast.error"} />);
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
    <SignupTemplate
      header={<AccountAlreadyExist />}
      footer={<Footer isDisabled={!isTermsAccepted} onClick={handleSubmit} />}
    >
      <Paper container="2" classNames={{ base: "flex flex-col gap-3 h-full" }}>
        <StepHeader
          step={2}
          stepPath={NEXT_ROUTER.signup.onboarding.root}
          subStep={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.title" }}
        />

        <Title
          title={{ token: "v2.pages.signup.onboarding.terms.title" }}
          content={{ token: "v2.pages.signup.onboarding.terms.content" }}
        />

        <Content />

        <Paper
          container="2"
          size="s"
          classNames={{
            base: "flex gap-3 items-center",
          }}
        >
          <Paper container="3" size="s">
            <Switch
              onChange={handleSwitchChange}
              isActive={isTermsAccepted}
              isDisabled={user?.hasAcceptedLatestTermsAndConditions}
            />
          </Paper>

          <div className="flex flex-col">
            <Typo size="l" weight="medium" translate={{ token: "v2.pages.signup.onboarding.terms.agree.title" }} />
            <Typo size="s" color="text-2">
              <Translate token="v2.pages.signup.onboarding.terms.agree.description.full" />{" "}
              <BaseLink
                href={bootstrap.getLegalHelperPort().getTermsAndConditionsUrl()}
                className="text-text-1 underline"
              >
                <Translate token="v2.pages.signup.onboarding.terms.agree.description.terms" />
              </BaseLink>{" "}
              <Translate token="v2.pages.signup.onboarding.terms.agree.description.and" />{" "}
              <BaseLink href={bootstrap.getLegalHelperPort().getPrivacyPolicyUrl()} className="text-text-1 underline">
                <Translate token="v2.pages.signup.onboarding.terms.agree.description.privacy" />
              </BaseLink>
            </Typo>
          </div>
        </Paper>
      </Paper>
    </SignupTemplate>
  );
}

export default TermsAndConditionsPage;
