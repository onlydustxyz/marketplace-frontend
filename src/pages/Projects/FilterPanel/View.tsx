import { cn } from "src/utils/cn";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Refresh from "src/icons/Refresh";
import StarLine from "src/icons/StarLine";
import Card from "src/components/Card";
import FilterDropDown, { FilterDropDownIcon } from "src/components/FilterDropDown";
import { useProjectFilter, Ownership as ProjectOwnership } from "src/pages/Projects/useProjectFilter";
import { Sponsor } from "src/types";

export interface FilterPanelViewProps {
  availableTechnologies: string[];
  availableSponsors: Sponsor[];
  isProjectLeader: boolean;
  fromSidePanel?: boolean;
}

export default function View({
  availableTechnologies,
  availableSponsors,
  isProjectLeader,
  fromSidePanel,
}: FilterPanelViewProps) {
  const { T } = useIntl();

  const {
    projectFilter,
    isCleared: isProjectFilterCleared,
    clear: clearProjectFilter,
    setOwnership: setProjectOwnership,
    setTechnologies: setProjectTechnologies,
    setSponsors,
  } = useProjectFilter();

  return (
    <Card className="flex h-fit flex-col gap-4 p-6" withBg={!fromSidePanel}>
      <div className="flex items-center justify-start xl:justify-between">
        <span className="font-belwe text-2xl font-normal text-greyscale-50 xl:text-base">{T("filter.title")}</span>
        {!isProjectFilterCleared && (
          <div onClick={clearProjectFilter}>
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
            selected={projectFilter.ownership === ProjectOwnership.All}
            onClick={() => setProjectOwnership(ProjectOwnership.All)}
          >
            {T("filter.ownership.all")}
          </OwnershipTypeButton>
          <OwnershipTypeButton
            selected={projectFilter.ownership === ProjectOwnership.Mine}
            onClick={() => setProjectOwnership(ProjectOwnership.Mine)}
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
        icon={FilterDropDownIcon.Technology}
        options={availableTechnologies}
        value={projectFilter.technologies}
        setValue={setProjectTechnologies}
        dataTestId="technologies-filter-dropdown"
      />
      <FilterDropDown
        defaultLabel={T("filter.sponsors.all")}
        selectedLabel={T("filter.sponsors.some")}
        icon={FilterDropDownIcon.Sponsors}
        options={availableSponsors.map(({ name }) => name)}
        value={projectFilter.sponsors.map(({ name }) => name)}
        setValue={value => {
          setSponsors(
            value
              .map(name => availableSponsors.find(sponsor => sponsor.name === name))
              .filter((sponsor): sponsor is Sponsor => Boolean(sponsor))
          );
        }}
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
      className={cn(
        "flex w-fit flex-row items-center rounded-lg border border-greyscale-50/8  px-2 font-walsheim text-xs font-normal text-neutral-100",
        "hover:cursor-pointer",
        {
          "border-transparent bg-spacePurple-900 outline outline-2 outline-spacePurple-500 ": selected,
          "bg-whiteFakeOpacity-10": !selected,
        }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
