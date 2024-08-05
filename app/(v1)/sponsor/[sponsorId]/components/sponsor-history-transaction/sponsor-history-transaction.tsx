import { TSponsorHistoryTransaction } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-transaction/sponsor-history-transaction.types";

import { cn } from "src/utils/cn";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function SponsorHistoryTransaction({ type }: TSponsorHistoryTransaction.Props) {
  const { T } = useIntl();

  const map: Record<typeof type, { className: string; icon: RemixIconsName; label: string }> = {
    DEPOSIT: {
      className: "border-github-green-light text-github-green-light",
      icon: "ri-download-2-line",
      label: T("v2.pages.sponsor.history.deposit"),
    },
    ALLOCATION: {
      className: "border-spacePurple-500 text-spacePurple-500",
      icon: "ri-arrow-right-double-line",
      label: T("v2.pages.sponsor.history.allocated"),
    },
    UNALLOCATION: {
      className: "border-github-grey text-github-grey",
      icon: "ri-arrow-left-double-line",
      label: T("v2.pages.sponsor.history.unallocated"),
    },
    WITHDRAWAL: {
      className: "border-github-red text-github-red",
      icon: "ri-upload-2-line",
      label: T("v2.pages.sponsor.history.withdrawal"),
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
