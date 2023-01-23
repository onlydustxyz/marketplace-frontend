import { PropsWithChildren } from "react";

export enum ButtonSize {
  Small = "small",
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
      className={`flex flex-row justify-between items-center gap-2 w-fit h-14 rounded-xl font-walsheim hover:cursor-pointer shadow-bottom-sm hover:shadow-none ${
        size === ButtonSize.Small ? "text-sm px-4 py-1.5" : "px-6 py-4"
      } ${
        type === ButtonType.Primary
          ? "text-spaceBlue-900  bg-greyscale-50 hover:text-spacePurple-900 hover:outline hover:outline-4 hover:outline-spacePurple-800  hover:bg-spacePurple-50"
          : "text-greyscale-50 bg-white/5 backdrop-blur-lg border border-greyscale-50 hover:text-spacePurple-400 hover:bg-spacePurple-900 hover:border-spacePurple-400"
      } font-medium`}
    >
      {children}
    </div>
  );
}
