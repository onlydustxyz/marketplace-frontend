import { Icon } from "components/layout/icon/icon";

import { TContributorsCounter } from "./contributors-counter.types";
import { Typography } from "components/layout/typography/typography";

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
        translate={{ token: "project.details.contributors.count", params: { count } }}
      />
    </div>
  );
}
