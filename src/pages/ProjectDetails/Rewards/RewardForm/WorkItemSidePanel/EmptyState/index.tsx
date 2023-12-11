import { useIntl } from "src/hooks/useIntl";
import emptyStateLogo from "assets/img/empty-state.png";
import { WorkItemType } from "src/__generated/graphql";

const itemTypes = {
  [WorkItemType.Issue]: "project.details.edit.fields.rewardableContributions.issues",
  [WorkItemType.PullRequest]: "project.details.edit.fields.rewardableContributions.pullRequests",
  [WorkItemType.CodeReview]: "project.details.edit.fields.rewardableContributions.codeReviews",
};

type EmptyStateProps = {
  type: WorkItemType;
};

export default function EmptyState({ type }: EmptyStateProps) {
  const { T } = useIntl();

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/2 p-12">
      <div className="mb-6">
        <img src={emptyStateLogo} />
      </div>
      <div className="text-center font-belwe text-2xl font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.title")}
      </div>
      <div className="text-center font-walsheim text-base font-normal text-greyscale-50">
        {T("reward.form.contributions.emptyState.subtitle", {
          itemType: T(itemTypes[type]).toLowerCase(),
        })}
      </div>
    </div>
  );
}
