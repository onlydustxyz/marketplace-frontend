import classNames from "classnames";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Refresh from "src/icons/Refresh";
import StarLine from "src/icons/StarLine";
import {
  ProjectFilter,
  ProjectFilterAction,
  ProjectFilterActionType,
  ProjectOwnershipType,
} from "src/pages/Projects/types";
import Card from "src/components/Card";
import FilterDropDown from "src/components/FilterDropDown";

export interface FilterPanelViewProps {
  availableTechnologies: string[];
  availableSponsors: string[];
  isProjectLeader: boolean;
  projectFilter: ProjectFilter;
  dispatchProjectFilter: (action: ProjectFilterAction) => void;
  isProjectFilterCleared: () => boolean;
}

export default function View({
  availableTechnologies,
  availableSponsors,
  projectFilter,
  dispatchProjectFilter,
  isProjectLeader,
  isProjectFilterCleared,
}: FilterPanelViewProps) {
  const { T } = useIntl();

  return (
    <Card className="flex flex-col h-fit w-full p-6 gap-4">
      <div className="flex flex-row justify-between items-center">
        <span className="font-belwe font-normal text-base text-greyscale-50">{T("filter.title")}</span>
        {!isProjectFilterCleared() && (
          <div onClick={() => dispatchProjectFilter({ type: ProjectFilterActionType.Clear })}>
            <Button type={ButtonType.Ternary} size={ButtonSize.Xs}>
              <Refresh />
              {T("filter.clearButton")}
            </Button>
          </div>
        )}
      </div>
      {isProjectLeader && (
        <div className="flex flex-row gap-2">
          <OwnershipTypeButton
            selected={projectFilter.ownershipType === ProjectOwnershipType.All}
            onClick={() =>
              dispatchProjectFilter({
                type: ProjectFilterActionType.SelectOwnership,
                ownership: ProjectOwnershipType.All,
              })
            }
          >
            {T("filter.ownership.all")}
          </OwnershipTypeButton>
          <OwnershipTypeButton
            selected={projectFilter.ownershipType === ProjectOwnershipType.Mine}
            onClick={() =>
              dispatchProjectFilter({
                type: ProjectFilterActionType.SelectOwnership,
                ownership: ProjectOwnershipType.Mine,
              })
            }
          >
            <span className="flex flex-row items-center gap-1">
              <StarLine className="text-base" /> {T("filter.ownership.mine")}
            </span>
          </OwnershipTypeButton>
        </div>
      )}
      <FilterDropDown
        defaultLabel={T("filter.technologies.all")}
        selectedLabel={T("filter.technologies.some")}
        type={ProjectFilterActionType.SelectTechnologies}
        options={availableTechnologies}
        value={projectFilter.technologies}
        dispatchProjectFilter={dispatchProjectFilter}
        dataTestId="technologies-filter-dropdown"
      />
      <FilterDropDown
        defaultLabel={T("filter.sponsors.all")}
        selectedLabel={T("filter.sponsors.some")}
        type={ProjectFilterActionType.SelectSponsors}
        options={availableSponsors}
        value={projectFilter.sponsors}
        dispatchProjectFilter={dispatchProjectFilter}
        dataTestId="sponsors-filter-dropdown"
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
