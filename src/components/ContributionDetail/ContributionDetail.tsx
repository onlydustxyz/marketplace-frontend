import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { GithubUser, useGetContributionRewardsQuery } from "src/__generated/graphql";
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
import type { Reward } from "src/types";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getContributionInfo } from "src/utils/getContributionInfo";
import { getGithubStatusToken } from "src/utils/getGithubStatusToken";
import { getNbLinkedContributions } from "src/utils/getNbLinkedContributions";
import { ContributionDetailSkeleton } from "./ContributionDetailSkeleton";

export function ContributionDetail({
  githubUserId,
  contributionId,
}: {
  githubUserId: GithubUser["id"];
  contributionId: string;
}) {
  const { T } = useIntl();
  const { open: openRewardPanel } = useRewardDetailPanel();

  const { data, loading, error } = useGetContributionRewardsQuery({
    variables: { githubUserId, contributionId },
    skip: !githubUserId && !contributionId,
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  function renderContent() {
    if (loading) {
      return (
        <div className="absolute inset-0">
          <ContributionDetailSkeleton />;
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("contributions.panel.error")}</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("contributions.panel.empty")}</p>
        </div>
      );
    }

    const {
      contributions: [contribution],
    } = data;

    const { id, createdAt, closedAt, project, githubRepo, rewardItems } = contribution ?? {};

    const { number, type, status, title, author, htmlUrl, commentsCount } = getContributionInfo(contribution);

    const nbLinkedContributions = getNbLinkedContributions(contribution);

    return (
      <div className="h-full font-walsheim">
        <h5 className="font-belwe text-2xl">{T("contributions.panel.title")}</h5>

        <div className="flex h-full flex-col divide-y divide-greyscale-50/12">
          <div className="py-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <ContributionBadge
                    id={`reward-detail-${id}` ?? ""}
                    number={number}
                    type={type}
                    status={status}
                    title={title}
                    author={author}
                    url={htmlUrl}
                    size={ContributionBadgeSizes.Md}
                    withTooltip={false}
                  />
                </div>

                <h6 className="text-lg font-semibold">{title}</h6>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <RoundedImage src={project?.logoUrl ?? onlyDustLogo} alt={project?.name ?? ""} size={ImageSize.Xxs} />
                  <div className="text-sm text-greyscale-300">
                    {T("contributions.panel.contribution.forProject")}&nbsp;
                    <Link
                      to={generatePath(RoutePaths.ProjectDetails, {
                        projectKey: project?.key ?? "",
                      })}
                      className="text-spacePurple-400 hover:text-spacePurple-300"
                      target="_blank"
                    >
                      {project?.name}
                    </Link>
                    &nbsp;/&nbsp;{githubRepo?.name}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                  <div className="flex items-center gap-1">
                    <TimeLine className="text-base leading-none" />
                    <span>
                      {T("contributions.panel.contribution.createdOn", { date: displayRelativeDate(createdAt) })}
                    </span>
                  </div>
                  <div>|</div>
                  <div className="flex items-center gap-1">
                    <ContributionIcon type={type} status={status} />
                    <span>{T(getGithubStatusToken(type, status), { date: displayRelativeDate(closedAt) })}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                    <div className="flex items-center gap-1">
                      <DiscussLine className="text-base leading-none" />
                      {T("comments", { count: commentsCount })}
                    </div>
                    {nbLinkedContributions ? (
                      <>
                        <div>|</div>
                        <div className="flex items-center gap-1">
                          <ArrowRightUpLine className="text-base leading-none" />
                          {T("contributions.panel.contribution.linkedTo")}
                        </div>
                        <ContributionLinked
                          contribution={contribution}
                          tooltipProps={{
                            position: TooltipPosition.TopEnd,
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

          {rewardItems.length ? (
            <div className="flex flex-col gap-4 overflow-hidden py-8">
              <div className="flex items-center gap-2">
                <Medal2Fill className="text-xl leading-none text-orange-400" />
                <span className="font-belwe text-base leading-none">{T("contributions.panel.rewards.title")}</span>
              </div>

              <div className="flex flex-col gap-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
                {rewardItems.map(rewardItem => {
                  return (
                    <RewardCard
                      key={rewardItem.paymentId}
                      reward={rewardItem as Reward}
                      onClick={() => {
                        if (rewardItem.paymentId) {
                          openRewardPanel({
                            rewardId: rewardItem.paymentId,
                            recipientId: rewardItem.paymentRequest?.recipientId,
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

  return <div className="h-full px-6 py-8">{renderContent()}</div>;
}
