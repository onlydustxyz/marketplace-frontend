import { PropsWithChildren } from "react";

type Props = { title: string } & PropsWithChildren;

export const Section = ({ title, children }: Props) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-row items-center gap-2 px-1 py-2 font-belwe text-xl font-normal text-greyscale-100">
      {title}
      <div className="w-full border border-greyscale-50/8" />
    </div>
    {children}
  </div>
);
