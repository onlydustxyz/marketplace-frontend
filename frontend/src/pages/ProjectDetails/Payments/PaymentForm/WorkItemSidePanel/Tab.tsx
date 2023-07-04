import classNames from "classnames";
import { PropsWithChildren } from "react";
import underline from "assets/img/underline.png";

type Props = {
  active: boolean;
  onClick: () => void;
  testId?: string;
} & PropsWithChildren;

export default function Tab({ testId, active, onClick, children }: Props) {
  return (
    <div data-testid={testId} className="relative cursor-pointer" onClick={onClick}>
      <div
        className={classNames("flex flex-row items-center gap-1.5 pb-2 font-walsheim text-base font-normal", {
          "fill-greyscale-500 text-greyscale-500 hover:border-b-2 hover:border-greyscale-500 hover:fill-greyscale-200 hover:pb-1.5 hover:text-greyscale-200":
            !active,
          "fill-greyscale-50 text-greyscale-50": active,
        })}
      >
        {children}
      </div>
      {active && <img className="absolute inset-x-0 bottom-0 h-1 w-full" src={underline} alt="underline" />}
    </div>
  );
}
