import { useMemo } from "react";

import { useBillingButton } from "app/migration/settings/billing/hooks/useBillingButton";

import { Banner } from "components/ds/banner/banner";
import { TBanner } from "components/ds/banner/banner.types";
import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";

import { useBillingStatus } from "hooks/users/useBillingStatus/useBillingStatus";

import { TProfileBanner } from "./profile-banner.types";

export function ProfileBanner({
  children,
  hasValidBillingProfile,
  status,
  type,
  id,
  reviewMessage,
}: TProfileBanner.Props) {
  const { statusMapping, isWarning, isError, isSuccess, isRainbow } = useBillingStatus({
    status,
    hasValidBillingProfile,
  });

  const button = useBillingButton({ status, id, type });

  const bannerVariant: TBanner.Variants["variant"] = useMemo(() => {
    if (isError) {
      return "red";
    }

    if (isWarning) {
      return "orange";
    }

    if (isRainbow) {
      return "rainbow";
    }

    return "medium";
  }, [isWarning, isError, isSuccess, isRainbow]);

  if (!statusMapping) {
    return null;
  }

  return (
    <Banner
      title={<Translate token={`v2.pages.settings.billing.status.descriptions.${status}`} />}
      description={reviewMessage ? <div className="whitespace-pre-wrap">{reviewMessage}</div> : undefined}
      size="s"
      customButton={
        button?.element
          ? button.element(
              <Button size={"s"}>
                <Translate token={button?.label} />
              </Button>
            )
          : undefined
      }
      button={
        button && !button.element
          ? {
              children: <Translate token={button?.label} />,
              onClick: button?.onClick,
            }
          : undefined
      }
      variant={bannerVariant}
      classNames={{
        wrapper: "max-sm:flex-col max-sm:justify-start max-sm:items-start",
      }}
    >
      {children}
    </Banner>
  );
}
