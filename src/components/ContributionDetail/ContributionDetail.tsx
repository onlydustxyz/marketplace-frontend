import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import ProjectApi from "src/api/Project";
import { ContributionBadge, ContributionBadgeSizes } from "src/components/Contribution/ContributionBadge";
import { ContributionIcon } from "src/components/Contribution/ContributionIcon";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { RewardCard } from "src/components/ContributionDetail/RewardCard";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { TooltipPosition, Variant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { useRewardDetailPanel } from "src/hooks/useRewardDetailPanel";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import DiscussLine from "src/icons/DiscussLine";
import Medal2Fill from "src/icons/Medal2Fill";
import TimeLine from "src/icons/TimeLine";
import type { GithubContributionType } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getGithubStatusToken } from "src/utils/getGithubStatusToken";
import { ContributionDetailSkeleton } from "./ContributionDetailSkeleton";

export function ContributionDetail({ contributionId, projectId }: { contributionId: string; projectId: string }) {
  const { T } = useIntl();
  const { open: openRewardPanel } = useRewardDetailPanel();

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
                    <Link
                      to={generatePath(RoutePaths.ProjectDetails, {
                        projectKey: contribution.project.slug,
                      })}
                      className="text-spacePurple-400 hover:text-spacePurple-300"
                      target="_blank"
                    >
                      {contribution.project.name}
                    </Link>
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
                    />
                    <span>
                      {T(getGithubStatusToken(contribution.type as GithubContributionType, contribution.githubStatus), {
                        date: displayRelativeDate(contribution?.completedAt ?? ""),
                      })}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                    <div className="flex items-center gap-1">
                      <DiscussLine className="text-base leading-none" />
                      {T("comments", { count: contribution.commentsCount })}
                    </div>
                    {contribution.links.length ? (
                      <>
                        <div>|</div>
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
                        />
                      </>
                    ) : null}
                  </div>
                </div>
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
                          openRewardPanel({ rewardId: reward.id, isMine: true });
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

  return <div className="h-full px-6 py-8">{renderContent()}</div>;
}
