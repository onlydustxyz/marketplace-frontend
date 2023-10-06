import FilterIcon from "src/assets/icons/FilterIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

export function ContributionFilter() {
  const { T } = useIntl();

  return (
    <div>
      <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
        <FilterIcon /> {T("filter.mobileButton", { count: 0 })}
      </Button>
    </div>
  );
}
