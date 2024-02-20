import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { THiringTag } from "./hiring-tag.types";

export function HiringTag({ isErrorVariant, isHiring = false }: THiringTag.Props) {
  return isHiring ? (
    <header className="absolute -top-3.5 right-3.5">
      <Tag size="small" borderColor={isErrorVariant ? "orange" : undefined} className="bg-spaceBlue-900">
        <Icon remixName="ri-record-circle-line" size={12} />
        <Typography variant="body-xs">
          <Translate token="project.hiring" />
        </Typography>
      </Tag>
    </header>
  ) : null;
}
