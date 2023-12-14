import { useIntl } from "src/hooks/useIntl";
import { LanguageMap } from "src/types";
import { languages as knownLanguages } from "src/assets/technologies/languages";
import { frameworks } from "src/assets/technologies/frameworks";
import { infrastrutcures } from "src/assets/technologies/infrastructure";
import { frameworks as blockchainFrameworks } from "src/assets/technologies/blockchains";
import { schemes } from "src/assets/technologies/cryptography";
import { protocols, authenticationProtocols } from "src/assets/technologies/protocols";
import { games } from "src/assets/technologies/games";
import { databases } from "src/assets/technologies/databases";
import { ai } from "src/assets/technologies/ai";
import { architecture } from "src/assets/technologies/architecture";
import { web3 } from "src/assets/technologies/web3";
import { ClassAttributes, HTMLAttributes, useState } from "react";
import StylizedCombobox, { EMPTY_OPTION_ID, Option, RenderProps } from "src/components/StylizedCombobox";
import Draggable from "src/icons/Draggable";
import { cn } from "src/utils/cn";
import Add from "src/icons/Add";
import { withTooltip } from "src/components/Tooltip";
import { SortableItemProps, SortableList } from "../New/Sortable/SortableList";
import CloseLine from "src/icons/CloseLine";
import Flex from "../Utils/Flex";
import TechnologiesApi from "src/api/Technologies";
import useMutationAlert from "src/api/useMutationAlert";
import { IMAGES } from "src/assets/img";

type Props = {
  technologies: LanguageMap;
  setTechnologies: (languages: LanguageMap) => void;
};

type LanguageOption = { isSupported: boolean } & Option;
type SelectedTechnologyProps = (SortableItemProps & { value: string })[];

export default function TechnologiesSelect({ technologies = {}, setTechnologies }: Props) {
  const { T } = useIntl();
  const [suggestionValue, setSuggestionValue] = useState("");

  const { data: supportedTechnologiesData } = TechnologiesApi.queries.useGetTechnologies({});
  const { mutate: suggestTechnology, ...restMutation } = TechnologiesApi.mutations.useAddTechnology({});

  useMutationAlert({
    mutation: restMutation,
    success: {
      message: T("profile.form.technologies.suggestion.success", { technology: suggestionValue }),
    },
    error: {
      default: true,
    },
  });

  const supportedTechnologies =
    (supportedTechnologiesData?.technologies || []).map(technology => technology?.toLowerCase()) || [];

  const allLanguages: LanguageOption[] = Object.keys({
    ...knownLanguages,
    ...frameworks,
    ...infrastrutcures,
    ...blockchainFrameworks,
    ...schemes,
    ...games,
    ...protocols,
    ...authenticationProtocols,
    ...databases,
    ...ai,
    ...architecture,
    ...web3,
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

  const sendSuggestion = async (suggestion: string) => {
    setSuggestionValue(suggestion);
    suggestTechnology({
      technology: suggestion,
    });
  };

  const setSelectedLanguages = async (
    setter: SelectedTechnologyProps | ((prev: SelectedTechnologyProps) => SelectedTechnologyProps)
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
      className={cn(
        "flex w-fit items-center justify-center gap-1 pl-2 pr-1",
        "rounded-full rounded-r-none border border-r-0 border-greyscale-50/8 bg-white/2",
        "cursor-grab text-base active:cursor-grabbing"
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
        <Flex className="mt-2 flex-col gap-2">
          <SortableList
            items={selectedLanguages || []}
            onChange={setSelectedLanguages}
            itemProps={{ DragHandler, className: "flex h-7 w-full" }}
          >
            {({ item, index }) => (
              <Flex
                key={item.id}
                className={cn(
                  "font-walsheim text-greyscale-50",
                  "flex w-fit items-center justify-center pr-2",
                  "rounded-full rounded-l-none border border-l-0 border-greyscale-50/8 bg-white/2 text-sm"
                )}
                data-technology={item.id}
              >
                <div className="mr-2 flex w-4 cursor-default items-center justify-center rounded bg-white/5 text-xs">
                  {index + 1}
                </div>
                <div className="cursor-default">{item.displayValue}</div>
                <button
                  onClick={() => setSelectedLanguages(selectedLanguages.filter(language => language.id !== item.id))}
                >
                  <CloseLine />
                </button>
              </Flex>
            )}
          </SortableList>
        </Flex>
      )}
    </>
  );
}

function Technology({ option }: RenderProps<LanguageOption>) {
  const { T } = useIntl();

  return option.id === EMPTY_OPTION_ID ? (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-center gap-1 font-walsheim text-sm font-medium text-greyscale-50">
        <Add /> {T("profile.form.technologies.suggestion.suggest", { technology: option.value })}
      </div>
      <div className="font-walsheim text-sm font-normal italic text-greyscale-200">
        {T("profile.form.technologies.suggestion.disclaimer")}
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-center gap-2">
      {option.displayValue}
      {option.isSupported && (
        <img
          src={IMAGES.logo.original}
          className="h-3.5"
          loading="lazy"
          alt="OnlyDust"
          {...withTooltip(T("profile.form.technologies.supportedTooltip"), { className: "w-36" })}
        />
      )}
    </div>
  );
}
