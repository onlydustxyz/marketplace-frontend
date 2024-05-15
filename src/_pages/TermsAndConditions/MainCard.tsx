import { PropsWithChildren, useState } from "react";

import Button, { ButtonOnBackground, Width } from "src/components/Button";
import Card from "src/components/Card";
import { Flex } from "src/components/New/Layout/Flex";
import { useSidePanel } from "src/hooks/useSidePanel";

import TermsAndConditionsCheckBox from "./Checkbox";

interface TermsAndConditionsMainCardProps {
  handleAcceptTermsAndConditions: () => void;
}

export default function TermsAndConditionsMainCard({
  handleAcceptTermsAndConditions,
}: TermsAndConditionsMainCardProps) {
  const [checked, setChecked] = useState(false);
  const { openFullTermsAndConditions, openPrivacyPolicy } = useSidePanel();

  return (
    <>
      <div className="hidden w-full bg-mosaic bg-cover pb-1.5 md:block" />
      <div className="flex flex-col gap-4 bg-card-background-base p-12 pb-5">
        <div className="text-center font-belwe text-3xl">Summary</div>
        <div className="text-center">
          <p>
            This summary is intended to provide a simple and concise presentation of the content of these T&Cs. It has
            no contractual value and does not form part of the T&Cs. To use our services, you must read the T&Cs below
            and accept them in full. In the event of any contradiction between this summary and the T&Cs, the latter
            shall prevail.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-auto px-3">
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="flex flex-col gap-4 px-9 pb-4">
            <Section title="What’s Only Dust?">
              <div className="pt-3 text-sm">
                Only Dust is a platform provided by Wagmi SAS designed to optimize the financing of open source projects
                using blockchain protocols. On behalf of foundations supporting the development of protocols, we
                organize connections between open source projects and developers and organize the funding of the
                latter's contributions.
              </div>
            </Section>
            <Section title="How to access Only Dust? ">
              <div className="pt-3 text-sm">
                <p>
                  To use our platform, you must be of legal age (+ 16 years), not be a sanctioned person, and, of
                  course, accept and observe the T&Cs in full. To obtain your rewards, you will need to comply with
                  KYC/KYB requirements.
                </p>
              </div>
            </Section>
            <Section title="What are your responsibilities? ">
              <div className="pt-3 text-sm">
                <p className="mb-4">You can use the platform as a project leader or as a contributor.</p>
                <p className="mb-4">
                  <u>If you are a contributor</u>, you will provide contributions from among those proposed on the
                  platform by the projects. You undertake to execute these contributions with the highest level of
                  diligence, in accordance with the specifications set out by the project. Rewards for this contribution
                  will not be systematic and will depend in part on how well the contribution is executed. This
                  evaluation will be carried out by the project leader and, except in cases of fraud, Only Dust will not
                  be directly involved.
                </p>
                <p className="mb-4">
                  <u>If you are a Project Leader</u>, the project must be open-source and useful for the community. You
                  will be responsible for the project, and as such, you will have to define the nature of the
                  contributions required, assess their quality and determine the reward amount to be paid to
                  contributors. You can receive a grant depending on the merits of your project, which is purely
                  discretionary (will be taken by OD or by a committee of independent experts)
                </p>
                <p className="mb-4">
                  <u>In both cases</u>, you must: (i) properly use our platform and refrain from all fraudulent
                  activity; (ii) give us valid information about your status, including whether you act for a company or
                  not; (iii) comply with the laws and regulations in force in the country in which you are located.
                </p>
                <p className="mb-4">
                  <strong>What are Our responsibilities?</strong> We undertake to provide you with our platform and
                  ensure its proper operation and transfer to contributors the rewards under the conditions defined by
                  the project leader.
                </p>
                <p className="mb-4">
                  By using Our platform, You understand that we are not responsible for the interruption or breakdowns
                  of our platform; we are not your employer and the rewards that we transfer to you must not be
                  considered as a salary; we are not responsible for the amount of budget that is given to a project nor
                  for the amount of rewards that is given to contributors; and we are not responsible if the foundations
                  decide not to give us funds anymore.
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>

      <Flex
        justify="between"
        item="center"
        gap={4}
        className="z-10 flex w-full flex-col border-t border-card-border-light bg-card-background-base p-6 shadow-medium xl:rounded-b-2xl"
      >
        <div className="flex flex-row items-center gap-3">
          <TermsAndConditionsCheckBox {...{ checked, setChecked }} />
          <p>
            I agree to the{" "}
            <span onClick={() => openFullTermsAndConditions()} className="inline cursor-pointer underline">
              full terms & conditions
            </span>{" "}
            & the{" "}
            <span onClick={() => openPrivacyPolicy()} className="inline cursor-pointer underline">
              privacy policy
            </span>
          </p>
        </div>
        <Button
          id="accept-tac-btn"
          data-testid="accept-tac-btn"
          onClick={() => handleAcceptTermsAndConditions()}
          width={Width.Full}
          disabled={!checked}
          onBackground={ButtonOnBackground.Blue}
        >
          Confirm
        </Button>
      </Flex>
    </>
  );
}

interface SectionProps extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => (
  <Card className="w-full rounded-2xl border border-greyscale-50/8 p-4 font-walsheim shadow-md lg:p-6" withBg={false}>
    <div className="pb-2 text-lg font-medium">{title}</div>
    {children}
  </Card>
);
