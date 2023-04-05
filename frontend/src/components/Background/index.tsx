import classNames from "classnames";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  withSidebar?: boolean;
} & PropsWithChildren;

const Background = forwardRef(function Background(
  { roundedBorders, withSidebar = false, children }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={classNames("overflow-y-auto scrollbar-none h-full w-full mb-6", {
        "mr-6 ml-2": withSidebar,
        "md:mx-6 md:pr-6 px-2": !withSidebar,
      })}
    >
      <div
        className={classNames("bg-space bg-no-repeat bg-fixed bg-clip-content min-h-full", roundedBorders, {
          "md:mr-6": !withSidebar,
        })}
      >
        {children}
      </div>
    </div>
  );
});

export default Background;
