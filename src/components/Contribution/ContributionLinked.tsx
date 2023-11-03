import { GithubUser } from "src/__generated/graphql";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import StackLine from "src/icons/StackLine";
import { GithubContributionType, GithubItemStatus, GithubPullRequestDraft, QueryContribution } from "src/types";
import { getNbLinkedContributions } from "src/utils/getNbLinkedContributions";

export function ContributionLinked({
  contribution,
  withTooltip = true,
  asLink = false,
  tooltipProps = {
    position: TooltipPosition.Bottom,
    variant: Variant.Blue,
  },
}: {
  contribution: Pick<QueryContribution, "githubCodeReview" | "githubIssue" | "githubPullRequest" | "type" | "id">;
  withTooltip?: boolean;
  asLink?: boolean;
  tooltipProps?: React.ComponentProps<typeof Tooltip>;
}) {
  const { id, type, githubCodeReview, githubIssue, githubPullRequest } = contribution;

  function renderBadges({ withTooltip, asLink }: { withTooltip: boolean; asLink: boolean }) {
    switch (type) {
      case GithubContributionType.Issue: {
        const { closedByPullRequests } = githubIssue ?? {};

        if (closedByPullRequests?.length) {
          return (
            <>
              {closedByPullRequests.map(({ githubPullRequest }) => {
                const { id, number, status, title, author, htmlUrl, draft } = githubPullRequest ?? {};

                return (
                  <ContributionBadge
                    key={id}
                    id={id}
                    number={number}
                    type={GithubContributionType.PullRequest}
                    status={draft ? GithubPullRequestDraft.Draft : (status as GithubItemStatus)}
                    title={title ?? ""}
                    author={author as GithubUser}
                    url={htmlUrl ?? ""}
                    withTooltip={withTooltip}
                    asLink={asLink}
                    tooltipProps={tooltipProps}
                  />
                );
              })}
            </>
          );
        }

        return null;
      }

      case GithubContributionType.PullRequest: {
        const { closingIssues, codeReviews } = githubPullRequest ?? {};

        if (closingIssues?.length || codeReviews?.length) {
          return (
            <>
              {closingIssues?.map(({ githubIssue }) => {
                const { id, number, status, title, author, htmlUrl } = githubIssue ?? {};

                return (
                  <ContributionBadge
                    key={id}
                    id={id}
                    number={number}
                    type={GithubContributionType.Issue}
                    status={status as GithubItemStatus}
                    title={title ?? ""}
                    url={htmlUrl ?? ""}
                    author={author as GithubUser}
                    withTooltip={withTooltip}
                    asLink={asLink}
                    tooltipProps={tooltipProps}
                  />
                );
              })}

              {codeReviews?.map(codeReview => {
                const { id, reviewer, status } = codeReview ?? {};
                const { number, title, htmlUrl } = githubPullRequest ?? {};

                return (
                  <ContributionBadge
                    key={id}
                    id={id ?? ""}
                    number={number}
                    type={GithubContributionType.CodeReview}
                    status={status as GithubItemStatus}
                    title={title ?? ""}
                    url={htmlUrl ?? ""}
                    author={reviewer as GithubUser}
                    withTooltip={withTooltip}
                    asLink={asLink}
                    tooltipProps={tooltipProps}
                  />
                );
              })}
            </>
          );
        }

        return null;
      }

      case GithubContributionType.CodeReview: {
        const { githubPullRequest } = githubCodeReview ?? {};

        if (githubPullRequest) {
          const { id, number, status, draft, author, title, htmlUrl } = githubPullRequest;

          return (
            <ContributionBadge
              id={id}
              number={number}
              type={GithubContributionType.PullRequest}
              status={draft ? GithubPullRequestDraft.Draft : (status as GithubItemStatus)}
              title={title ?? ""}
              author={author as GithubUser}
              url={htmlUrl ?? ""}
              withTooltip={withTooltip}
              asLink={asLink}
              tooltipProps={tooltipProps}
            />
          );
        }

        return null;
      }
    }

    return null;
  }

  const nbLinkedContributions = getNbLinkedContributions(contribution);

  if (nbLinkedContributions > 3) {
    const tooltipId = `${id}-linked-tooltip`;
    return (
      <>
        <Tooltip id={tooltipId} clickable {...tooltipProps}>
          <div className="flex items-center gap-1">{renderBadges({ withTooltip: false, asLink: true })}</div>
        </Tooltip>
        <div
          data-tooltip-id={tooltipId}
          className="flex items-center gap-1 rounded-full border-0.5 border-spaceBlue-400 px-1 py-0.5 text-spaceBlue-200"
        >
          <StackLine className="text-base leading-none" />
          <span className="text-sm leading-none">{nbLinkedContributions}</span>
        </div>
      </>
    );
  }

  return renderBadges({ withTooltip, asLink });
}
