import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TFormInformationsSection } from "./section.types";

export function FormInformationsSection({ title, children }: TFormInformationsSection.Props) {
  return (
    <Flex direction="col" className="flex-1 gap-2">
      <Typography variant="title-s" translate={{ token: title }} />

      {children}
    </Flex>
  );
}
