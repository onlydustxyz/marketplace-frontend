import classNames from "classnames";
import { ReactElement } from "react";

type ChipProps = {
  content: ReactElement;
  className?: string;
};

export default function Chip({ content }: ChipProps) {
  return (
    <span
      // className={classNames(
      //   `border-1 border-1 flex h-4 w-4 items-center justify-center rounded-full border
      //   border-greyscale-50/[0.08] text-center`,
      //   {
      //     "bg-white": test,
      //     "bg-white/8": !test,
      //   }
      // )}
      className={classNames(
        `border-1 border-1 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full  
        border border-greyscale-50/[0.08] bg-white/8 text-center `
      )}
    >
      {content}
    </span>
  );
}
