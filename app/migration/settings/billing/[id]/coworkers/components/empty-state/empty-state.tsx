import Image from "next/image";

import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

export function EmptyState() {
  const { T } = useIntl();

  return (
    <Flex direction="col" alignItems="center" justifyContent="center" className="gap-4 px-4 py-6">
      <Image
        src={IMAGES.global.categories}
        width={80}
        height={80}
        alt={T("v2.pages.settings.billing.coworkers.empty.imageAlt")}
      />

      <Flex direction="col" alignItems="center" justifyContent="center" className="gap-1">
        <Typography variant="title-m" translate={{ token: "v2.pages.settings.billing.coworkers.empty.title" }} />

        <Typography
          variant="body-s"
          translate={{ token: "v2.pages.settings.billing.coworkers.empty.description" }}
          className="text-spaceBlue-200"
        />
      </Flex>
    </Flex>
  );
}
