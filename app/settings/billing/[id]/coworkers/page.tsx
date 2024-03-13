"use client";

import { format } from "date-fns";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

import { useStackBillingInviteTeamMember } from "src/App/Stacks/Stacks";
import BillingProfilesApi from "src/api/BillingProfiles";
import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";

import { Banner } from "components/ds/banner/banner";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

function CoworkersPage() {
  const { T } = useIntl();
  const [openStackBillingInviteTeamMember] = useStackBillingInviteTeamMember();

  const { id } = useParams<{ id: string }>();
  const {
    data: coworkersData,
    isLoading: isLoadingCoworkers,
    isError: isErrorCoworkers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = BillingProfilesApi.queries.useGetBillingProfileCoworkers({
    params: { billingProfileId: id },
  });

  const coworkers = coworkersData?.pages?.flatMap(data => data.coworkers);
  const hasCoworkers = coworkers?.length;
  console.log("data", coworkers);

  function handleClick() {
    openStackBillingInviteTeamMember();
  }

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "coworkers",
        label: T("v2.pages.settings.billing.coworkers.table.columns.coworkers"),
        icon: {
          remixName: "ri-team-line",
        },
      },
      {
        key: "role",
        label: T("v2.pages.settings.billing.coworkers.table.columns.role"),
        icon: {
          remixName: "ri-information-line",
        },
      },
      {
        key: "joined",
        label: T("v2.pages.settings.billing.coworkers.table.columns.joined"),
        icon: {
          remixName: "ri-check-line",
        },
      },
      {
        key: "actions",
        label: "",
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

        return {
          key: id,
          coworkers: (
            <Contributor
              githubUserId={githubUserId}
              login={login}
              avatarUrl={avatarUrl}
              isRegistered={isRegistered}
              clickable
            />
          ),
          role,
          joined: joinedAt ? format(new Date(joinedAt), "dd/MM/yyyy") : "-",
          actions: (
            <Icon
              remixName="ri-pencil-line"
              onClick={() => {
                console.log("edit", row);
              }}
            />
          ),
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
          title: { token: "v2.pages.settings.billing.coworkers.table.emptyPlaceholderTitle" },
          description: { token: "v2.pages.settings.billing.coworkers.table.emptyPlaceholderDescription" },
        }}
      />
    </Flex>
  );
}

export default CoworkersPage;
