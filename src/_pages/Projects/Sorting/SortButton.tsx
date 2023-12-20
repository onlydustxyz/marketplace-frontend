import { cn } from "src/utils/cn";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
};

export function SortButton({ panelOpen, setPanelOpen }: Props) {
  const { T } = useIntl();
  return (
    <button
      className={cn("rounded-xl border px-4 py-2 font-walsheim text-sm font-semibold", {
        "border-fuchsia-500 bg-slate-900 text-fuchsia-300": panelOpen,
      })}
      onClick={() => setPanelOpen(true)}
    >
      {T("projects.sorting.button")}
    </button>
  );
}
