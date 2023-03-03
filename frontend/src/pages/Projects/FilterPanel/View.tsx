import classNames from "classnames";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Refresh from "src/icons/Refresh";
import StarLine from "src/icons/StarLine";
import { ProjectFilter, ProjectOwnershipType } from "..";
import Card from "../../../components/Card";
import FilterDropDown, { FilterDropDownIcon } from "../../../components/FilterDropDown";

export interface FilterPanelViewProps {
  availableTechnologies: string[];
  isProjectLeader: boolean;
  projectFilter: ProjectFilter;
  setProjectFilter: (projectFilter: ProjectFilter) => void;
  clearProjectFilter: () => void;
}

export default function View({
  availableTechnologies,
  projectFilter,
  setProjectFilter,
  clearProjectFilter,
  isProjectLeader,
}: FilterPanelViewProps) {
  const { T } = useIntl();

  return (
    <Card className="flex flex-col h-fit w-full p-6 gap-0.5">
      <div className="flex flex-row justify-between items-center">
        <span className="font-belwe font-normal text-base text-greyscale-50">{T("filter.title")}</span>
        <div onClick={clearProjectFilter}>
          <Button type={ButtonType.Ternary} size={ButtonSize.Xs}>
            <Refresh />
            {T("filter.clearButton")}
          </Button>
        </div>
      </div>
      {isProjectLeader ? (
        <div className="flex flex-row py-3 gap-2">
          <OwnershipTypeButton
            selected={projectFilter.ownershipType === ProjectOwnershipType.All}
            onClick={() => setProjectFilter({ ...projectFilter, ownershipType: ProjectOwnershipType.All })}
          >
            {T("filter.ownership.all")}
          </OwnershipTypeButton>
          <OwnershipTypeButton
            selected={projectFilter.ownershipType === ProjectOwnershipType.Mine}
            onClick={() => setProjectFilter({ ...projectFilter, ownershipType: ProjectOwnershipType.Mine })}
          >
            <span className="flex flex-row items-center gap-1">
              <StarLine className="text-base" /> {T("filter.ownership.mine")}
            </span>
          </OwnershipTypeButton>
        </div>
      ) : (
        <div className="py-1.5" />
      )}
      <FilterDropDown
        defaultLabel={T("filter.technologies.all")}
        selectedLabel={T("filter.technologies.some")}
        icon={FilterDropDownIcon.Technology}
        options={availableTechnologies}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        dataTestId="technologies-filter-dropdown"
      />
    </Card>
  );
}

interface OwnershipTypeButtonProps extends React.PropsWithChildren {
  selected: boolean;
  onClick: () => void;
}

function OwnershipTypeButton({ selected, onClick, children }: OwnershipTypeButtonProps) {
  return (
    <div
      className={classNames(
        "px-2 w-fit text-neutral-100 font-walsheim font-normal text-xs bg-white/8 border border-greyscale-50/8 rounded-lg flex flex-row items-center",
        "hover:cursor-pointer",
        {
          "border-transparent outline outline-2 outline-spacePurple-500 bg-spacePurple-900": selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
