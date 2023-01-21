import { PropsWithChildren } from "react";

export enum ButtonSize {
  Small = "small",
  Large = "large",
}

type ButtonProps = {
  size?: ButtonSize;
} & PropsWithChildren;

export default function CompletePaymentInformationButton({ size = ButtonSize.Large, children }: ButtonProps) {
  return (
    <div
      className={`flex flex-row justify-between items-center gap-2 w-fit rounded-xl text-spaceBlue-900  bg-greyscale-50 shadow-bottom-sm hover:cursor-pointer hover:text-spacePurple-900 hover:shadow-none hover:outline hover:outline-4 hover:outline-spacePurple-800  hover:bg-spacePurple-50 ${
        size === ButtonSize.Small ? "text-sm px-4 py-1.5" : "px-6 py-4"
      } font-medium`}
    >
      {children}
    </div>
  );
}
