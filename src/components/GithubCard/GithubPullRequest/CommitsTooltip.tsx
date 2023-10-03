import { useIntl } from "src/hooks/useIntl";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { GithubPullRequestWithCommitsFragment } from "src/__generated/graphql";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";

type CommitsTooltipProps = {
  pullRequest: GithubPullRequestWithCommitsFragment;
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
    <div className="flex flex-col">
      <>
        <span className="text-xs text-greyscale-200">
          {T("reward.form.contributions.pullRequests.tooltip.createdBy")}

          {pullRequest?.author?.login ? (
            <Link
              className="inline-flex text-xs text-spacePurple-400 hover:text-spacePurple-200"
              to={generatePath(RoutePaths.PublicProfile, {
                userLogin: pullRequest?.author?.login,
              })}
              target="_blank"
            >
              <span className="px-1">{pullRequest.author?.login}</span>
              {pullRequest.author?.avatarUrl ? (
                <RoundedImage
                  alt={pullRequest.author.id.toString()}
                  rounding={Rounding.Circle}
                  size={ImageSize.Xxs}
                  src={pullRequest.author?.avatarUrl}
                />
              ) : null}
            </Link>
          ) : null}
        </span>

        <span className="text-sm">
          {T("githubCodeReview.tooltip.commits", {
            user: contributorLogin ?? "",
            commits: userCommits + "/" + commitsCount,
            count: commitsCount,
          })}
        </span>
      </>
    </div>
  );
}
