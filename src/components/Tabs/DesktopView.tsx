import { cn } from "src/utils/cn";

import underline from "assets/img/underline.png";
import type { Tab } from "src/components/Tabs/Tabs";

const variants = {
  blue: {
    active: "fill-greyscale-50 text-greyscale-50",
    inactive:
      "fill-spaceBlue-200 text-spaceBlue-200 hover:border-spaceBlue-100 hover:fill-spaceBlue-100 hover:text-spaceBlue-100",
  },
  grey: {
    active: "fill-greyscale-50 text-greyscale-50",
    inactive:
      "fill-greyscale-500 text-greyscale-500 hover:border-greyscale-500 hover:fill-greyscale-200 hover:text-greyscale-200",
  },
};

export type Variants = keyof typeof variants;

export function DesktopView({
  tabs,
  variant = "grey",
  rightElement,
}: {
  tabs: Tab[];
  variant: Variants;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-8">
      {tabs.map(({ active, onClick, testId, children }, i) => {
        return (
          <button type="button" key={i} data-testid={testId} className="relative" onClick={onClick}>
            <div
              className={cn("flex items-center gap-1.5 pb-2 font-walsheim text-base font-normal", {
                "hover:border-b-2 hover:pb-1.5": !active,
                [variants[variant].inactive]: !active,
                [variants[variant].active]: active,
              })}
            >
              {children}
            </div>
            {active ? (
              <img className="absolute inset-x-0 bottom-0 h-1 w-full" src={underline} alt="Border underline" />
            ) : null}
          </button>
        );
      })}
      {rightElement ? rightElement : null}
    </div>
  );
}
