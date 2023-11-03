import { cn } from "src/utils/cn";
import { ElementType, PropsWithChildren } from "react";
import { MouseEvent } from "react";

export enum TagSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum TagBorderColor {
  Grey = "grey",
  Orange = "orange",
  MultiColor = "multi-color",
}

export type TagProps = {
  as?: ElementType;
  id?: string;
  size?: TagSize;
  borderColor?: TagBorderColor;
  testid?: string;
  opaque?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & PropsWithChildren;

export default function Tag({
  as: Component,
  id,
  size = TagSize.Small,
  borderColor = TagBorderColor.Grey,
  testid,
  opaque,
  children,
  className,
  onClick,
  ...rest
}: TagProps) {
  const Wrapper = Component ?? "div";

  return (
    <Wrapper
      data-testid={testid}
      id={id}
      className="w-fit shrink-0 overflow-hidden rounded-full p-px blur-0"
      {...rest}
      {...(onClick && { onClick })}
    >
      <div
        className={cn(
          "relative flex w-fit items-center justify-center gap-1 rounded-full font-walsheim font-normal text-white xl:h-7",
          {
            "px-2 py-1 text-xs": size === TagSize.Small,
            "px-3 py-1.5 text-sm": size === TagSize.Medium,
            "px-4 py-1.5 text-sm": size === TagSize.Large,
          },
          {
            "border border-greyscale-50/8": borderColor === TagBorderColor.Grey,
            "border border-orange-500": borderColor === TagBorderColor.Orange,
            "before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:animate-spin-invert-slow before:rounded-full before:bg-multi-color-gradient":
              borderColor === TagBorderColor.MultiColor,
          },
          {
            "bg-spaceBlue-900": borderColor === TagBorderColor.MultiColor || opaque,
            "bg-white/2": (borderColor === TagBorderColor.Grey || borderColor === TagBorderColor.Orange) && !opaque,
          },
          className
        )}
      >
        {children}
      </div>
    </Wrapper>
  );
}
