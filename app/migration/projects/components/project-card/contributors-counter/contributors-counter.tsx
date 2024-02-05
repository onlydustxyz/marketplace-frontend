import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TContributorsCounter } from "./contributors-counter.types";

export function ContributorsCounter({ count }: TContributorsCounter.Props) {
  if (!count) {
    return null;
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <Icon remixName="ri-user-3-line" size={16} />
      <Typography
        variant="body-s"
        className="truncate"
        translate={{ token: "v2.features.contributors.count", params: { count } }}
      />
    </div>
  );
}
