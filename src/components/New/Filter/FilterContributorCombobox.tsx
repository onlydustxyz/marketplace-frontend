import { ComponentProps } from "react";
import Contributor from "src/components/Contributor";
import { FilterField } from "src/components/New/Filter/FilterField";
import { useIntl } from "src/hooks/useIntl";
import { ContributorResponse } from "src/types";
import { FilterCombobox } from "./FilterCombobox";
import User3Line from "src/icons/User3Line";

export function FilterContributorCombobox<T extends ContributorResponse>({
  contributors,
  selected,
  onChange,
  queryState,
  uniqueKey,
}: {
  contributors: T[];
  selected: T[];
  onChange: (value: T[]) => void;
  queryState: ComponentProps<typeof FilterCombobox>["queryState"];
  uniqueKey: keyof T;
}) {
  const { T } = useIntl();

  function renderPlaceholder() {
    if (selected.length === 0) {
      return T("filter.contributor.placeholder");
    }

    if (selected.length === 1) {
      return selected[0]["login"];
    }

    return T("filter.contributor.many", { count: selected.length });
  }

  return (
    <FilterField label={T("filter.contributor.title")}>
      <FilterCombobox<T>
        items={contributors}
        selected={selected}
        onChange={onChange}
        queryState={queryState}
        renderIcon={props => <User3Line {...props} />}
        renderItem={({ item }) => <Contributor contributor={item} />}
        uniqueKey={uniqueKey}
        placeholder={renderPlaceholder()}
      />
    </FilterField>
  );
}
