import { Key } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { TIcon } from "components/layout/icon/icon.types";
import { Typography } from "components/layout/typography/typography";

type Props = {
  title: Key;
  icon: TIcon.Props;
};

export default function SectionTitle({ title, icon }: Props) {
  return (
    <Flex alignItems="center" className="gap-2 px-6 py-4">
      <Icon {...icon} size={20} />
      <Typography variant="body-m-bold" translate={{ token: title }} />
    </Flex>
  );
}
