import classNames from "classnames";
import { PropsWithChildren } from "react";

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
}

type ButtonProps = {
  size?: ButtonSize;
  type?: ButtonType;
} & PropsWithChildren;

export default function Button({ size = ButtonSize.Large, type = ButtonType.Primary, children }: ButtonProps) {
  return (
    <div
      className={classNames(
        "flex flex-row justify-between items-center gap-2 w-fit rounded-xl font-walsheim hover:cursor-pointer shadow-bottom-sm hover:shadow-none font-medium",
        {
          "px-6 py-4 h-14": size === ButtonSize.Large,
          "text-sm px-4 py-1.5 h-14": size === ButtonSize.Medium,
          "text-sm px-4 py-2 h-9": size === ButtonSize.Small,
          "text-spaceBlue-900  bg-greyscale-50 hover:text-spacePurple-900 hover:outline hover:outline-4 hover:outline-spacePurple-800  hover:bg-spacePurple-50":
            type === ButtonType.Primary,
          "text-greyscale-50 bg-white/5 backdrop-blur-lg border border-greyscale-50 hover:text-spacePurple-400 hover:bg-spacePurple-900 hover:border-spacePurple-400":
            type === ButtonType.Secondary,
        }
      )}
    >
      {children}
    </div>
  );
}
