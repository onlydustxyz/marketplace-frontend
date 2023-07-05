import classNames from "classnames";
import { ForwardedRef, PropsWithChildren, forwardRef } from "react";

export enum BackgroundRoundedBorders {
  Full = "rounded-3xl",
  Right = "rounded-r-3xl",
}

type Props = {
  roundedBorders: BackgroundRoundedBorders;
  withSidebar?: boolean;
  centeredContent?: boolean;
} & PropsWithChildren;

const Background = forwardRef(function Background(
  { roundedBorders, withSidebar = false, centeredContent = false, children }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={classNames("mb-6 h-full w-full overflow-y-auto xl:scrollbar-none", {
        "ml-2 mr-6": withSidebar,
        "px-2 md:mx-6 md:pr-6": !withSidebar,
      })}
    >
      <div
        className={classNames(
          "min-h-full bg-space xl:bg-fixed xl:bg-clip-content xl:bg-no-repeat",
          roundedBorders,
          {
            "md:mr-6": !withSidebar,
          },
          { "flex flex-col justify-center": centeredContent }
        )}
      >
        {children}
      </div>
    </div>
  );
});

export default Background;
