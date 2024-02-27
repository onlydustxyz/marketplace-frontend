"use client";

import React from "react";

import { useStackBillingInviteTeamMember } from "src/App/Stacks/Stacks";

import { Banner } from "components/ds/banner/banner";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { EmptyState } from "./components/empty-state/empty-state";

function CoworkersPage() {
  const [openStackBillingInviteTeamMember] = useStackBillingInviteTeamMember();

  function handleClick() {
    openStackBillingInviteTeamMember();
  }

  // TODO: Change with data
  const cowokers = [];

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

      {cowokers.length > 0 ? <div>List</div> : <EmptyState />}
    </Flex>
  );
}

export default CoworkersPage;
