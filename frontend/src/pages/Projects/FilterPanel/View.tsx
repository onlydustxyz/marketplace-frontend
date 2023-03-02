import classNames from "classnames";
import { useIntl } from "src/hooks/useIntl";
import StarLine from "src/icons/StarLine";
import { ProjectFilter, ProjectOwnershipType } from "..";
import Card from "../../../components/Card";
import FilterDropDown, { FilterDropDownIcon } from "../../../components/FilterDropDown";

export interface FilterPanelViewProps {
  availableTechnologies: string[];
  isProjectLeader: boolean;
  projectFilter: ProjectFilter;
  setProjectFilter: (projectFilter: ProjectFilter) => void;
}

export default function View({
  availableTechnologies: technologies,
  projectFilter,
  setProjectFilter,
  isProjectLeader,
}: FilterPanelViewProps) {
  const { T } = useIntl();

  return (
    <Card className="flex flex-col h-fit w-full p-6 gap-0.5">
      <span className="font-belwe font-normal text-base text-greyscale-50">{T("filter.title")}</span>
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
        options={technologies}
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
