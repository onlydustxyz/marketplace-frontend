import { PropsWithChildren } from "react";
import { cn } from "src/utils/cn";

import { DesktopView, type Variants } from "src/components/Tabs/DesktopView";
import { MobileView } from "src/components/Tabs/MobileView";

export type Tab = PropsWithChildren<{
  active: boolean;
  onClick: () => void;
  testId?: string;
}>;

type Props = {
  tabs: Tab[];
  variant?: Variants;
  rightElement?: React.ReactNode;
};

type DefaultProps = Props & {
  showMobile?: false;
  mobileTitle?: never;
};

type MobileProps = Props & {
  showMobile: true;
  mobileTitle: string;
};

export function Tabs({ tabs, variant = "grey", showMobile, mobileTitle, rightElement }: DefaultProps | MobileProps) {
  return (
    <>
      <div
        className={cn({
          "hidden md:block": showMobile,
        })}
      >
        <DesktopView tabs={tabs} variant={variant} rightElement={rightElement} />
      </div>

      {showMobile ? (
        <div className="md:hidden">
          <MobileView tabs={tabs} title={mobileTitle} />
        </div>
      ) : null}
    </>
  );
}
