import { RewardReactQueryAdapter } from "core/application/react-query-adapter/reward";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { StackRoute } from "src/App/Stacks/Stacks";
import { AvailableConversion } from "src/components/Currency/AvailableConversion";

import { Avatar } from "components/ds/avatar/avatar";
import { TTable } from "components/ds/table/table.types";
import { PayoutStatus } from "components/features/payout-status/payout-status";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useMyRewardsTable() {
  const { T } = useIntl();
  const router = useRouter();

  // const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = meApiClient.queries.useGetMyRewards({
  //   queryParams: { status: "PENDING_REQUEST", direction: "DESC" },
  //   pagination: { pageSize: 3 },
  // });

  const { githubUserId } = useCurrentUser();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    RewardReactQueryAdapter.client.useGetRewards({
      queryParams: { pageSize: 3, recipientIds: [githubUserId], statuses: ["PENDING_REQUEST"] },
      options: { enabled: !!githubUserId },
    });

  const flattenRewards = data?.pages.flatMap(({ rewards }) => rewards) ?? [];

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "date",
        children: T("v2.pages.home.rewards.rewardsTable.columns.date"),
      },
      {
        key: "project",
        children: T("v2.pages.home.rewards.rewardsTable.columns.project"),
      },
      {
        key: "amount",
        children: T("v2.pages.home.rewards.rewardsTable.columns.amount"),
      },
      {
        key: "status",
        children: T("v2.pages.home.rewards.rewardsTable.columns.status"),
      },
    ],
    []
  );

  const rows: TTable.Row[] = useMemo(
    () =>
      flattenRewards.map(row => {
        const key = row?.id ?? "";
        const date = formatDistanceToNowStrict(new Date(row.requestedAt), { addSuffix: true });
        const project = (
          <Avatar.Labelled
            avatarProps={{ size: "xs", shape: "square", src: row.rewardedOnProjectLogoUrl }}
            labelProps={{
              className: "font-medium",
            }}
          >
            {row.rewardedOnProjectName}
          </Avatar.Labelled>
        );
        const amount = row?.amount.prettyAmount ? (
          <AvailableConversion
            tooltipId={`${row?.id}-contributors-earned-details`}
            totalAmount={row?.amount?.prettyAmount}
            currency={{
              currency: row?.amount?.currency,
              amount: row?.amount?.prettyAmount,
              dollar: row?.amount?.usdEquivalent,
            }}
            showDollarConversion={false}
          />
        ) : (
          "-"
        );
        const status = row?.status ? (
          <PayoutStatus
            status={row.status}
            dates={{ unlockDate: row?.unlockDate, processedAt: row?.processedAt }}
            projectId={row?.projectId}
            billingProfileId={row?.billingProfileId}
            shouldRedirect={true}
            rewardId={row.id}
            shouldOpenRequestPayment={true}
          />
        ) : null;

        return {
          key,
          date,
          project,
          amount,
          status,
        };
      }),
    [flattenRewards]
  );

  function onRowAction() {
    router.push(`${NEXT_ROUTER.rewards.all}?stack=${StackRoute.RequestPayments}`);
  }

  return {
    columns,
    rows,
    infiniteQuery: {
      isLoading,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    },
    onRowAction,
    rewards: flattenRewards,
  };
}
