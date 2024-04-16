import { Key } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

type Props = {
  titleKey: Key;
  remixIconName: RemixIconsName;
};

export default function SectionTitle({ titleKey, remixIconName }: Props) {
  return (
    <Flex alignItems="center" className="gap-2 px-6 py-4">
      <Icon remixName={remixIconName} size={20} />
      <Typography variant="body-m-bold" translate={{ token: titleKey }} />
    </Flex>
  );
}
