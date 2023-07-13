import classNames from "classnames";
import { PropsWithChildren } from "react";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

export enum TagSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum TagBorderColor {
  Grey = "grey",
  MultiColor = "multi-color",
}

export type TagProps = {
  id?: string;
  size: TagSize;
  borderColor?: TagBorderColor;
  testid?: string;
  opaque?: boolean;
} & PropsWithChildren;

export default function Tag({
  id,
  size,
  borderColor = TagBorderColor.Grey,
  testid,
  opaque,
  children,
  ...rest
}: TagProps) {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  return (
    <div data-testid={testid} id={id} className="w-fit shrink-0 overflow-hidden rounded-full p-px" {...rest}>
      {isXl ? (
        <div
          className={classNames(
            "relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white xl:h-7",
            "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen",
            {
              "px-2 py-1 text-xs": size === TagSize.Small,
              "px-3 py-1.5 text-sm": size === TagSize.Medium,
              "px-4 py-1.5 text-sm": size === TagSize.Large,
            },
            {
              "border border-greyscale-50/8": borderColor === TagBorderColor.Grey,
              "before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient":
                borderColor === TagBorderColor.MultiColor,
            },
            {
              "bg-spaceBlue-900": borderColor === TagBorderColor.MultiColor || opaque,
              "bg-white/2": borderColor === TagBorderColor.Grey && !opaque,
            }
          )}
        >
          {children}
        </div>
      ) : (
        <div
          className={classNames(
            "relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white xl:h-7",
            "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen",
            {
              "border border-greyscale-50/8": borderColor === TagBorderColor.Grey,
              "before:bg-multi-color-gradient": borderColor === TagBorderColor.MultiColor,
            },
            {
              "bg-spaceBlue-900": borderColor === TagBorderColor.MultiColor || opaque,
              "bg-white/2": borderColor === TagBorderColor.Grey && !opaque,
            }
          )}
        >
          <div className="border-1 rounded-full border border-transparent">
            <div
              className={classNames("relative flex w-fit items-center justify-center gap-1", {
                "px-2 py-1 text-xs": size === TagSize.Small,
                "px-3 py-1.5 text-sm": size === TagSize.Medium,
                "px-4 py-1.5 text-sm": size === TagSize.Large,
              })}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
