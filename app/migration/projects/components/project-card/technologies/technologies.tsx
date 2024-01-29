import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";

import { TTechnologies } from "./technologies.types";
import { Typography } from "components/layout/typography/typography";
import { Icon } from "components/layout/icon/icon";

export function Technologies({ technologies }: TTechnologies.Props) {
  const topTechnologies = technologies ? getTopTechnologies(technologies) : [];

  if (!topTechnologies?.length) {
    return null;
  }

  return (
    <Typography
      variant="body-s"
      className="flex flex-row items-center gap-1 truncate md:border-l-1 md:border-card-border-medium md:pl-4"
    >
      <Icon remixName="ri-code-s-slash-line" size={16} className="block md:hidden" />
      {buildLanguageString(topTechnologies)}
    </Typography>
  );
}
