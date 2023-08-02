import classNames from "classnames";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  centeredContent?: boolean;
} & PropsWithChildren;

const Background = forwardRef(function Background(
  { roundedBorders, centeredContent = false, children }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className="h-full w-full overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 sm:px-6 xl:mb-6 xl:pb-0"
    >
      <div
        className={classNames("min-h-full bg-fixed bg-clip-content bg-space bg-no-repeat", roundedBorders, {
          "flex flex-col justify-center": centeredContent,
        })}
      >
        {children}
      </div>
    </div>
  );
});

export default Background;
