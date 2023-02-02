import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import Card from "src/components/Card";
import WorkEstimation from "./WorkEstimation";
import { Budget } from "src/hooks/useWorkEstimation";
import { REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "src/pages/ProjectDetails/PaymentActions/PaymentForm";
import { InputErrorType } from "src/components/FormInput/View";
import ContributorSelect from "src/pages/ProjectDetails/PaymentActions/PaymentForm/ContributorSelect";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (workEstimation: number) => void;
}

const View: React.FC<Props> = ({ budget, onWorkEstimationChange, projectId }) => {
  const { T } = useIntl();

  return (
    <div className="flex flex-row items-start gap-5 h-full">
      <div className="basis-3/5 self-stretch">
        <div className="flex flex-col gap-6 w-full">
          <Card className="px-8 pb-3 z-10">
            <div className="flex flex-col gap-2 divide-y divide-solid divide-greyscale-50/8 ">
              <div className="font-medium text-lg">{T("payment.form.contributor.title")}</div>
              <div className="flex flex-row pt-3">
                <ContributorSelect projectId={projectId} />
              </div>
            </div>
          </Card>
          <Card className="px-8 pb-8 z-0">
            <div className="flex flex-col gap-2 divide-y divide-solid divide-greyscale-50/8 ">
              <div className="font-medium text-lg">{T("payment.form.issueLink.title")}</div>
              <div className="flex flex-row pt-3">
                <Input
                  label={T("payment.form.issueLink.inputLabel")}
                  name="linkToIssue"
                  placeholder={T("payment.form.issueLink.placeholder")}
                  errorType={InputErrorType.Banner}
                  options={{
                    required: T("form.required"),
                    pattern: {
                      value: REGEX_VALID_GITHUB_PULL_REQUEST_URL,
                      message: T("payment.form.issueLink.error"),
                    },
                  }}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="basis-2/5">
        <WorkEstimation onChange={onWorkEstimationChange} budget={budget} />
      </div>
    </div>
  );
};

export default View;
