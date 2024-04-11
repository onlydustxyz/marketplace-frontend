import { TSponsorHistoryTransaction } from "app/sponsor/[sponsorId]/components/sponsor-history-transaction/sponsor-history-transaction.types";

import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

export function SponsorHistoryTransaction({ type }: TSponsorHistoryTransaction.Props) {
  const { T } = useIntl();

  const map: Record<typeof type, { className: string; icon: RemixIconsName; label: string }> = {
    deposit: {
      className: "border-github-green-light text-github-green-light",
      icon: "ri-arrow-left-down-line",
      label: T("v2.pages.sponsor.history.deposit"),
    },
    allocated: {
      className: "border-spacePurple-500 text-spacePurple-500",
      icon: "ri-arrow-right-up-line",
      label: T("v2.pages.sponsor.history.allocated"),
    },
    unallocated: {
      className: "border-github-red text-github-red",
      icon: "ri-arrow-left-line",
      label: T("v2.pages.sponsor.history.unallocated"),
    },
  };

  if (!map[type]) {
    return null;
  }

  const { className, icon, label } = map[type];

  return (
    <div className={cn("inline-flex gap-2 rounded-full border bg-card-background-light px-3 py-1.5", className)}>
      <Icon remixName={icon} />
      <Typography variant={"body-s"}>{label}</Typography>
    </div>
  );
}
