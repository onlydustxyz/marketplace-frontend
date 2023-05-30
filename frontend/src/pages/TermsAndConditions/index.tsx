import { PropsWithChildren, useState } from "react";
import ReactMarkdown from "react-markdown";
import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button from "src/components/Button";
import Card from "src/components/Card";
import MarkdownPreview from "src/components/MarkdownPreview";
import { useAcceptTermsAndConditionsMutation } from "src/__generated/graphql";

export const TermsAndConditions = () => {
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [acceptTermsAndConditionsMutation, { data, loading, error }] = useAcceptTermsAndConditionsMutation();
  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="h-full flex flex-col justify-center items-center text-greyscale-50">
        <div className="w-1/2">
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
                <Card
                  className="flex flex-col justify-between gap-7 items-center px-24 pt-20 pb-12 relative mx-auto"
                  padded={false}
                >
                  <div className="font-belwe text-3xl">Summary of our Terms & Conditions</div>
                  <div className="text-center">
                    <p>To use Only Dust, you must accept and comply with our Terms and Conditions.</p>
                    <p>Here’s a summary of our responsibilities and your commitments.</p>
                  </div>
                  <Section title="About us">
                    <div className="text-sm pt-3">
                      Only Dust is a platform provided by Wagmi SAS (“Us”, “We”, “Our”) that allows the reward of open
                      source projects developed for blockchain ecosystems. Partners among the ecosystems give Us funds
                      that we distribute to developers (“You”, “Your”). The amount that is given to You is decided by
                      members of the open source community.
                    </div>
                  </Section>
                  <Section title="Your commitments">
                    <div className="text-sm pt-3">
                      You can either be a contributor or a project leader. Contributors are developers and project
                      leaders are those who manage contributors and projects. In both cases, You must: Properly use our
                      platform and refrain from all fraudulent activity; Give Us valid information about your status,
                      including whether you act for a company or not; Make proper developments for the project that you
                      chose; and Comply with the laws and regulations in force in the country in which You are located.
                      If You are a project leader, You must manage the contributors and the projects developments. You
                      must also decide the amount of funds that You want to allocate to each of the contributors that
                      You manage. If You act for a company, you must comply with additional requirements so please read
                      carefully Our Terms and Conditions.
                    </div>
                  </Section>
                  <Section title="Our responsibilities">
                    <div className="text-sm pt-3">
                      We undertake to: Provide You with our platform and ensure its proper operation; List projects that
                      You can participate in; and Transfer You the funds that have been attributed to You by the
                      community, upon reporting of Your developments on the platform. However, We are just an
                      intermediary between You and the partners (the companies or foundations providing the funds).
                      Thus, by using Our platform, You understand that: We are not responsible for the interruption or
                      breakdowns of Our platform; We are not Your employer. There is no employment contract between us
                      and the rewards that we distribute to You must not be considered as a salary; We are not
                      responsible for the amount of funds that is given to You. It is decided by the partners and the
                      community; and We are not responsible if the partners decide not to give Us funds anymore. If the
                      partner stops the funding of a project that You are a part of, we will inform You that the Terms
                      and Conditions are terminated.
                    </div>
                  </Section>
                  <Button onClick={() => acceptTermsAndConditionsMutation()}>Accept terms and conditions</Button>
                </Card>
              )}
              {data && (
                <Card>
                  <div>Terms and conditions accepted !</div>
                </Card>
              )}
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
  <Card className="flex flex-col justify-between items-start divide-y divide-greyscale-50/12 text-walsheim">
    <div className="text-lg pb-2 font-medium">{title}</div>
    {children}
  </Card>
);
