import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TApplyCallout } from "./apply-callout.types";
import { ApplyGlobalSection } from "./clients/global-section/global-section";

// TODO: Refacto ContactInformations
export function ApplyCallout({ icon, title, description, ...props }: TApplyCallout.Props) {
  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-3 p-4">
        <Flex alignItems="center" className="gap-1">
          <Icon {...icon} className="text-spaceBlue-200" />

          <Typography variant="special-label" translate={{ token: title }} className="uppercase text-spaceBlue-200" />
        </Flex>

        <ApplyGlobalSection {...props} />

        {description ? (
          <Typography variant="body-s" className="text-spaceBlue-200">
            <Translate token={description} />
          </Typography>
        ) : null}
      </Flex>
    </Card>
  );
}
