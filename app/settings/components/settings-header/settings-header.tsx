import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TSettingsHeader } from "./settings-header.types";

export function SettingsHeader({
  icon,
  tokenTitle,
  title,
  subtitle,
  children,
  individualLimit,
}: TSettingsHeader.Props) {
  return (
    <Card background="base">
      <div className="grid gap-4 lg:grid-cols-3 lg:items-center">
        <Flex direction="col" className={cn("gap-2", { "lg:col-span-2": children })}>
          <Flex alignItems="center" className="gap-2">
            {icon ? <Icon remixName={icon} size={24} /> : null}
            {tokenTitle ? (
              <Typography variant="title-m" translate={{ token: tokenTitle }} />
            ) : (
              <Typography variant="title-m">{title}</Typography>
            )}
          </Flex>

          {subtitle ? (
            <Typography
              variant="body-s"
              translate={{ token: subtitle, params: { count: individualLimit || 0 } }}
              className="text-spaceBlue-200"
            />
          ) : null}
        </Flex>

        {children ? <div>{children}</div> : null}
      </div>
    </Card>
  );
}
