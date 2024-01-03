import CodeSSlashLine from "../../../../../../src/icons/CodeSSlashLine.tsx";
import { buildLanguageString } from "../../../../../../src/utils/languages.ts";
import Tag from "@/components/ds/tag/tag.tsx";
import { getTopTechnologies } from "../../../../../../src/utils/technologies.ts";

type Props = {
  technologies: { [key: string]: number };
};
export default function Technologies({ technologies }: Props) {
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
