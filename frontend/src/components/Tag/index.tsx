import classNames from "classnames";
import { PropsWithChildren } from "react";

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
  return (
    <div data-testid={testid} id={id} className="w-fit shrink-0 overflow-hidden rounded-full p-px" {...rest}>
      <div
        className={classNames(
          "relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white xl:h-7",
          "before:absolute before:-z-10 before:h-screen before:w-screen",
          {
            "px-2 py-1 text-xs": size === TagSize.Small,
            "px-3 py-1.5 text-sm": size === TagSize.Medium,
            "px-4 py-1.5 text-sm": size === TagSize.Large,
          },
          {
            "border border-greyscale-50/8": borderColor === TagBorderColor.Grey,
            "before:animate-spin-invert-slow before:bg-multi-color-gradient": borderColor === TagBorderColor.MultiColor,
          },
          {
            "bg-spaceBlue-900": borderColor === TagBorderColor.MultiColor || opaque,
            "bg-white/2": borderColor === TagBorderColor.Grey && !opaque,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}
