"use client";

import { useMemo } from "react";

import { useStackBillingCreate } from "src/App/Stacks/Stacks";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { MenuItem } from "components/layout/sidebar/menu-item/menu-item";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

import { TSidebarBilling } from "./sidebar-billing.types";

export function SidebarBilling({ closePanel }: TSidebarBilling.Props) {
  const { profiles, isLoading } = useBillingProfiles();
  const [openBillingCreate] = useStackBillingCreate();

  function handleCreateBillingProfile() {
    openBillingCreate({ redirectToProfile: true });
  }

  function getIconRemixName(profile: TSidebarBilling.profile) {
    if (!profile.data.enabled) {
      return "ri-forbid-2-line";
    }

    if (profile.data.role === "MEMBER") {
      return "ri-team-line";
    }

    // Add to use a defaut icon because of the types of Icon
    return profile.icon.remixName || "ri-team-line";
  }

  const menuItems: TMenuItem.Props[] = useMemo(
    () =>
      profiles.map(profile => ({
        label: profile.data.name,
        href: NEXT_ROUTER.settings.billing.generalInformation(profile.data.id),
        startIcon: <Icon remixName={getIconRemixName(profile)} size={16} />,
        matchPathOptions: { pattern: NEXT_ROUTER.settings.billing.root(profile.data.id) },
        pendingInvitationResponse: profile.data.pendingInvitationResponse,
        alerting: {
          warning: profile.data.missingVerification || profile.data.missingPayoutInfo,
          error: profile.data.verificationBlocked || profile.data.individualLimitReached,
        },
      })),

    [profiles]
  );

  const menuContent = useMemo(() => {
    if (isLoading) {
      return null;
    }

    if (menuItems.length) {
      return (
        <div className="align-start flex flex-col gap-4">
          {menuItems.map(menu => (
            <MenuItem
              {...menu}
              key={menu.href}
              onClick={closePanel}
              endIcon={
                menu.alerting?.warning || menu.alerting?.error ? (
                  <Icon
                    remixName={"ri-error-warning-line"}
                    className={cn("text-orange-500", { "text-github-red": menu.alerting?.error })}
                  />
                ) : undefined
              }
            />
          ))}
        </div>
      );
    }

    return (
      <Card background={false} border="medium" className="flex flex-col items-start justify-start gap-1">
        <Flex justifyContent="between" alignItems={"start"} className="gap-1">
          <Typography
            variant="title-s"
            className="text-greyscale-50"
            translate={{ token: "v2.pages.settings.billing.sidebar.items.billing.empty.title" }}
          />
          <Icon remixName="ri-corner-right-up-line" size={20} className="text-greyscale-50" />
        </Flex>
        <Typography
          variant="body-s"
          className="text-spaceBlue-200"
          translate={{ token: "v2.pages.settings.billing.sidebar.items.billing.empty.content" }}
        />
      </Card>
    );
  }, [menuItems]);

  return (
    <>
      <div className="flex flex-row items-center justify-between px-4">
        <div className="flex flex-row items-center justify-start gap-1">
          <p className="od-text-body-xs-bold uppercase text-greyscale-600">
            <Translate token="v2.pages.settings.billing.sidebar.items.billing.label" />
          </p>
          <Icon remixName="ri-information-line" size={16} className="text-greyscale-600" />
        </div>
        <Button iconOnly variant="secondary" size="xs" onClick={handleCreateBillingProfile}>
          <Icon remixName="ri-add-line" size={16} />
        </Button>
      </div>
      {menuContent}
    </>
  );
}
