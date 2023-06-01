import { PropsWithChildren } from "react";

type Props = { title: string } & PropsWithChildren;

export const Section = ({ title, children }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-row gap-2 items-center font-belwe font-normal text-xl text-greyscale-100 py-2 px-1">
      {title}
      <div className="w-full border border-greyscale-50/8" />
    </div>
    {children}
  </div>
);
