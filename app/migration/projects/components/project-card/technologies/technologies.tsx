import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString } from "src/utils/languages";
import { Tag } from "components/ds/tag/tag";
import { getTopTechnologies } from "src/utils/technologies";
import { TTechnologies } from "./technologies.types";

export function Technologies({ technologies }: TTechnologies.Props) {
  const topTechnologies = technologies ? getTopTechnologies(technologies) : [];

  if (!topTechnologies?.length) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Tag size="large">
        <CodeSSlashLine className="text-xl" />
        {buildLanguageString(topTechnologies)}
      </Tag>
    </div>
  );
}
