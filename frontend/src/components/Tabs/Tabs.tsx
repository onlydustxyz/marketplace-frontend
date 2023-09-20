import classNames from "classnames";

import { DesktopView, type Variants } from "src/components/Tabs/DesktopView";
import { MobileView } from "src/components/Tabs/MobileView";

export type Tab = {
  active: boolean;
  onClick: () => void;
  testId?: string;
} & React.PropsWithChildren;

export function Tabs({
  tabs,
  variant = "grey",
  showMobile = true,
  mobileTitle = "",
}: {
  tabs: Tab[];
  variant: Variants;
  showMobile?: boolean;
  mobileTitle?: string;
}) {
  return (
    <>
      <div
        className={classNames({
          "hidden md:block": showMobile,
        })}
      >
        <DesktopView tabs={tabs} variant={variant} />
      </div>

      {showMobile ? (
        <div className="md:hidden">
          <MobileView tabs={tabs} title={mobileTitle} />
        </div>
      ) : null}
    </>
  );
}
