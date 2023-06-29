import { useIntl } from "src/hooks/useIntl";
import Tag, { TagSize } from "src/components/Tag";
import { Section } from "./Section";

type Props = {
  languages: string[];
};

export default function TechnologiesSection({ languages }: Props) {
  const { T } = useIntl();

  return (
    <Section title={T("profile.sections.technologies.title")}>
      <div className="flex flex-wrap gap-2">
        {languages.map((language, index) => (
          <Tag key={language} size={TagSize.Medium}>
            <div className="w-4 h-4 flex items-center justify-center text-xs text-greyscale-50 bg-white/5 rounded-[4px]">
              {index + 1}
            </div>
            <div className="text-greyscale-50 text-sm">{language}</div>
          </Tag>
        ))}
      </div>
    </Section>
  );
}
