import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TContributorsCounter } from "./contributors-counter.types";

export function ContributorsCounter({ count }: TContributorsCounter.Props) {
  if (!count) {
    return null;
  }

  return (
    <Tag size="small">
      <Icon remixName="ri-user-3-line" size={12} />
      <Translate token="project.details.contributors.count" params={{ count }} />
    </Tag>
  );
}
