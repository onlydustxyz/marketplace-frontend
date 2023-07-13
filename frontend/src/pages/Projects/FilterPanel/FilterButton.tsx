import classNames from "classnames";
import { useState } from "react";
import FilterIcon from "src/assets/icons/FilterIcon";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import FilterPanel from ".";

type Props = {
  isProjectLeader: boolean;
};

export function FilterButton({ isProjectLeader }: Props) {
  const { T } = useIntl();
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <button
        className={classNames(
          "flex items-center gap-2 rounded-xl border px-4 py-2 font-walsheim text-sm font-semibold",
          {
            "border-fuchsia-500 bg-slate-900 text-fuchsia-300": panelOpen,
          }
        )}
        onClick={() => setPanelOpen(true)}
      >
        <FilterIcon /> {T("filter.title")}
      </button>
      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} placement="bottom">
        <FilterPanel isProjectLeader={isProjectLeader} fromSidePanel />
      </SidePanel>
    </>
  );
}
