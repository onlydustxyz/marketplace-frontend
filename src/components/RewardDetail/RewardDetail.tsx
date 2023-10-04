import { GithubUser, useGetContributionRewardsQuery } from "src/__generated/graphql";
import { SpinningLogo } from "src/components/Loader/SpinningLogo";
import { useIntl } from "src/hooks/useIntl";

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

    return (
      <div>
        <div className="flex flex-col gap-8">
          <h5 className="font-belwe text-2xl">{T("rewards.panel.title")}</h5>
          <div>Content</div>
        </div>
      </div>
    );
  }

  return <div className="h-full px-6 py-8">{renderContent()}</div>;
}
