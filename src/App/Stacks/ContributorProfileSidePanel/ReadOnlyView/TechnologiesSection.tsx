import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import { Technologies, getFilteredTechnologies } from "src/utils/technologies";

import { Section } from "./Section";

type Props = {
  technologies: Technologies;
};

export default function TechnologiesSection({ technologies }: Props) {
  const { T } = useIntl();

  const { filteredTechArray: filteredTechnologies } = getFilteredTechnologies(technologies);

  return (
    <Section title={T("profile.sections.technologies.title")}>
      <div className="flex flex-wrap gap-2">
        {filteredTechnologies.map((technology, index) => (
          <Tag key={index} size={TagSize.Medium}>
            <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-white/5 text-xs text-greyscale-50">
              {index + 1}
            </div>
            <div className="text-sm text-greyscale-50">{technology[0]}</div>
          </Tag>
        ))}
      </div>
    </Section>
  );
}
