import { useParams } from "next/navigation";

import { SettingsHeader } from "app/settings/components/settings-header/settings-header";

import { MeTypes } from "src/api/me/types";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

export function BillingHeader() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id, enabledPooling: false });

  const headerArgsBis = {
    [MeTypes.billingProfileType.Individual]: {
      icon: "ri-user-line" as RemixIconsName,
      tokenTitle: "v2.pages.settings.billing.header.individual.title",
      subtitle: "v2.pages.settings.billing.header.individual.subtitle",
    },
    [MeTypes.billingProfileType.SelfEmployed]: {
      icon: "ri-suitcase-line" as RemixIconsName,
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.selfEmployed.subtitle",
    },
    [MeTypes.billingProfileType.Company]: {
      icon: "ri-vip-crown-line" as RemixIconsName,
      title: profile?.data?.name,
      subtitle: "v2.pages.settings.billing.header.company.subtitle",
    },
  };

  return <SettingsHeader {...headerArgsBis[profile?.data?.type ?? MeTypes.billingProfileType.Individual]} />;
}
