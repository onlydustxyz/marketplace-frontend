import { PropsWithChildren, useState } from "react";
import FilterIcon from "src/assets/icons/FilterIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import Refresh from "src/icons/Refresh";
import { cn } from "src/utils/cn";

export function MobileView({
  children,
  isActive,
  onClear,
}: PropsWithChildren<{
  isActive: boolean;
  onClear: () => void;
}>) {
  const { T } = useIntl();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <Button
        type={ButtonType.Secondary}
        size={ButtonSize.Sm}
        iconOnly={true}
        pressed={panelOpen}
        className={cn({
          "border-spacePurple-200 text-spacePurple-100": isActive,
        })}
        onClick={() => setPanelOpen(true)}
      >
        <FilterIcon />
      </Button>

      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <div className="flex flex-col divide-y divide-card-border-light rounded-t-2xl border-t border-card-border-medium bg-greyscale-900 [&>*]:px-6 [&>*]:py-4">
          <div className="flex justify-between px-6 py-3">
            <p className="font-belwe text-base text-greyscale-50">{T("filter.title")}</p>
            {isActive ? (
              <Button type={ButtonType.Ternary} size={ButtonSize.Xs} onClick={onClear}>
                <Refresh />
                {T("filter.clearButton")}
              </Button>
            ) : null}
          </div>

          {children}
        </div>
      </SidePanel>
    </>
  );
}
