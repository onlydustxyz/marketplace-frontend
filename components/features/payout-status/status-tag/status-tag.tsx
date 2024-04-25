import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useCloseStack } from "src/libs/react-stack";
import { PaymentStatus } from "src/types";
import { compareDateToNow } from "src/utils/date";

import { Tag } from "components/ds/tag/tag";
import { BillingProfileTag } from "components/features/billing-profiles/billing-profile-tag/billing-profile-tag";
import { BillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector";
import { TBillingProfilesSelector } from "components/features/billing-profiles/billing-profiles-selector/billing-profiles-selector.types";
import { getStatusConfig } from "components/features/payout-status/status-config/status-config";
import { TStatusTag } from "components/features/payout-status/status-tag/status-tag.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";

export function StatusTag({
  status,
  projectId,
  billingProfileId,
  date,
  className,
  shouldRedirect = false,
}: TStatusTag.Props) {
  const router = useRouter();
  const closeRewardPanel = useCloseStack();
  const dateRelativeToNow = date ? compareDateToNow(date) : undefined;
  const { icon, labelToken, tooltipToken, tooltipParams, borderColor, iconClassName } = getStatusConfig({
    status,
    dateRelativeToNow,
    date,
  });

  const { profiles } = useBillingProfiles();

  const billingProfilesSelector: TBillingProfilesSelector.Data[] = useMemo(
    () =>
      profiles.map(profile => ({
        name: profile.data.name,
        icon: profile.data.enabled ? profile.icon : { remixName: "ri-forbid-2-line" },
        id: profile.data.id,
        enabled: profile.data.enabled,
        hasPendingInvitation: profile.data.pendingInvitationResponse || false,
      })),
    [profiles]
  );

  const additionalArgs = useMemo(() => {
    if (!billingProfileId || !shouldRedirect) return {};
    switch (status) {
      case PaymentStatus.PAYOUT_INFO_MISSING:
        return {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            closeRewardPanel();
            router.push(NEXT_ROUTER.settings.billing.paymentMethods(billingProfileId));
          },
        };
      case PaymentStatus.PENDING_VERIFICATION:
        return {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            closeRewardPanel();
            router.push(NEXT_ROUTER.settings.billing.generalInformation(billingProfileId));
          },
        };
      case PaymentStatus.PENDING_BILLING_PROFILE:
      case PaymentStatus.INDIVIDUAL_LIMIT_REACHED:
        return {
          onClick: (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            closeRewardPanel();
            router.push(NEXT_ROUTER.settings.payoutPreferences);
          },
        };
    }
    return {};
  }, [projectId, status]);

  const renderIcon = useMemo(() => {
    if (
      (status === PaymentStatus.PAYOUT_INFO_MISSING ||
        status === PaymentStatus.PENDING_VERIFICATION ||
        status === PaymentStatus.PENDING_BILLING_PROFILE ||
        status === PaymentStatus.INDIVIDUAL_LIMIT_REACHED) &&
      shouldRedirect
    ) {
      return <Icon remixName="ri-arrow-right-s-line" size={16} />;
    }
    return null;
  }, [status]);

  if (status === PaymentStatus.PENDING_BILLING_PROFILE) {
    return (
      <BillingProfilesSelector data={billingProfilesSelector} projectId={projectId}>
        <BillingProfileTag />
      </BillingProfilesSelector>
    );
  }

  return (
    <Tag
      size="medium"
      borderColor={borderColor}
      tooltipContent={<Translate token={tooltipToken} params={tooltipParams} />}
      className={className}
      {...additionalArgs}
    >
      <Icon remixName={icon} size={16} className={iconClassName} />
      <Typography variant="body-s">
        <Translate token={labelToken} />
      </Typography>
      {renderIcon}
    </Tag>
  );
}
