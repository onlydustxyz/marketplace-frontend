import { useIntl } from "src/hooks/useIntl";
import { LanguageMap } from "src/types";
import { languages as knownLanguages } from "src/__generated/languages";
import { ClassAttributes, Dispatch, HTMLAttributes, SetStateAction, useEffect, useState } from "react";
import StylizedCombobox from "src/components/StylizedCombobox";
import { SortableList, SortableItemProps, SortableItem } from "@thaddeusjiang/react-sortable-list";
import Draggable from "src/icons/Draggable";
import CloseLine from "src/icons/CloseLine";

type Props = {
  technologies: LanguageMap;
  setTechnologies: Dispatch<SetStateAction<LanguageMap>>;
};

export default function EditTechnologiesCard({ technologies, setTechnologies }: Props) {
  const { T } = useIntl();

  const allLanguages = Object.keys(knownLanguages).map(language => ({
    id: language,
    value: language,
    displayValue: language,
  }));

  const [selectedLanguages, setSelectedLanguages] = useState<SortableItemProps[]>(
    Object.entries(technologies)
      .sort((lang1, lang2) => lang1[1] - lang2[1])
      .map(([language]) => ({
        id: language,
        value: language,
        displayValue: language,
      }))
  );

  useEffect(() => {
    setTechnologies(
      selectedLanguages.reduce((technologies, language, index) => ({ ...technologies, [language.value]: index }), {})
    );
  }, [selectedLanguages]);

  const DragHandler = (
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
  ) => (
    <div {...props} className="cursor-grab active:cursor-grabbing text-base">
      <Draggable />
    </div>
  );

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="font-normal text-sm text-greyscale-300">{T("profile.edit.sections.technologies.rank")}</div>
      <StylizedCombobox
        options={allLanguages.filter(
          language => !selectedLanguages.some(selectedLanguage => selectedLanguage.id === language.id)
        )}
        selectedOptions={selectedLanguages}
        setSelectedOptions={setSelectedLanguages}
        optionFilter={(query, option) => option.displayValue.toLowerCase().includes(query.toLowerCase())}
        placeholder={T("profile.edit.sections.technologies.searchPlaceholder")}
        maxDisplayedOptions={5}
        multiple
      />
      {selectedLanguages.length > 0 && (
        <SortableList items={selectedLanguages} setItems={setSelectedLanguages}>
          {({ items }: { items: SortableItemProps[] }) => (
            <>
              {items.map((item: SortableItemProps, index) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  DragHandler={DragHandler}
                  className="flex gap-1 items-center justify-center h-7 px-2 w-fit bg-white/2 border border-greyscale-50/8 rounded-full overflow-hidden text-greyscale-50 text-sm font-walsheim"
                >
                  <div className="flex gap-1 items-center justify-center cursor-default">
                    <div className="flex bg-white/5 rounded w-4 h-4 text-xs justify-center items-center">
                      {index + 1}
                    </div>
                    {item.displayValue}
                  </div>
                  <button
                    onClick={() => setSelectedLanguages(selectedLanguages.filter(language => language.id !== item.id))}
                  >
                    <CloseLine />
                  </button>
                </SortableItem>
              ))}
            </>
          )}
        </SortableList>
      )}
    </div>
  );
}
