import { DotsStatus } from "app/u/[githubLogin]/components/dots-status/dots-status";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TMostActive } from "./most-active.types";

export function MostActive({ logoUrl, name, status }: TMostActive.Props) {
  return (
    <Card hasPadding={false} className="flex-1">
      <Flex direction="col" className="gap-4 px-3 py-4">
        <Flex alignItems="center" justifyContent="between" className="gap-2  max-[400px]:flex-wrap">
          <Flex alignItems="center" className="gap-2">
            {logoUrl ? <Avatar src={logoUrl} alt={name} size="s" isBordered={false} /> : null}

            <Typography variant="body-m-bold" className="line-clamp-1">
              {name}
            </Typography>
          </Flex>

          <DotsStatus status={status} />
        </Flex>
      </Flex>
    </Card>
  );
}
