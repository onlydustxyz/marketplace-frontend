import { useIntl } from "src/hooks/useIntl";
import { LanguageMap } from "src/types";
import { languages as knownLanguages } from "src/__generated/languages";
import { useState } from "react";
import StylizedCombobox from "src/components/StylizedCombobox";

type Props = {
  languages: LanguageMap;
};

export default function EditTechnologiesCard({ languages }: Props) {
  const { T } = useIntl();
  const allLanguages = Object.keys(knownLanguages);
  const [selectedLanguages, setSelectedLanguages] = useState(Object.keys(languages));

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="font-normal text-sm text-greyscale-300">{T("profile.edit.sections.technologies.rank")}</div>
      <StylizedCombobox
        options={allLanguages.filter(language => !selectedLanguages.includes(language))}
        selectedOptions={selectedLanguages}
        setSelectedOptions={setSelectedLanguages}
        optionFilter={(query, language) => language.toLowerCase().includes(query.toLowerCase())}
        placeholder={T("profile.edit.sections.technologies.searchPlaceholder")}
        maxDisplayedOptions={5}
        multiple
      />
      {selectedLanguages.length > 0 && (
        <ul>
          {selectedLanguages.map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
