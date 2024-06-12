import Image from "next/image";

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export function RewardsEmpty() {
  const { T } = useIntl();

  return (
    <Card
      className={cn(
        "flex h-full gap-4",
        "relative z-[1] w-full border-none bg-gradient-to-r from-[#422074] via-[#28115E] to-[#1C0E73]",
        "border-mask via-10% before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:h-full before:w-full before:rounded-2xl before:bg-gradient-to-r before:from-[#A390B3] before:via-[#8E7AA1] before:to-[#3B2A53]"
      )}
    >
      <div className="flex flex-1 flex-col gap-4">
        <Typography translate={{ token: "v2.pages.home.rewards.emptyState.title" }} variant="title-m" />
        <Typography translate={{ token: "v2.pages.home.rewards.emptyState.subtitle" }} variant="body-s-bold" />
        <Button size="s" as="a" href={NEXT_ROUTER.projects.all}>
          <Icon remixName="ri-sparkling-line" size={16} />
          <Typography translate={{ token: "v2.pages.home.rewards.emptyState.action" }} variant="body-s-bold" />
        </Button>
      </div>
      <Image
        src={IMAGES.global.payment}
        width={120}
        height={120}
        alt={T("emptyStatePictureFallback")}
        className={"hidden sm:block"}
      />
    </Card>
  );
}
