"use client";

import React from "react";

import { useStackBillingInviteTeamMember } from "src/App/Stacks/Stacks";
import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";

import { Banner } from "components/ds/banner/banner";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";

function CoworkersPage() {
  const { T } = useIntl();
  const [openStackBillingInviteTeamMember] = useStackBillingInviteTeamMember();

  function handleClick() {
    openStackBillingInviteTeamMember();
  }

  // TODO: Change with data
  const hasCoworkers = true;

  const columns: TTable.Column[] = [
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
  ];

  const rows: TTable.Row[] = [
    {
      key: "1",
      coworkers: "John Doe",
      role: "Admin",
      joined: "01/01/2021",
      actions: <Icon remixName="ri-more-line" />,
    },
    {
      key: "2",
      coworkers: "John Doe",
      role: "Admin",
      joined: "01/01/2021",
      actions: <Icon remixName="ri-more-line" />,
    },
  ];

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

      {hasCoworkers ? <Table columns={columns} rows={rows} /> : <EmptyState illustrationSrc={IMAGES.logo.crashed} />}
    </Flex>
  );
}

export default CoworkersPage;
