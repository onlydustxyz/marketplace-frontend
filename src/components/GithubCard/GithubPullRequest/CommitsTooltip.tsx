import { Contributor } from "components/features/contributor/contributor";

import { useIntl } from "hooks/translate/use-translate";

type Author = {
  authorLogin: string;
  authorAvatarUrl: string | undefined;
  githubAuthorId: number | undefined;
};

type CommitsTooltipProps = {
  author: Author;
  userCommits?: number;
  commitsCount?: number;
  contributorLogin: string;
};

export function CommitsTooltip({ author, userCommits = 0, commitsCount = 0, contributorLogin }: CommitsTooltipProps) {
  const { T } = useIntl();

  return (
    <div className="flex flex-col gap-1">
      <span className="gap-1 text-sm text-greyscale-200">
        {T("reward.form.contributions.pullRequests.tooltip.createdBy")}

        <div className="inline-flex">
          <Contributor
            className="ml-1 flex-row-reverse text-sm"
            githubUserId={author?.githubAuthorId ?? 0}
            login={author?.authorLogin}
            avatarUrl={author?.authorAvatarUrl}
            isRegistered={false}
            clickable
          />
        </div>
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
