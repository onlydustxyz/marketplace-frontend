"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { ManageCoworker } from "app/(v1)/settings/billing/[id]/coworkers/features/manage-coworker/manage-coworker";
import { TManageCoworker } from "app/(v1)/settings/billing/[id]/coworkers/features/manage-coworker/manage-coworker.types";
import { withBillingProfileAdminGuard } from "app/(v1)/settings/components/billing-profile-admln-guard/billing-profile-admln-guard";
import { withBillingProfileCompanyGuard } from "app/(v1)/settings/components/billing-profile-company-guard copy/billing-profile-company-guard";

import { useStackBillingInviteTeamMember } from "src/App/Stacks/Stacks";
import BillingProfilesApi from "src/api/BillingProfiles";
import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";

import { Banner } from "components/ds/banner/banner";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { Contributor } from "components/features/contributor/contributor";
import { RolesSelector } from "components/features/roles/role-selector/roles-selector";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

function CoworkersPage() {
  const { T } = useIntl();
  const [openStackBillingInviteTeamMember] = useStackBillingInviteTeamMember();
  const { githubUserId: meGithubUserId } = useCurrentUser();

  const { id: billingProfileId } = useParams<{ id: string }>();
  const {
    data: coworkersData,
    // TODO handle loading and error
    // isLoading: isLoadingCoworkers,
    // isError: isErrorCoworkers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfilesApi.queries.useGetBillingProfileCoworkers({
    params: { billingProfileId },
  });
  const coworkers = coworkersData?.pages?.flatMap(data => data.coworkers);

  function handleClick() {
    openStackBillingInviteTeamMember();
  }

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "coworkers",
        children: <Translate token={"v2.pages.settings.billing.coworkers.table.columns.coworkers"} />,
        icon: {
          remixName: "ri-team-line",
        },
      },
      {
        key: "role",
        children: <Translate token={"v2.pages.settings.billing.coworkers.table.columns.role"} />,
        icon: {
          remixName: "ri-information-line",
        },
      },
      {
        key: "joined",
        children: <Translate token={"v2.pages.settings.billing.coworkers.table.columns.joined"} />,
        icon: {
          remixName: "ri-check-line",
        },
      },
      {
        key: "actions",
        children: "",
        align: "end",
        showOnHover: true,
      },
    ],
    []
  );

  const rows: TTable.Row[] = useMemo(
    () =>
      (coworkers || []).map(row => {
        const { id, githubUserId, login, avatarUrl, role, joinedAt, removable: canRemove, isRegistered } = row;
        const isYou = githubUserId === meGithubUserId;
        const hasPendingInvite = !joinedAt;
        const actionType = (): TManageCoworker.ActionTypeUnion => {
          if (hasPendingInvite && canRemove) {
            return "cancel";
          }
          if (!hasPendingInvite && canRemove) {
            return "delete";
          }
          return "none";
        };

        const canManageCoworker = actionType() !== "none" && !isYou;
        return {
          key: id ?? "",
          coworkers: (
            <Contributor
              githubUserId={githubUserId}
              login={login}
              avatarUrl={avatarUrl}
              isRegistered={isRegistered}
              clickable
              isYou={isYou}
              hasPendingInvite={hasPendingInvite}
            />
          ),
          role: <RolesSelector activeRole={role} githubUserId={githubUserId} isYou={isYou} />,
          joined: joinedAt
            ? formatDistance(new Date(joinedAt), new Date(), {
                addSuffix: true,
              })
            : "-",
          actions: canManageCoworker ? (
            <div className="flex justify-end">
              <ManageCoworker actionType={actionType()} githubUserId={githubUserId} />
            </div>
          ) : null,
        };
      }),
    [coworkers]
  );

  return (
    <Flex direction="col" className="gap-4">
      <Banner
        title={<Translate token="v2.pages.settings.billing.coworkers.banner.title" />}
        size="s"
        button={{
          children: (
            <>
              <Icon remixName="ri-pencil-line" />
              <Translate token="v2.pages.settings.billing.coworkers.banner.button" />
            </>
          ),
          onClick: handleClick,
        }}
        classNames={{
          wrapper: "max-sm:flex-col max-sm:justify-start max-sm:items-start",
        }}
      />

      <Table
        label={T("v2.pages.settings.billing.coworkers.table.label")}
        columns={columns}
        rows={rows}
        bottomContent={
          hasNextPage ? (
            <div className="pb-4">
              <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
            </div>
          ) : null
        }
        EmptyProps={{
          illustrationSrc: IMAGES.global.categories,
          title: { token: "v2.pages.settings.billing.coworkers.table.emptyState.title" },
          description: { token: "v2.pages.settings.billing.coworkers.table.emptyState.description" },
        }}
      />
    </Flex>
  );
}

export default withClientOnly(
  withAuthenticationRequired(withBillingProfileAdminGuard(withBillingProfileCompanyGuard(CoworkersPage)))
);
