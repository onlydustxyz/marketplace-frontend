import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TSection } from "./section.types";

export function Section({ title, remixIconName, children }: TSection.Props) {
  return (
    <Flex direction="col" className="gap-2 px-6 py-4">
      <Flex alignItems="center" className="gap-1">
        <Icon remixName={remixIconName} size={20} className="text-spaceBlue-200" />
        <Typography variant="special-label" translate={title} className="uppercase text-spaceBlue-200" />
      </Flex>

      {children}
    </Flex>
  );
}
