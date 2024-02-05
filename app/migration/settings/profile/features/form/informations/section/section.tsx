import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TFormInformationsSection } from "./section.types";

export function FormInformationsSection({ title, children, isLast }: TFormInformationsSection.Props) {
  return (
    <>
      <Flex direction="col" className="gap-2">
        <Typography variant="title-s" translate={{ token: title }} />
        {children}
      </Flex>

      {!isLast && <span className="my-4 block h-px bg-greyscale-50/8" />}
    </>
  );
}
