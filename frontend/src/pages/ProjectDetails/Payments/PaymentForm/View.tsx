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
import { ReactElement, useEffect, useState } from "react";
import WorkItemSidePanel from "./WorkItemSidePanel";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import Callout from "src/components/Callout";
import { Status } from "src/__generated/graphql";
import useWorkItems from "./useWorkItems";
import { filter } from "lodash";
import { Contributor } from "./types";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (amountToPay: number, hoursWorked: number) => void;
  onWorkItemsChange: (workItems: WorkItem[]) => void;
  contributor: Contributor | null | undefined;
  setContributor: (contributor: Contributor | null | undefined) => void;
  unpaidPRs: WorkItem[] | null | undefined;
  requestNewPaymentMutationLoading: boolean;
}

type TitleProps = {
  title: string;
  rightAction?: ReactElement;
};

function SectionTitle({ title, rightAction }: TitleProps) {
  return (
    <div className="mx-4 flex items-end justify-between border-b border-b-greyscale-50/8 pb-2 font-belwe text-base font-normal text-greyscale-50">
      {title}
      {rightAction}
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
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
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

  const displayCallout = contributor && !contributor.userId;

  return (
    <>
      {isXl && (
        <Title>
          <div className="flex flex-row items-center gap-3">
            <div onClick={() => navigate(-1)}>
              <Button type={ButtonType.Secondary} size={ButtonSize.Sm} iconOnly>
                <CloseLine className="text-base" />
              </Button>
            </div>
            <div className="text-2xl xl:text-3xl">{T("project.details.rewards.new.title")}</div>
          </div>
        </Title>
      )}
      <div className="flex h-full flex-col items-start gap-5 xl:flex-row">
        <div className="basis-3/5 self-stretch">
          <div className="flex w-full flex-col gap-6">
            <Card className="z-10 px-4 py-7" padded={false}>
              <div className={displayCallout ? "xl:h-52" : "h-24"}>
                <SectionTitle title={T("reward.form.contributor.title")} />
                <div className="relative z-10">
                  <ContributorSelect projectId={projectId} contributor={contributor} setContributor={setContributor} />
                </div>
                {displayCallout && (
                  <div className="mx-4 pt-24">
                    <Callout>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm xl:text-base xl:font-medium">
                          {T("reward.form.contributor.needsToSignup.title", { contributor: contributor?.login })}
                        </span>
                        <span>{T("reward.form.contributor.needsToSignup.details")}</span>
                      </div>
                    </Callout>
                  </div>
                )}
              </div>
              {contributor && (
                <div className="pt-8 xl:pt-12">
                  <SectionTitle
                    title={T("reward.form.contributions.title")}
                    rightAction={
                      <div className="flex flex-row items-center gap-2">
                        {workItems.length > 0 && (
                          <Button type={ButtonType.Ternary} size={ButtonSize.Sm} onClick={() => clearWorkItems()}>
                            <CloseLine />
                            {T("reward.form.contributions.clear")}
                          </Button>
                        )}
                        <Button
                          size={ButtonSize.Sm}
                          type={ButtonType.Secondary}
                          onClick={() => setSidePanelOpen(true)}
                          iconOnly
                        >
                          <Add />
                        </Button>
                      </div>
                    }
                  />
                  <div className="mx-4 flex flex-col gap-3 pt-4" data-testid="added-work-items">
                    <div className="text-sm text-greyscale-300 xl:text-base">
                      {T("reward.form.contributions.subTitle")}
                    </div>
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
                      {T("reward.form.contributions.addContribution")}
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
                contributorId={contributor.githubUserId}
              />
            )}
          </div>
        </div>
        <div className="sticky top-4 w-full basis-2/5">
          <WorkEstimation
            onChange={onWorkEstimationChange}
            budget={budget}
            missingContributor={!contributor}
            missingContribution={workItems.length === 0}
            requestNewPaymentMutationLoading={requestNewPaymentMutationLoading}
          />
        </div>
      </div>
    </>
  );
};

export default View;
