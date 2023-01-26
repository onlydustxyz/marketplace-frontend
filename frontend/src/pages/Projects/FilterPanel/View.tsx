import { useIntl } from "src/hooks/useIntl";
import Card from "../../../components/Card";
import FilterDropDown, { FilterDropDownIcon } from "../../../components/FilterDropDown";

type Props = {
  technologies: string[];
  onTechnologiesChange?: (technologies: string[]) => void;
};

export default function View({ technologies, onTechnologiesChange }: Props) {
  const { T } = useIntl();

  return (
    <Card className="flex flex-col h-fit w-full p-6 gap-4">
      <span className="font-belwe font-normal text-base text-greyscale-50">{T("filter.title")}</span>
      <FilterDropDown
        defaultLabel={T("filter.technologies.all")}
        selectedLabel={T("filter.technologies.some")}
        icon={FilterDropDownIcon.Technology}
        options={technologies}
        onChange={onTechnologiesChange}
      />
    </Card>
  );
}
