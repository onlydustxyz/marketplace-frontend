"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { bootstrap } from "core/bootstrap";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { toast } from "components/atoms/toaster";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

function Footer({ isDisabled, onClick }: { isDisabled: boolean; onClick: () => void }) {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.signup.onboarding.root }}
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

// Big paragraph is not translated
function TermsAndConditionsPage() {
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const router = useRouter();

  const termsUrls = bootstrap.getLegalHelperPort().urls;

  function handleSwitchChange() {
    setIsTermsAccepted(!isTermsAccepted);
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
    setMe({ hasAcceptedTermsAndConditions: isTermsAccepted });
  }

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

        <div className="mt-3 overflow-hidden">
          <Paper container="3" size="s" classNames={{ base: "h-full" }}>
            <ScrollView>
              <div className="flex h-full flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Typo
                    size="xl"
                    weight="medium"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.onlydust.title",
                    }}
                  />
                  <Typo
                    size="s"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.onlydust.description",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Typo
                    size="xl"
                    weight="medium"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.access.title",
                    }}
                  />
                  <Typo
                    size="s"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.access.description",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Typo
                    size="xl"
                    weight="medium"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.responsability.title",
                    }}
                  />

                  <div className="flex flex-col gap-2">
                    <Typo size="s" color="text-2">
                      You can use the platform as a project leader or as a contributor.
                    </Typo>

                    <Typo size="s" color="text-2">
                      <span className="underline">If you are a contributor</span>, you will provide contributions from
                      among those proposed on the platform by the projects. You undertake to execute these contributions
                      with the highest level of diligence, in accordance with the specifications set out by the project.
                      Rewards for this contribution will not be systematic and will depend in part on how well the
                      contribution is executed. This evaluation will be carried out by the project leader and, except in
                      cases of fraud, Only Dust will not be directly involved.
                    </Typo>

                    <Typo size="s" color="text-2">
                      <span className="underline">If you are a Project Leader</span>, the project must be open-source
                      and useful for the community. You will be responsible for the project, and as such, you will have
                      to define the nature of the contributions required, assess their quality and determine the reward
                      amount to be paid to contributors. You can receive a grant depending on the merits of your
                      project, which is purely discretionary (will be taken by OD or by a committee of independent
                      experts)
                    </Typo>

                    <Typo size="s" color="text-2">
                      <span className="underline">In both cases</span>, you must: (i) properly use our platform and
                      refrain from all fraudulent activity; (ii) give us valid information about your status, including
                      whether you act for a company or not; (iii) comply with the laws and regulations in force in the
                      country in which you are locateds.
                    </Typo>

                    <Typo size="s" color="text-2">
                      <span className="font-medium">What are Our responsibilities?</span> We undertake to provide you
                      with our platform and ensure its proper operation and transfer to contributors the rewards under
                      the conditions defined by the project leader.
                    </Typo>

                    <Typo size="s" color="text-2">
                      By using Our platform, You understand that we are not responsible for the interruption or
                      breakdowns of our platform; we are not your employer and the rewards that we transfer to you must
                      not be considered as a salary; we are not responsible for the amount of budget that is given to a
                      project nor for the amount of rewards that is given to contributors; and we are not responsible if
                      the foundations decide not to give us funds anymore.
                    </Typo>
                  </div>
                </div>
              </div>
            </ScrollView>
          </Paper>
        </div>

        <Paper
          container="2"
          size="s"
          classNames={{
            base: "flex gap-3 items-center",
          }}
        >
          <Paper container="3" size="s">
            <Switch onChange={handleSwitchChange} isActive={isTermsAccepted} />
          </Paper>

          <div className="flex flex-col">
            <Typo size="l" weight="medium" translate={{ token: "v2.pages.signup.onboarding.terms.agree.title" }} />
            <Typo size="s" color="text-2">
              <Translate token="v2.pages.signup.onboarding.terms.agree.description.full" />{" "}
              <BaseLink href={termsUrls.terms} className="text-text-1 underline">
                <Translate token="v2.pages.signup.onboarding.terms.agree.description.terms" />
              </BaseLink>{" "}
              <Translate token="v2.pages.signup.onboarding.terms.agree.description.and" />{" "}
              <BaseLink href={termsUrls.privacy} className="text-text-1 underline">
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
