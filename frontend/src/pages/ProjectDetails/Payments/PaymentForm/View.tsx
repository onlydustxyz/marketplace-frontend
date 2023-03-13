import { useIntl } from "src/hooks/useIntl";
import Card from "src/components/Card";
import WorkEstimation from "./WorkEstimation";
import { Budget } from "src/hooks/useWorkEstimation";
import ContributorSelect from "src/pages/ProjectDetails/Payments/PaymentForm/ContributorSelect";
import { useWatch } from "react-hook-form";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import { useNavigate } from "react-router-dom";
import CloseLine from "src/icons/CloseLine";
import Title from "../../Title";
import Add from "src/icons/Add";
import { useState } from "react";
import WorkItemSidePanel from "./WorkItemSidePanel";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (workEstimation: number) => void;
}

const View: React.FC<Props> = ({ budget, onWorkEstimationChange, projectId }) => {
  const { T } = useIntl();

  const contributor = useWatch({ name: "contributor" });
  const navigate = useNavigate();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

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
            <Card className="px-8 pb-3 z-10">
              <div className="flex flex-col gap-2 divide-y divide-solid divide-greyscale-50/8 ">
                <div className="font-medium text-lg">{T("payment.form.contributor.title")}</div>
                <div className="flex flex-row pt-3">
                  <ContributorSelect projectId={projectId} />
                </div>
              </div>
            </Card>
            {contributor && (
              <>
                <Card className="flex flex-col px-8 pb-8 z-0 gap-8">
                  <div className="flex flex-col gap-2 divide-y divide-solid divide-greyscale-50/8 ">
                    <div className="font-medium text-lg">{T("payment.form.workItems.title")}</div>
                    <span className="pt-3 text-greyscale-300">{T("payment.form.workItems.subTitle")}</span>
                  </div>
                  <div onClick={() => setSidePanelOpen(true)}>
                    <Button size={ButtonSize.Md} type={ButtonType.Secondary} width={Width.Full}>
                      <Add />
                      {T("payment.form.workItems.add")}
                    </Button>
                  </div>
                </Card>
                <WorkItemSidePanel open={sidePanelOpen} setOpen={setSidePanelOpen} />
              </>
            )}
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
