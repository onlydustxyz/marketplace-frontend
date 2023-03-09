import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import Card from "src/components/Card";
import WorkEstimation from "./WorkEstimation";
import { Budget } from "src/hooks/useWorkEstimation";
import { REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "src/pages/ProjectDetails/Payments/PaymentForm";
import { InputErrorDisplay } from "src/components/FormInput/View";
import ContributorSelect from "src/pages/ProjectDetails/Payments/PaymentForm/ContributorSelect";
import { useWatch } from "react-hook-form";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useNavigate } from "react-router-dom";
import CloseLine from "src/icons/CloseLine";
import Title from "../../Title";
import { PropsWithChildren } from "react";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (workEstimation: number) => void;
}

type SectionProps = {
  title: string;
} & PropsWithChildren;

function Section({ title, children }: SectionProps) {
  return (
    <div className="flex flex-col gap-2 divide-y divide-solid divide-greyscale-50/8 ">
      <div className="font-normal font-belwe text-base text-greyscale-50">{title}</div>
      <div className="flex flex-row pt-3">{children}</div>
    </div>
  );
}

const View: React.FC<Props> = ({ budget, onWorkEstimationChange, projectId }) => {
  const { T } = useIntl();

  const contributor = useWatch({ name: "contributor" });
  const navigate = useNavigate();

  return (
    <>
      <Title>
        <div className="flex flex-row gap-3 items-center">
          <div onClick={() => navigate(-1)}>
            <Button type={ButtonType.Secondary} size={ButtonSize.Sm} iconOnly>
              <CloseLine className="text-base" />
            </Button>
          </div>
          {T("project.details.payments.new.title")}
        </div>
      </Title>
      <div className="flex flex-row items-start gap-4 h-full">
        <div className="basis-3/5 self-stretch">
          <div className="flex flex-col gap-6 w-full">
            <Card className="px-8 pb-3">
              <Section title={T("payment.form.contributor.title")}>
                <ContributorSelect projectId={projectId} />
              </Section>
              {contributor && (
                <Section title={T("payment.form.issueLink.title")}>
                  <Input
                    label={T("payment.form.issueLink.inputLabel")}
                    name="linkToIssue"
                    placeholder={T("payment.form.issueLink.placeholder")}
                    errorDisplay={InputErrorDisplay.Banner}
                    options={{
                      pattern: {
                        value: REGEX_VALID_GITHUB_PULL_REQUEST_URL,
                        message: T("payment.form.issueLink.error"),
                      },
                    }}
                    showValidationErrors={false}
                  />
                </Section>
              )}
            </Card>
          </div>
        </div>
        <div className="basis-2/5">
          <WorkEstimation onChange={onWorkEstimationChange} budget={budget} />
        </div>
      </div>
    </>
  );
};

export default View;
