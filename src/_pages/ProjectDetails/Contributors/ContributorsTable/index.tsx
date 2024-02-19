import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useToggleContributor } from "src/_pages/ProjectDetails/Contributors/ContributorsTable/useToggleContributor";
import { ProjectContributorItem } from "src/api/Project/queries";
import { viewportConfig } from "src/config";

import { NEXT_ROUTER } from "constants/router";

import View from "./View";
import { ViewMobile } from "./ViewMobile";

type Props<C> = {
  contributors: C[];
  projectKey: string;
  projectId: string;
  rewardDisableReason?: ComponentProps<typeof View>["rewardDisableReason"];
} & Omit<ComponentProps<typeof View>, "contributors" | "onRewardGranted" | "onToggleContributor">;

export default function ContributorsTable<C extends ProjectContributorItem>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  projectKey,
  projectId,
  sorting,
  sortField,
  rewardDisableReason,
}: Props<C>) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const router = useRouter();
  const { onToggleContributor } = useToggleContributor({ projectId });

  const onRewardGranted = (contributor: C) => {
    router.push(
      NEXT_ROUTER.projects.details.rewards.new(projectKey) +
        `?recipientGithubLogin=${encodeURIComponent(contributor.login)}`
    );
  };

  return isXl ? (
    <View
      {...{
        contributors,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isProjectLeader,
        onRewardGranted,
        onToggleContributor,
        sorting,
        sortField,
        rewardDisableReason,
      }}
    />
  ) : (
    <ViewMobile
      {...{
        contributors,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isProjectLeader,
        onRewardGranted,
        onToggleContributor,
      }}
    />
  );
}
