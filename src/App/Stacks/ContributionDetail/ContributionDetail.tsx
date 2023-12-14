import { Fragment } from "react";
import { useMatch } from "react-router-dom";
import { RoutePaths } from "src/App";
import ProjectApi from "src/api/Project";
import { ContributionBadge, ContributionBadgeSizes } from "src/components/Contribution/ContributionBadge";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { RewardCard } from "src/App/Stacks/ContributionDetail/RewardCard";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import Tooltip, { TooltipPosition, Variant } from "src/components/Tooltip";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import DiscussLine from "src/icons/DiscussLine";
import GitCommitLine from "src/icons/GitCommitLine";
import Medal2Fill from "src/icons/Medal2Fill";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, GithubContributionType } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getGithubStatusToken } from "src/utils/getGithubStatusToken";
import { CommitsTooltip } from "../../../components/GithubCard/GithubPullRequest/CommitsTooltip";
import { ContributionDetailSkeleton } from "./ContributionDetailSkeleton";
import { useStackProjectOverview, useStackReward } from "src/App/Stacks/Stacks";

export function ContributionDetail({ contributionId, projectId }: { contributionId: string; projectId: string }) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const [openRewardPanel] = useStackReward();
  const [openProjectOverview] = useStackProjectOverview();
  const isMyContribution = Boolean(useMatch(`${RoutePaths.Contributions}/*`));

  const {
    data: contribution,
    isLoading,
    isError,
  } = ProjectApi.queries.useGetProjectContributionDetail({
    params: { projectId, contributionId },
  });

  function renderContent() {
    if (isLoading) {
      return (
        <div className="absolute inset-0">
          <ContributionDetailSkeleton />;
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("contributions.panel.error")}</p>
        </div>
      );
    }

    if (!contribution) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("contributions.panel.empty")}</p>
        </div>
      );
    }

    function renderContributionInfo() {
      if (!contribution) return null;

      const { commentsCount, commitsCount, contributor, githubAuthor, id, links, type, userCommitsCount } =
        contribution;

      const infos: JSX.Element[] = [];

      if (type === GithubContributionType.PullRequest && commitsCount && userCommitsCount) {
        const tooltipId = `contribution-detail-${id}`;

        infos.push(
          <>
            <div id={tooltipId} className="flex items-center gap-1">
              <GitCommitLine className="text-base leading-none" />
              {`${userCommitsCount}/${commitsCount} ${T("common.commits").toLowerCase()}`}
            </div>

            <Tooltip anchorId={tooltipId} clickable>
              <CommitsTooltip
                pullRequest={{
                  author: {
                    login: githubAuthor.login,
                    avatarUrl: githubAuthor.avatarUrl,
                    id: githubAuthor.githubUserId,
                    htmlUrl: githubAuthor.htmlUrl,
                    user: null,
                  },
                }}
                userCommits={userCommitsCount}
                commitsCount={commitsCount}
                contributorLogin={contributor.login}
              />
            </Tooltip>
          </>
        );
      }

      if (type === GithubContributionType.Issue) {
        infos.push(
          <div className="flex items-center gap-1">
            <DiscussLine className="text-base leading-none" />
            {T("comments", { count: commentsCount })}
          </div>
        );
      }

      if (links.length) {
        infos.push(
          <>
            <div className="flex items-center gap-1">
              <ArrowRightUpLine className="text-base leading-none" />
              {T("contributions.panel.contribution.linkedTo")}
            </div>
            <ContributionLinked
              contribution={contribution}
              tooltipProps={{
                position: TooltipPosition.Bottom,
                variant: Variant.Default,
              }}
              showExternal={isMyContribution}
            />
          </>
        );
      }

      return (
        <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
          {infos.map((info, i) => {
            return (
              <Fragment key={i}>
                {i > 0 ? <div>|</div> : null}
                {info}
              </Fragment>
            );
          })}
        </div>
      );
    }

    return (
      <div className="h-full font-walsheim">
        <h5 className="font-belwe text-2xl">{T("contributions.panel.title")}</h5>

        <div className="flex h-full flex-col divide-y divide-greyscale-50/12">
          <div className="py-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <ContributionBadge contribution={contribution} size={ContributionBadgeSizes.Md} withTooltip={false} />
                </div>

                <h6 className="text-lg font-semibold">{contribution.githubTitle}</h6>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <RoundedImage
                    src={contribution.project.logoUrl}
                    alt={contribution.project.name}
                    size={ImageSize.Xxs}
                    useLogoFallback
                  />
                  <div className="text-sm text-greyscale-300">
                    {T("contributions.panel.contribution.forProject")}&nbsp;
                    {/* <Link
                      to={generatePath(RoutePaths.ProjectDetails, {
                        projectKey: contribution.project.slug,
                      })}
                      className="text-spacePurple-400 hover:text-spacePurple-300"
                      target="_blank"
                    >
                      {contribution.project.name}
                    </Link> */}
                    <button
                      onClick={() => openProjectOverview({ slug: contribution.project.slug })}
                      className="text-spacePurple-400 hover:text-spacePurple-300"
                    >
                      {contribution.project.name}
                    </button>
                    &nbsp;/&nbsp;{contribution.repo.name}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                  <div className="flex items-center gap-1">
                    <TimeLine className="text-base leading-none" />
                    <span>
                      {T("contributions.panel.contribution.createdOn", {
                        date: displayRelativeDate(contribution.createdAt),
                      })}
                    </span>
                  </div>
                  <div>|</div>
                  <div className="flex items-center gap-1">
                    <ContributionIcon
                      type={contribution.type as GithubContributionType}
                      status={contribution.githubStatus}
                      contributionStatus={contribution.status}
                    />
                    <span>
                      {T(getGithubStatusToken(contribution.type as GithubContributionType, contribution.githubStatus), {
                        date: displayRelativeDate(
                          (contribution.status === ContributionStatus.InProgress
                            ? contribution.createdAt
                            : contribution.completedAt) ?? new Date()
                        ),
                      })}
                    </span>
                  </div>
                </div>

                {renderContributionInfo()}
              </div>
            </div>
          </div>

          {contribution.rewards.length ? (
            <div className="flex flex-col gap-4 overflow-hidden py-8">
              <div className="flex items-center gap-2">
                <Medal2Fill className="text-xl leading-none text-orange-400" />
                <span className="font-belwe text-base leading-none">{T("contributions.panel.rewards.title")}</span>
              </div>

              <div className="flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                {contribution.rewards.map(reward => {
                  return (
                    <RewardCard
                      key={reward.id}
                      reward={reward}
                      onClick={() => {
                        if (reward.id) {
                          openRewardPanel({
                            rewardId: reward.id,
                            projectId: contribution.project.id,
                            ...(reward.to.githubUserId === githubUserId ? { isMine: true } : {}),
                          });
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return <div className="h-full px-6 py-8 pt-12 lg:pt-0">{renderContent()}</div>;
}
