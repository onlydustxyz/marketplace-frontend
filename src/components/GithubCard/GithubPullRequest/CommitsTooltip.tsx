import { useIntl } from "src/hooks/useIntl";
import { GithubPullRequestWithCommitsFragment } from "src/__generated/graphql";
import Contributor from "src/components/Contributor";
import { RewardableItem } from "src/api/Project/queries";

type CommitsTooltipProps = {
  pullRequest: Partial<GithubPullRequestWithCommitsFragment & RewardableItem>;
  userCommits?: number;
  commitsCount?: number;
  contributorLogin: string;
};

export function CommitsTooltip({
  pullRequest,
  userCommits = 0,
  commitsCount = 0,
  contributorLogin,
}: CommitsTooltipProps) {
  const { T } = useIntl();

  return (
    <div className="flex flex-col gap-1">
      <span className="gap-1 text-sm text-greyscale-200">
        {T("reward.form.contributions.pullRequests.tooltip.createdBy")}

        <Contributor
          className="ml-1 flex-row-reverse text-sm"
          key={pullRequest?.author?.id}
          contributor={{
            login: pullRequest?.author?.login ?? "",
            avatarUrl: pullRequest?.author?.avatarUrl ?? "",
            githubUserId: pullRequest?.author?.id,
          }}
          clickable
        />
      </span>

      <span className="text-sm">
        {T("githubCodeReview.tooltip.commits", {
          user: contributorLogin ?? "",
          commits: userCommits + "/" + commitsCount,
          count: commitsCount,
        })}
      </span>
    </div>
  );
}
