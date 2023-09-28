import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";
import { Budget } from "src/hooks/useWorkEstimation";
import ContributorSelect from "src/pages/ProjectDetails/Rewards/RewardForm/ContributorSelect";
import WorkEstimation from "./WorkEstimation";

import { filter } from "lodash";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContributionFragment, GithubIssueStatus, WorkItemFragment } from "src/__generated/graphql";
import addContributionImg from "src/assets/img/add-contribution.png";
import pickContributorImg from "src/assets/img/pick-contributor.png";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Callout from "src/components/Callout";
import { GithubCodeReviewStatus } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import { viewportConfig } from "src/config";
import Add from "src/icons/Add";
import CloseLine from "src/icons/CloseLine";
import { contributionToWorkItem } from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/WorkItems/WorkItems";
import Title from "src/pages/ProjectDetails/Title";
import { GithubContributionType } from "src/types";
import { useMediaQuery } from "usehooks-ts";
import { AutoAdd } from "./AutoAdd/AutoAdd";
import { WorkItem } from "./WorkItem";
import WorkItemSidePanel from "./WorkItemSidePanel";
import { Contributor } from "./types";
import useWorkItems from "./useWorkItems";
import { GithubPullRequestStatus } from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";

interface Props {
  projectId: string;
  budget: Budget;
  onWorkEstimationChange: (amountToPay: number, hoursWorked: number) => void;
  onWorkItemsChange: (workItems: WorkItemFragment[]) => void;
  contributor: Contributor | null | undefined;
  setContributor: (contributor: Contributor | null | undefined) => void;
  unpaidContributions: ContributionFragment | null | undefined;
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
  unpaidContributions,
  requestNewPaymentMutationLoading,
}) => {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);
  const navigate = useNavigate();
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const { workItems, add: addWorkItem, remove: removeWorkItem, clear: clearWorkItems } = useWorkItems();

  const filters = {
    [GithubContributionType.Issue]: { githubIssue: { status: GithubIssueStatus.Completed } },
    [GithubContributionType.PullRequest]: { githubPullRequest: { status: GithubPullRequestStatus.Merged } },
    [GithubContributionType.CodeReview]: { githubCodeReview: { status: GithubCodeReviewStatus.Completed } },
  };

  const displayCallout = contributor && !contributor.userId;

  const handleAutoAdd = (type: GithubContributionType) => {
    if (!unpaidContributions) return;

    const filteredContributions = filter(unpaidContributions, {
      ...filters[type],
      ignored: false,
    });

    const workItems = filteredContributions.map(
      contribution => contributionToWorkItem(contribution) as WorkItemFragment
    );

    addWorkItem(workItems);
  };

  useEffect(() => {
    onWorkItemsChange(workItems);
  }, [workItems]);

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
        <div className="w-full">
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
                            {T(isMd ? "reward.form.contributions.clear" : "reward.form.contributions.clearShort")}
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

                    <AutoAdd contributor={contributor} onAutoAdd={handleAutoAdd} workItems={workItems} />

                    {workItems.map(workItem => (
                      <WorkItem key={workItem.id} workItem={workItem} action={() => removeWorkItem(workItem)} />
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
                addWorkItem={addWorkItem}
                contributorHandle={contributor.login}
                contributorId={contributor.githubUserId}
              />
            )}
          </div>
        </div>
        <div className="w-full shrink-0 xl:w-[384px]">
          {!contributor && (
            <PlaceholderWithImage
              text={T("reward.form.missingContributor")}
              imageElement={<img width={267} src={pickContributorImg} className="absolute bottom-0 right-0 top-0" />}
            />
          )}
          {contributor && workItems.length === 0 && (
            <PlaceholderWithImage
              text={T("reward.form.missingContribution")}
              imageElement={<img width={165} src={addContributionImg} className="absolute bottom-0 right-0" />}
            />
          )}
          {contributor && workItems.length > 0 && (
            <WorkEstimation
              onChange={onWorkEstimationChange}
              budget={budget}
              requestNewPaymentMutationLoading={requestNewPaymentMutationLoading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default View;

function PlaceholderWithImage({ text, imageElement }: { text: string; imageElement: ReactNode }) {
  return (
    <Card padded={false} className="relative flex h-[163px] items-center bg-noise-medium pl-8">
      <span className="max-w-[160px] font-walsheim text-greyscale-50">{text}</span>
      {imageElement}
    </Card>
  );
}
