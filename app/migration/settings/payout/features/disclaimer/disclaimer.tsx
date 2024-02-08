import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function PayoutDisclaimer() {
  return (
    <Flex as="article" direction="col" alignItems="center" className="gap-4 p-4">
      <Icon remixName="ri-lock-fill" size={20} className="rounded-lg bg-white/8 p-2 text-greyscale-400" />

      <Typography
        variant="body-s"
        translate={{ token: "v2.pages.settings.payout.disclaimer" }}
        className="whitespace-break-spaces text-center text-spaceBlue-200"
      />
    </Flex>
  );
}
