import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TSettingsHeader } from "./settings-header.types";

export function SettingsHeader({ icon, tokenTitle, title, subtitle, children }: TSettingsHeader.Props) {
  return (
    <Card background="base">
      <Flex className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" className="gap-2">
            {icon ? <Icon remixName={icon} size={24} /> : null}
            {tokenTitle ? (
              <Typography variant="title-m" translate={{ token: tokenTitle }} />
            ) : (
              <Typography variant="title-m">{title}</Typography>
            )}
          </Flex>

          {subtitle ? (
            <Typography variant="body-s" translate={{ token: subtitle }} className="text-spaceBlue-200" />
          ) : null}
        </Flex>

        {children ? <div>{children}</div> : null}
      </Flex>
    </Card>
  );
}
