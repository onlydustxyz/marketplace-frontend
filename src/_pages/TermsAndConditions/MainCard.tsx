import { PropsWithChildren, useState } from "react";
import Button, { ButtonOnBackground, Width } from "src/components/Button";
import Card from "src/components/Card";
import TermsAndConditionsCheckBox from "./Checkbox";
import { useSidePanel } from "src/hooks/useSidePanel";
import { Flex } from "src/components/New/Layout/Flex";

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
        <div className="text-center font-belwe text-3xl">Summary of our Terms & Conditions</div>
        <div className="text-center">
          <p>To use OnlyDust, you must accept and comply with our Terms and Conditions.</p>
          <p>Here’s a summary of our responsibilities and your commitments.</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-auto px-3">
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-spaceBlue-600 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="flex flex-col gap-4 px-9 pb-4">
            <Section title="About us">
              <div className="pt-3 text-sm">
                OnlyDust is a platform provided by Wagmi SAS (“Us”, “We”, “Our”) that allows the reward of open source
                projects developed for blockchain ecosystems. Partners among the ecosystems give Us funds that we
                distribute to developers (“You”, “Your”). The amount that is given to You is decided by members of the
                open source community.
              </div>
            </Section>
            <Section title="Your commitments">
              <div className="pt-3 text-sm">
                <p className="mb-4">
                  You can either be a contributor or a project leader. Contributors are developers and project leaders
                  are those who manage contributors and projects.
                </p>
                <div>
                  In both cases, You must:
                  <ul className="mb-4 ml-6 list-disc">
                    <li>Properly use our platform and refrain from all fraudulent activity; </li>
                    <li>
                      Give Us valid information about your status, including whether you act for a company or not;
                    </li>
                    <li> Make proper developments for the project that you chose; and</li>
                    <li>Comply with the laws and regulations in force in the country in which You are located.</li>
                  </ul>
                  If You are a project leader, You must manage the contributors and the projects developments. You must
                  also decide the amount of funds that You want to allocate to each of the contributors that You manage.
                  If You act for a company, you must comply with additional requirements so please read carefully Our
                  Terms and Conditions.
                </div>
              </div>
            </Section>
            <Section title="Our responsibilities">
              <div className="pt-3 text-sm">
                We undertake to:
                <ul className="mb-4 ml-6 list-disc">
                  <li>Provide You with our platform and ensure its proper operation;</li>
                  <li> List projects that You can participate in; and </li>
                  <li>
                    Transfer You the funds that have been attributed to You by the community, upon reporting of Your
                    developments on the platform.
                  </li>
                </ul>
                However, We are just an intermediary between You and the partners (the companies or foundations
                providing the funds). Thus, by using Our platform, You understand that:
                <ul className="mb-4 ml-6 list-disc">
                  <li> We are not responsible for the interruption or breakdowns of Our platform; </li>
                  <li>
                    We are not Your employer. There is no employment contract between us and the rewards that we
                    distribute to You must not be considered as a salary;
                  </li>
                  <li>
                    We are not responsible for the amount of funds that is given to You. It is decided by the partners
                    and the community; and
                  </li>
                  <li>
                    We are not responsible if the partners decide not to give Us funds anymore. If the partner stops the
                    funding of a project that You are a part of, we will inform You that the Terms and Conditions are
                    terminated.
                  </li>
                </ul>
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
