import classNames from "classnames";
import { useState } from "react";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import { Sorting } from "src/pages/Projects/sorting";

type Props = {
  all: Sorting[];
  current: Sorting;
  onChange: (value: Sorting) => void;
};

export function SortButton({ all, current, onChange }: Props) {
  const { T } = useIntl();
  const [panelOpen, setPanelOpen] = useState(false);
  return (
    <>
      <button
        className={classNames("rounded-xl border px-4 py-2 font-walsheim text-sm font-semibold", {
          "border-fuchsia-500 bg-slate-900 text-fuchsia-300": panelOpen,
        })}
        onClick={() => setPanelOpen(true)}
      >
        {T("projects.sorting.button")}
      </button>
      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} placement="bottom">
        <div className="flex flex-col gap-6 p-6">
          <div className="font-belwe text-2xl">{T("projects.sorting.label")}</div>
          <div className="flex flex-wrap gap-2">
            {all.map(value => (
              <button
                key={value}
                className={classNames("rounded-lg border px-2 py-1 font-walsheim text-xs", {
                  "border-fuchsia-500 bg-slate-900 text-fuchsia-300": value === current,
                  "border-stone-100 border-opacity-8 bg-white bg-opacity-8": value !== current,
                })}
                onClick={() => onChange(value)}
              >
                {T(`projects.sorting.${value}`)}
              </button>
            ))}
          </div>
        </div>
      </SidePanel>
    </>
  );
}
