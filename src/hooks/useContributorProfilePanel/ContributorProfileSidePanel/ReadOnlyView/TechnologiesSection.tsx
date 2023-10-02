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
            <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-white/5 text-xs text-greyscale-50">
              {index + 1}
            </div>
            <div className="text-sm text-greyscale-50">{language}</div>
          </Tag>
        ))}
      </div>
    </Section>
  );
}
