import { useBillingStatus } from "app/migration/settings/billing/hooks/useBillingStatus";

import { useIntl } from "src/hooks/useIntl";

import { Banner } from "components/ds/banner/banner";

import { TProfileBanner } from "./profile-banner.types";

export function ProfileBanner({ children, hasValidBillingProfile, status }: TProfileBanner.Props) {
  const { T } = useIntl();
  const { statusMapping, isWarning, isError, isSuccess } = useBillingStatus(hasValidBillingProfile, status);

  if (!statusMapping) {
    return null;
  }

  return (
    <Banner
      title={T(`v2.pages.settings.billing.status.descriptions.${status}`)}
      // variant="multicolor"
    />
  );
}
