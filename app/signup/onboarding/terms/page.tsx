"use client";

import { useState } from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Switch } from "components/atoms/switch";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

function Footer() {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant="secondary-light"
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: "/signup" }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        variant="secondary-light"
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.skip" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
      />
    </div>
  );
}

function TermsAndConditionsPage() {
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleSwitchChange() {
    setIsActive(!isActive);
  }

  return (
    <SignupTemplate header={<AccountAlreadyExist />} footer={<Footer />}>
      <Paper container="2" classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
        <StepHeader
          step={2}
          stepPath="/signup/onboarding"
          subStep={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.title" }}
        />

        <Title
          title={{ token: "v2.pages.signup.onboarding.terms.title" }}
          content={{ token: "v2.pages.signup.onboarding.terms.content" }}
        />

        <div className="mt-3 flex w-full flex-col gap-3">
          <Paper container="3" size="s">
            <ScrollView>
              <div className="flex flex-col gap-6">
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
                  <Typo
                    size="s"
                    color="text-2"
                    translate={{
                      token: "v2.pages.signup.onboarding.terms.terms.responsability.description",
                    }}
                  />
                </div>
              </div>
            </ScrollView>
          </Paper>

          <Paper
            container="2"
            classNames={{
              base: "flex gap-3 items-center",
            }}
          >
            <Paper container="3" size="s">
              <Switch onChange={handleSwitchChange} isActive={isActive} />
            </Paper>

            <div className="flex flex-col">
              <Typo size="l" weight="medium" translate={{ token: "v2.pages.signup.onboarding.terms.agree.title" }} />
              <Typo size="s" color="text-2">
                <Translate token="v2.pages.signup.onboarding.terms.agree.description.full" />{" "}
                <BaseLink href="/terms" className="text-text-1 underline">
                  <Translate token="v2.pages.signup.onboarding.terms.agree.description.terms" />
                </BaseLink>{" "}
                <Translate token="v2.pages.signup.onboarding.terms.agree.description.and" />{" "}
                <BaseLink href="/privacy" className="text-text-1 underline">
                  <Translate token="v2.pages.signup.onboarding.terms.agree.description.privacy" />
                </BaseLink>
              </Typo>
            </div>
          </Paper>
        </div>
      </Paper>
    </SignupTemplate>
  );
}

export default TermsAndConditionsPage;
