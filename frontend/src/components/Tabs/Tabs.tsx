import { PropsWithChildren } from "react";
import classNames from "classnames";
import underline from "assets/img/underline.png";

type Tab = {
  active: boolean;
  onClick: () => void;
  testId?: string;
} & PropsWithChildren;

export function Tabs({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex items-center gap-8 border-b border-greyscale-50/8">
      {tabs.map(({ active, onClick, testId, children }, i) => {
        return (
          <button type="button" key={i} data-testid={testId} className="relative" onClick={onClick}>
            <div
              className={classNames("flex items-center gap-1.5 pb-2 font-walsheim text-base font-normal", {
                "text-spaceBlue-200 hover:border-b-2 hover:border-spaceBlue-100 hover:pb-1.5 hover:text-spaceBlue-100":
                  !active,
                "text-greyscale-50": active,
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
    </div>
  );
}
