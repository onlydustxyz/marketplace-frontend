import { useIntl } from "src/hooks/useIntl";
import Card from "src/components/Card";
import WorkEstimation from "./WorkEstimation";
import { Budget } from "src/hooks/useWorkEstimation";
import ContributorSelect from "src/pages/ProjectDetails/Payments/PaymentForm/ContributorSelect";

import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import { useNavigate } from "react-router-dom";
import CloseLine from "src/icons/CloseLine";
import Title from "src/pages/ProjectDetails/Title";
import Add from "src/icons/Add";
import { useEffect, useState } from "react";
import WorkItemSidePanel from "./WorkItemSidePanel";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import Callout from "src/components/Callout";
import { GithubUserFragment, Status } from "src/__generated/graphql";
import useWorkItems from "./useWorkItems";
import { filter } from "lodash";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (amountToPay: number, hoursWorked: number) => void;
  onWorkItemsChange: (workItems: WorkItem[]) => void;
  contributor: GithubUserFragment | null | undefined;
  setContributor: (contributor: GithubUserFragment | null | undefined) => void;
  unpaidPRs: WorkItem[] | null | undefined;
  requestNewPaymentMutationLoading: boolean;
}

type TitleProps = {
  title: string;
};

function SectionTitle({ title }: TitleProps) {
  return (
    <div className="font-normal font-belwe text-base text-greyscale-50 pb-2 mx-4 border-b border-b-greyscale-50/8">
      {title}
    </div>
  );
}

const View: React.FC<Props> = ({
  budget,
  onWorkEstimationChange,
  onWorkItemsChange,
  projectId,
  contributor,
  setContributor,
  unpaidPRs,
  requestNewPaymentMutationLoading,
}) => {
  const { T } = useIntl();
  const navigate = useNavigate();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [workItemsPrefilled, setWorkItemsPrefilled] = useState(false);

  const { workItems, add: addWorkItem, remove: removeWorkItem, clear: clearWorkItems } = useWorkItems();

  useEffect(() => onWorkItemsChange(workItems), [workItems, onWorkItemsChange]);
  useEffect(() => {
    if (!workItemsPrefilled && unpaidPRs) {
      clearWorkItems();
      addWorkItem(filter(unpaidPRs, { status: Status.Merged, ignored: false }));
      setWorkItemsPrefilled(true);
    }
  }, [unpaidPRs, contributor, addWorkItem, clearWorkItems, workItemsPrefilled, setWorkItemsPrefilled]);

  useEffect(() => setWorkItemsPrefilled(false), [contributor]);

  const displayCallout = contributor && !contributor?.user?.userId;

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
            <Card className="px-4 py-7" padded={false}>
              <div className={displayCallout ? "h-52" : "h-24"}>
                <SectionTitle title={T("payment.form.contributor.title")} />
                <div className="relative z-10">
                  <ContributorSelect projectId={projectId} contributor={contributor} setContributor={setContributor} />
                </div>
                {displayCallout && (
                  <div className="mx-4 pt-24">
                    <Callout>
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-medium">
                          {T("payment.form.contributor.needsToSignup.title", { contributor: contributor?.login })}
                        </span>
                        <span>{T("payment.form.contributor.needsToSignup.details")}</span>
                      </div>
                    </Callout>
                  </div>
                )}
              </div>
              {contributor && (
                <div className="pt-12">
                  <SectionTitle title={T("payment.form.workItems.title")} />
                  <div className="flex flex-col gap-3 mx-4 pt-4" data-testid="added-work-items">
                    <div className=" text-greyscale-300">{T("payment.form.workItems.subTitle")}</div>
                    {workItems.map(workItem => (
                      <GithubIssue
                        key={workItem.id}
                        workItem={workItem}
                        action={Action.Remove}
                        onClick={() => removeWorkItem(workItem)}
                      />
                    ))}
                  </div>
                  <div onClick={() => setSidePanelOpen(true)} data-testid="add-work-item-btn" className="mx-4 pt-8">
                    <Button size={ButtonSize.Md} type={ButtonType.Secondary} width={Width.Full}>
                      <Add />
                      {T("payment.form.workItems.addWorkItem")}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
            {contributor && (
              <WorkItemSidePanel
                projectId={projectId}
                open={sidePanelOpen}
                setOpen={setSidePanelOpen}
                workItems={workItems}
                onWorkItemAdded={addWorkItem}
                contributorHandle={contributor.login}
                contributorId={contributor.id}
              />
            )}
          </div>
        </div>
        <div className="basis-2/5 sticky top-4">
          <WorkEstimation
            onChange={onWorkEstimationChange}
            budget={budget}
            missingContributor={!contributor}
            missingWorkItem={workItems.length === 0}
            requestNewPaymentMutationLoading={requestNewPaymentMutationLoading}
          />
        </div>
      </div>
    </>
  );
};

export default View;
