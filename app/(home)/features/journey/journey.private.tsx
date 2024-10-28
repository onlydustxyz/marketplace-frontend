"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useMemo } from "react";

import { JourneyItem } from "app/(home)/features/journey/components/journey-item";
import { JourneyPrivateLoading } from "app/(home)/features/journey/journey.private.loading";
import styles from "app/(home)/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { ProgressBar } from "components/ds/progress-bar/progress-bar";
import { Section } from "components/layout/section/section";
import { Typography } from "components/layout/typography/typography";

export function JourneyPrivate() {
  const { data, isLoading } = UserReactQueryAdapter.client.useGetMyOnboarding({});

  const steps = useMemo(() => {
    if (!data) return [];
    return [
      { stepName: "step1", completion: data?.verificationInformationProvided },
      { stepName: "step2", completion: data?.termsAndConditionsAccepted },
      { stepName: "step3", completion: data?.projectPreferencesProvided },
      { stepName: "step4", completion: data?.profileCompleted },
      { stepName: "step5", completion: data?.payoutInformationProvided },
    ];
  }, [data]);

  if (isLoading) return <JourneyPrivateLoading />;

  if (!data || data.hasCompletedAllSteps()) return null;

  return (
    <div className={cn("w-full", styles.areaJourney)}>
      <Section
        iconProps={{ remixName: "ri-rocket-2-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.journey.title",
          },
        }}
      >
        <Card background={"base"} className="flex flex-col" hasPadding={false}>
          <div className="flex items-center gap-2 px-3 py-4 pb-1.5 sm:px-5 sm:py-6 sm:pb-1.5">
            <ProgressBar
              maxValue={100}
              value={data.completion}
              color="spacePurple"
              classNames={{
                track: "h-4",
              }}
            />
            <Typography
              variant="body-l-bold"
              translate={{ token: "v2.pages.home.journey.progressPercentage", params: { count: data.completion ?? 0 } }}
              className="text-spaceBlue-200"
            />
          </div>
          <div className="flex flex-col divide-y divide-card-border-light">
            {steps.map(({ stepName, completion }) => (
              <JourneyItem key={stepName} stepName={stepName} completion={completion} />
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}
