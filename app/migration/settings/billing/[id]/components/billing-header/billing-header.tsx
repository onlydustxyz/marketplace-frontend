import { useParams } from "next/navigation";

import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

export function BillingHeader() {
  const { id } = useParams<{ id: string }>();
  const { profile } = useBillingProfileById({ id });

  if (!profile?.data) {
    return null;
  }

  return (
    <SettingsHeader
      title={profile.data.name}
      subtitle={`v2.pages.settings.billing.header.description.${profile.data.type}`}
      icon={profile.icon.remixName}
    />
  );
}
