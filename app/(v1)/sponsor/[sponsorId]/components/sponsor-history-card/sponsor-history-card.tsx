import { format } from "date-fns";
import { Money } from "utils/Money/Money";

import { TSponsorHistoryCard } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-card/sponsor-history-card.types";
import { SponsorHistoryTransaction } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-transaction/sponsor-history-transaction";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorHistoryCard({ date, type, amount, project }: TSponsorHistoryCard.Props) {
  return (
    <Card background={"base"} className={"grid grid-cols-2 gap-x-3 gap-y-4"}>
      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.date" />
        </Typography>
        <Typography variant={"body-s"}>{format(new Date(date), "MMM dd, yyyy")}</Typography>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.transaction" />
        </Typography>
        <Typography variant={"body-s"}>
          <SponsorHistoryTransaction type={type} />
        </Typography>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.amount" />
        </Typography>
        <Avatar.Labelled avatarProps={{ src: amount.currency.logoUrl, alt: amount.currency.name, size: "xs" }}>
          <Typography variant={"body-s"}>
            {
              Money.format({
                amount: amount.prettyAmount,
                currency: amount.currency,
              }).string
            }
          </Typography>
        </Avatar.Labelled>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.project" />
        </Typography>
        {project ? (
          <Avatar.Labelled
            avatarProps={{ src: project.logoUrl, alt: project.name, size: "s", shape: "square" }}
            labelProps={{ title: project.name }}
          >
            <Typography variant={"body-s"} className={"truncate"}>
              {project.name}
            </Typography>
          </Avatar.Labelled>
        ) : (
          "-"
        )}
      </div>
    </Card>
  );
}

SponsorHistoryCard.Skeleton = function SponsorHistoryCardSkeleton() {
  return <SkeletonEl width="100%" height="156px" variant="rounded" />;
};
