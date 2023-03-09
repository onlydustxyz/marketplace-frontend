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

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (workEstimation: number) => void;
}

type TitleProps = {
  title: string;
};

function SectionTitle({ title }: TitleProps) {
  return (
    <div className="font-normal font-belwe text-base text-greyscale-50 pb-2 mb-3 mx-4 border-b border-b-greyscale-50/8">
      {title}
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
      <div className="flex flex-row items-start gap-5 h-full">
        <div className="basis-3/5 self-stretch">
          <div className="flex flex-col gap-6 w-full">
            <Card className="px-4 py-6" padded={false}>
              <SectionTitle title={T("payment.form.contributor.title")} />
              <ContributorSelect projectId={projectId} />
              {contributor && (
                <SectionTitle title={T("payment.form.issueLink.title")} />
              <div className="mx-4">
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
                </div>
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
