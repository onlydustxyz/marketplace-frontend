import { useIntl } from "src/hooks/useIntl";
import { LanguageMap } from "src/types";
import { languages as knownLanguages } from "src/assets/technologies/languages";
import { frameworks } from "src/assets/technologies/frameworks";
import { infrastrutcures } from "src/assets/technologies/infrastructure";
import { frameworks as blockchainFrameworks } from "src/assets/technologies/blockchains";
import { schemes } from "src/assets/technologies/cryptography";
import { protocols, authenticationProtocols } from "src/assets/technologies/protocols";
import { games } from "src/assets/technologies/games";
import { ClassAttributes, HTMLAttributes } from "react";
import StylizedCombobox, { EMPTY_OPTION_ID, Option, RenderProps } from "src/components/StylizedCombobox";
import { SortableList, SortableItemProps, SortableItem } from "@thaddeusjiang/react-sortable-list";
import Draggable from "src/icons/Draggable";
import CloseLine from "src/icons/CloseLine";
import classNames from "classnames";
import { useShowToaster } from "src/hooks/useToaster";
import Add from "src/icons/Add";
import { useAllTechnologiesQuery, useSuggestTechnologyMutation } from "src/__generated/graphql";
import { contextWithCacheHeaders } from "src/utils/headers";
import { withTooltip } from "src/components/Tooltip";
import onlyDustLogo from "assets/img/onlydust-logo.png";

type Props = {
  technologies: LanguageMap;
  setTechnologies: (languages: LanguageMap) => void;
};

type LanguageOption = { isSupported: boolean } & Option;

export default function TechnologiesSelect({ technologies = {}, setTechnologies }: Props) {
  const { T } = useIntl();

  const supportedTechnologiesQuery = useAllTechnologiesQuery({
    ...contextWithCacheHeaders,
  });

  const supportedTechnologies =
    supportedTechnologiesQuery.data?.technologies.map(({ technology }) => technology?.toLowerCase()) || [];

  const allLanguages: LanguageOption[] = Object.keys({
    ...knownLanguages,
    ...frameworks,
    ...infrastrutcures,
    ...blockchainFrameworks,
    ...schemes,
    ...games,
    ...protocols,
    ...authenticationProtocols,
  }).map(language => ({
    id: language,
    value: language,
    displayValue: language,
    isSupported: supportedTechnologies.includes(language.toLowerCase()),
  }));

  const selectedLanguages: LanguageOption[] = Object.entries(technologies)
    .sort((lang1, lang2) => lang2[1] - lang1[1])
    .map(([language]) => ({
      id: language,
      value: language,
      displayValue: language,
      isSupported: supportedTechnologies.includes(language.toLowerCase()),
    }));

  const showToaster = useShowToaster();

  const [suggestTechnology] = useSuggestTechnologyMutation();

  const sendSuggestion = async (suggestion: string) => {
    suggestTechnology({
      variables: { suggestion },
      context: { graphqlErrorDisplay: "toaster" },
      onCompleted: () => showToaster(T("profile.form.technologies.suggestion.success", { technology: suggestion })),
    });
  };

  const setSelectedLanguages = async (
    setter: SortableItemProps[] | ((prev: SortableItemProps[]) => SortableItemProps[])
  ) => {
    const languages = typeof setter === "function" ? setter(selectedLanguages) : setter;
    const suggestion = languages.find(l => l.id === EMPTY_OPTION_ID);

    if (suggestion) {
      sendSuggestion(suggestion.value);
    } else {
      setTechnologies(
        languages.reduce(
          (technologies, language, index) => ({ ...technologies, [language.value]: languages.length - index }),
          {}
        )
      );
    }
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
    <>
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
        testId="technologiesCombobox"
        render={({ option }) => <Technology option={option as LanguageOption} />}
        emptyStateHeight={52}
      />
      {selectedLanguages.length > 0 && (
        <div className="flex flex-col gap-2">
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
                      data-technology={item.id}
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
        </div>
      )}
    </>
  );
}

function Technology({ option }: RenderProps<LanguageOption>) {
  const { T } = useIntl();

  return option.id === EMPTY_OPTION_ID ? (
    <div className="flex flex-col gap-1">
      <div className="font-medium font-walsheim text-sm text-greyscale-50 flex flex-row items-center gap-1">
        <Add /> {T("profile.form.technologies.suggestion.suggest", { technology: option.value })}
      </div>
      <div className="font-normal font-walsheim text-sm text-greyscale-200 italic">
        {T("profile.form.technologies.suggestion.disclaimer")}
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-center gap-2">
      {option.displayValue}
      {option.isSupported && (
        <img
          src={onlyDustLogo}
          className="h-3.5"
          {...withTooltip(T("profile.form.technologies.supportedTooltip"), { className: "w-36" })}
        />
      )}
    </div>
  );
}
