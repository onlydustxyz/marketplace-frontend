"use client";

import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Card from "src/components/Card";

import { Button } from "components/ds/button/button";

import { useIntl } from "hooks/translate/use-translate";

export function CommitteeApplicantPublicPage() {
  const { T } = useIntl();

  // TODO finalise UI
  return (
    <div className="flex justify-center px-2 xl:pb-4">
      <div className="flex items-center justify-center">
        <Card
          className="relative mx-auto flex flex-col items-center justify-between gap-7 px-12 pb-12 pt-20 xl:px-24"
          padded={false}
        >
          <div className="absolute -top-10">
            <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
          </div>
          <div className="flex flex-col items-center gap-6">
            <div className="text-center font-belwe text-3xl font-normal text-greyscale-50">
              {T("onboarding.intro.title")}
            </div>
            <div className="text-center font-walsheim text-base font-normal text-greyscale-50 xl:whitespace-pre">
              {T("onboarding.intro.description")}
            </div>
            <div className="flex flex-col items-center gap-6">
              <Button>{T("onboarding.intro.acceptButton")}</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
