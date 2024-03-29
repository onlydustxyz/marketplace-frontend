import { PropsWithChildren } from "react";

import { DesktopView, type Variants } from "src/components/Tabs/DesktopView";
import { MobileView } from "src/components/Tabs/MobileView";
import { cn } from "src/utils/cn";

export type Tab = PropsWithChildren<{
  active: boolean;
  onClick: () => void;
  testId?: string;
}>;

type Props = {
  tabs: Tab[];
  variant?: Variants;
  rightElement?: React.ReactNode;
  border?: boolean;
};

type DefaultProps = Props & {
  showMobile?: false;
  mobileTitle?: never;
};

type MobileProps = Props & {
  showMobile: true;
  mobileTitle: string;
};

export function Tabs({
  tabs,
  variant = "grey",
  showMobile,
  mobileTitle,
  rightElement,
  border = false,
}: DefaultProps | MobileProps) {
  return (
    <>
      <div
        className={cn({
          "hidden md:block": showMobile,
        })}
      >
        <DesktopView tabs={tabs} variant={variant} rightElement={rightElement} border={border} />
      </div>

      {showMobile ? (
        <div className="md:hidden">
          <MobileView tabs={tabs} title={mobileTitle} />
        </div>
      ) : null}
    </>
  );
}
