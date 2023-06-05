import { PropsWithChildren, useState } from "react";
import { Navigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { useAcceptTermsAndConditionsMutation } from "src/__generated/graphql";
import FullTermsAndConditionsSidePanel from "./FullTermsAndConditionsSidePanel";
import PrivacyPolicySidePanel from "./PrivacyPolicySidePanel";

export const TermsAndConditions = () => {
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [acceptTermsAndConditionsMutation, { data }] = useAcceptTermsAndConditionsMutation();
  const [checked, setChecked] = useState(false);
  const [showFullTermsAndConditions, setShowFullTermsAndConditions] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="h-full flex flex-col justify-center items-center text-greyscale-50">
        <FullTermsAndConditionsSidePanel {...{ showFullTermsAndConditions, setShowFullTermsAndConditions }} />
        <PrivacyPolicySidePanel {...{ showPrivacyPolicy, setShowPrivacyPolicy }} />
        <div className="w-1/2 my-16">
          {!showTermsAndConditions ? (
            <Card
              className="flex flex-col justify-between gap-7 items-center px-24 pt-20 pb-12 relative mx-auto"
              padded={false}
            >
              <div className="absolute -top-10">
                <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
              </div>
              <div className="font-belwe text-3xl">Before you get started...</div>
              <div className="text-center">
                <p>We need you to fully accept our Terms and Conditions.</p>
                <p> Fear not, we’ve made them extra easy to read</p>
              </div>
              <Button onClick={() => setShowTermsAndConditions(true)}>Let’s get reading!</Button>
              <div className="text-spaceBlue-200">
                For any questions,{" "}
                <a className="underline" href="mailto:admin@onlydust.xyz">
                  reach out to us
                </a>
              </div>
            </Card>
          ) : (
            <>
              {!data && (
                <div className="pt-1.5 rounded-2xl bg-mosaic bg-contain outline outline-greyscale-50/8">
                  <Card
                    className="flex flex-col justify-between gap-7 items-center pt-20 mb-5 divide-y divide-greyscale-50/12 bg-whiteFakeOpacity-2"
                    padded={false}
                    blurred={false}
                  >
                    <div className="flex flex-col justify-between gap-7 items-center mx-auto px-24">
                      <div className="font-belwe text-3xl">Summary of our Terms & Conditions</div>
                      <div className="text-center">
                        <p>To use Only Dust, you must accept and comply with our Terms and Conditions.</p>
                        <p>Here’s a summary of our responsibilities and your commitments.</p>
                      </div>
                      <Section title="About us">
                        <div className="text-sm pt-3">
                          Only Dust is a platform provided by Wagmi SAS (“Us”, “We”, “Our”) that allows the reward of
                          open source projects developed for blockchain ecosystems. Partners among the ecosystems give
                          Us funds that we distribute to developers (“You”, “Your”). The amount that is given to You is
                          decided by members of the open source community.
                        </div>
                      </Section>
                      <Section title="Your commitments">
                        <div className="text-sm pt-3">
                          <p className="mb-4">
                            You can either be a contributor or a project leader. Contributors are developers and project
                            leaders are those who manage contributors and projects.
                          </p>
                          <p>
                            In both cases, You must:
                            <ul className="list-disc ml-6 mb-4">
                              <li>Properly use our platform and refrain from all fraudulent activity; </li>
                              <li>
                                Give Us valid information about your status, including whether you act for a company or
                                not;
                              </li>
                              <li> Make proper developments for the project that you chose; and</li>
                              <li>
                                Comply with the laws and regulations in force in the country in which You are located.
                              </li>
                            </ul>
                            If You are a project leader, You must manage the contributors and the projects developments.
                            You must also decide the amount of funds that You want to allocate to each of the
                            contributors that You manage. If You act for a company, you must comply with additional
                            requirements so please read carefully Our Terms and Conditions.
                          </p>
                        </div>
                      </Section>
                      <Section title="Our responsibilities">
                        <div className="text-sm pt-3">
                          We undertake to:
                          <ul className="list-disc ml-6 mb-4">
                            <li>Provide You with our platform and ensure its proper operation;</li>
                            <li> List projects that You can participate in; and </li>
                            <li>
                              Transfer You the funds that have been attributed to You by the community, upon reporting
                              of Your developments on the platform.
                            </li>
                          </ul>
                          However, We are just an intermediary between You and the partners (the companies or
                          foundations providing the funds). Thus, by using Our platform, You understand that:
                          <ul className="list-disc ml-6 mb-4">
                            <li> We are not responsible for the interruption or breakdowns of Our platform; </li>
                            <li>
                              We are not Your employer. There is no employment contract between us and the rewards that
                              we distribute to You must not be considered as a salary;
                            </li>
                            <li>
                              We are not responsible for the amount of funds that is given to You. It is decided by the
                              partners and the community; and
                            </li>
                            <li>
                              We are not responsible if the partners decide not to give Us funds anymore. If the partner
                              stops the funding of a project that You are a part of, we will inform You that the Terms
                              and Conditions are terminated.
                            </li>
                          </ul>
                        </div>
                      </Section>
                    </div>
                    <div className="flex flex-col gap-7 w-full items-center justify-between bg-white/4 py-6 px-6 rounded-b-xl ring-none">
                      <div className="flex flex-row gap-3 items-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onClick={() => setChecked(!checked)}
                          className="w-5 h-5 bg-white/8 hover:bg-white/2 checked:bg-spacePurple-500 rounded border border-greyscale-50/20 checked:border-spacePurple-700 focus:ring-0 focus:ring-offset-0 cursor-pointer enabled:ring-0 checked:focus:bg-spacePurple-500 checked:hover:bg-spacePurple-500/90  checked:hover:border-spacePurple-700"
                        />
                        <p>
                          I agree to the{" "}
                          <span
                            onClick={() => setShowFullTermsAndConditions(true)}
                            className="inline underline cursor-pointer"
                          >
                            full terms & conditions
                          </span>{" "}
                          & the{" "}
                          <span onClick={() => setShowPrivacyPolicy(true)} className="inline underline cursor-pointer">
                            privacy policy
                          </span>
                        </p>
                      </div>
                      <Button onClick={() => acceptTermsAndConditionsMutation()} width={Width.Full} disabled={!checked}>
                        Accept terms and conditions
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
              {data && <Navigate to={RoutePaths.Home} />}
            </>
          )}
        </div>
      </div>
    </Background>
  );
};

interface SectionProps extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => (
  <Card className="flex flex-col justify-between items-start divide-y divide-greyscale-50/12 text-walsheim bg-whiteFakeOpacity-5">
    <div className="text-lg pb-2 font-medium">{title}</div>
    {children}
  </Card>
);
