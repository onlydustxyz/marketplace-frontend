import classNames from "classnames";
import { PropsWithChildren } from "react";
import underline from "assets/img/underline.png";

type Props = {
  active: boolean;
  onClick: () => void;
} & PropsWithChildren;

export default function Tab({ active, onClick, children }: Props) {
  return (
    <div className="cursor-pointer relative">
      <div
        className={classNames("flex flex-row gap-1.5 items-center font-walsheim font-normal text-base pb-2", {
          "text-greyscale-500 fill-greyscale-500 hover:text-greyscale-200 hover:fill-greyscale-200 hover:border-b-2 hover:border-greyscale-500 hover:pb-1.5":
            !active,
          "text-greyscale-50 fill-greyscale-50": active,
        })}
        onClick={onClick}
      >
        {children}
      </div>
      {active && <img className="absolute inset-x-0 bottom-0 h-1 w-full" src={underline} alt="underline" />}
    </div>
  );
}
