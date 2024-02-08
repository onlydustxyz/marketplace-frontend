import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TTechnologies } from "./technologies.types";

export function Technologies({ technologies }: TTechnologies.Props) {
  const topTechnologies = technologies ? getTopTechnologies(technologies) : [];

  if (!topTechnologies?.length) {
    return null;
  }

  return (
    <Typography variant="body-s" className="flex flex-row items-center gap-1 truncate">
      <Icon remixName="ri-code-s-slash-line" size={16} />
      {buildLanguageString(topTechnologies)}
    </Typography>
  );
}
