import { PropsWithChildren, useState } from "react";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import TermsAndConditionsCheckBox from "./Checkbox";
import { useSidePanel } from "src/hooks/useSidePanel";

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
      <div className="mt-6 rounded-2xl bg-mosaic bg-contain pt-1.5 outline outline-greyscale-50/8 xl:mt-20">
        <Card
          className="mb-5 flex flex-col items-center justify-between gap-7 divide-y divide-greyscale-50/12 bg-whiteFakeOpacity-2 pb-40 pt-12 xl:pb-0"
          padded={false}
        >
          <div className="flex flex-col items-center justify-between gap-4 px-6 xl:px-12">
            <div className="text-center font-belwe text-3xl">Summary of our Terms & Conditions</div>
            <div className="text-center">
              <p>To use Only Dust, you must accept and comply with our Terms and Conditions.</p>
              <p>Here’s a summary of our responsibilities and your commitments.</p>
            </div>
            <Section title="About us">
              <div className="pt-3 text-sm">
                Only Dust is a platform provided by Wagmi SAS (“Us”, “We”, “Our”) that allows the reward of open source
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
                <p>
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
                </p>
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
          <div className="ring-none fixed bottom-0 flex w-full flex-col items-center justify-between gap-7 rounded-b-xl bg-whiteFakeOpacity-2 px-6 py-6 xl:relative xl:bg-white/4">
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
            >
              Confirm
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}

interface SectionProps extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => (
  <Card className="text-walsheim flex flex-col items-start justify-between divide-y divide-greyscale-50/12 bg-whiteFakeOpacity-5">
    <div className="pb-2 text-lg font-medium">{title}</div>
    {children}
  </Card>
);
