import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import { GithubUser, useGetContributionRewardsQuery } from "src/__generated/graphql";
import { ContributionBadge, ContributionBadgeSizes } from "src/components/Contribution/ContributionBadge";
import { SpinningLogo } from "src/components/Loader/SpinningLogo";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import DiscussLine from "src/icons/DiscussLine";
import TimeLine from "src/icons/TimeLine";
import displayRelativeDate from "src/utils/displayRelativeDate";
import { getContributionInfo } from "src/utils/getContributionInfo";

export function RewardDetail({
  githubUserId,
  contributionId,
}: {
  githubUserId: GithubUser["id"];
  contributionId: string;
}) {
  const { T } = useIntl();

  const { data, loading, error } = useGetContributionRewardsQuery({
    variables: { githubUserId, contributionId },
    skip: !githubUserId && !contributionId,
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  console.log(data);

  function renderContent() {
    if (loading) {
      return (
        <div className="flex h-full items-center justify-center">
          <SpinningLogo />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("rewards.panel.error")}</p>
        </div>
      );
    }

    if (!data) {
      return (
        <div className="flex h-full items-center justify-center">
          <p>{T("rewards.panel.empty")}</p>
        </div>
      );
    }

    const {
      contributions: [contribution],
    } = data;

    const { createdAt, project, githubRepo } = contribution ?? {};

    const { number, type, status, title, author, htmlUrl, commentsCount } = getContributionInfo(contribution);

    return (
      <div className="font-walsheim">
        <div className="flex flex-col gap-8">
          <h5 className="font-belwe text-2xl">{T("rewards.panel.title")}</h5>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div>
                <ContributionBadge
                  id={contribution?.id ?? ""}
                  number={number}
                  type={type}
                  status={status}
                  title={title}
                  author={author}
                  url={htmlUrl}
                  size={ContributionBadgeSizes.Md}
                />
              </div>

              <h6 className="text-lg font-semibold">{title}</h6>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <RoundedImage src={project?.logoUrl ?? onlyDustLogo} alt={project?.name ?? ""} size={ImageSize.Xxs} />
                <div className="text-sm text-greyscale-300">
                  {T("rewards.panel.contributionFor")}&nbsp;
                  <Link
                    to={generatePath(RoutePaths.ProjectDetails, {
                      projectKey: project?.key ?? "",
                    })}
                    className="text-spacePurple-400 hover:text-spacePurple-300"
                  >
                    {project?.name}
                  </Link>
                  &nbsp;/&nbsp;{githubRepo?.name}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                <div className="flex items-center gap-1">
                  <TimeLine className="text-base leading-none" />
                  <span>{T("rewards.panel.contributionCreated", { date: displayRelativeDate(createdAt) })}</span>
                </div>
                <div>|</div>
                {/* TODO */}
                <div>Merged</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm leading-none text-greyscale-300">
                  <div className="flex items-center gap-1">
                    <DiscussLine className="text-base leading-none" />
                    {T("comments", { count: commentsCount })}
                  </div>
                  <div>|</div>
                  {/* TODO */}
                  <div>Linked to</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="h-full px-6 py-8">{renderContent()}</div>;
}
