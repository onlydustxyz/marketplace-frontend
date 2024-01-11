import { buildLanguageString } from "src/utils/languages";
import { Tag } from "components/ds/tag/tag";
import { getTopTechnologies } from "src/utils/technologies";
import { TTechnologies } from "./technologies.types";
import { Icon } from "components/layout/icon/icon";

export function Technologies({ technologies }: TTechnologies.Props) {
  const topTechnologies = technologies ? getTopTechnologies(technologies) : [];

  if (!topTechnologies?.length) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Tag size="large">
        <Icon remixName="ri-code-s-slash-line" size={20} />
        {buildLanguageString(topTechnologies)}
      </Tag>
    </div>
  );
}
