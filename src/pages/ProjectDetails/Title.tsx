import { PropsWithChildren } from "react";

type TitleProps = {
  className?: string;
} & PropsWithChildren;

export default function Title({ children }: TitleProps) {
  return <div className={"font-belwe text-3xl xl:text-2xl"}>{children}</div>;
}
