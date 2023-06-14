import { useIntl } from "src/hooks/useIntl";
import { LanguageMap } from "src/types";
import { languages as knownLanguages } from "src/__generated/languages";
import { ClassAttributes, HTMLAttributes } from "react";
import StylizedCombobox from "src/components/StylizedCombobox";
import { SortableList, SortableItemProps, SortableItem } from "@thaddeusjiang/react-sortable-list";
import Draggable from "src/icons/Draggable";
import CloseLine from "src/icons/CloseLine";
import classNames from "classnames";
import Card from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/Card";
import { Section } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/Section";

type Props = {
  technologies: LanguageMap;
  setTechnologies: (languages: LanguageMap) => void;
};

export default function TechnologiesCard({ technologies = {}, setTechnologies }: Props) {
  const { T } = useIntl();

  const allLanguages = Object.keys(knownLanguages).map(language => ({
    id: language,
    value: language,
    displayValue: language,
  }));

  const selectedLanguages: SortableItemProps[] = Object.entries(technologies)
    .sort((lang1, lang2) => lang1[1] - lang2[1])
    .map(([language]) => ({
      id: language,
      value: language,
      displayValue: language,
    }));

  const setSelectedLanguages = (setter: SortableItemProps[] | ((prev: SortableItemProps[]) => SortableItemProps[])) => {
    const languages = typeof setter === "function" ? setter(selectedLanguages) : setter;
    setTechnologies(
      languages.reduce((technologies, language, index) => ({ ...technologies, [language.value]: index }), {})
    );
  };

  const DragHandler = (
    props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
  ) => (
    <div
      {...props}
      className={classNames(
        "flex gap-1 items-center justify-center pl-2 pr-1 w-fit",
        "bg-white/2 border border-greyscale-50/8 rounded-full rounded-r-none border-r-0",
        "cursor-grab active:cursor-grabbing text-base"
      )}
    >
      <Draggable />
    </div>
  );

  return (
    <Card>
      <Section
        gap="wide"
        title={T("profile.edit.sections.technologies.title")}
        subtitle={T("profile.edit.sections.technologies.subtitle")}
      >
        <div className="pb-4">
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
        </div>
        {selectedLanguages.length > 0 && (
          <SortableList items={selectedLanguages} setItems={setSelectedLanguages}>
            {({ items }: { items: SortableItemProps[] }) => (
              <>
                {items.map((item: SortableItemProps, index) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    DragHandler={DragHandler}
                    className="flex h-7 text-greyscale-50 font-walsheim"
                  >
                    <div
                      className={classNames(
                        "flex gap-1 items-center justify-center pr-2 w-fit",
                        "bg-white/2 border border-greyscale-50/8 rounded-full rounded-l-none border-l-0 text-sm"
                      )}
                    >
                      <div className="flex bg-white/5 rounded w-4 h-4 text-xs justify-center items-center cursor-default">
                        {index + 1}
                      </div>
                      <div className="cursor-default">{item.displayValue}</div>
                      <button
                        onClick={() =>
                          setSelectedLanguages(selectedLanguages.filter(language => language.id !== item.id))
                        }
                      >
                        <CloseLine />
                      </button>
                    </div>
                  </SortableItem>
                ))}
              </>
            )}
          </SortableList>
        )}
      </Section>
    </Card>
  );
}
