import { Card } from "components/ds/card/card";

import { TProfileCard } from "./profile-card.types";

export function ProfileCard(_: TProfileCard.Props) {
  return (
    <Card className="flex h-[431px] w-full flex-col items-start justify-start gap-10" background="base">
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">PROFILE CARDS</div>
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">SUMMARY</div>
      </div>
      <div className="flex w-full flex-row items-start justify-between gap-2">
        <div className="flex h-[176px] flex-1 items-center justify-center bg-card-background-heavy">
          MOST ACTIVE LANGUAGE
        </div>
        <div className="flex h-[176px] w-1/3 items-center justify-center bg-card-background-heavy">
          MOST ACTIVE ECOSYSTEM
        </div>
      </div>
    </Card>
  );
}
