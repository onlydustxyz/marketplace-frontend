import { PropsWithChildren } from "react";

export enum SectionIcon {
  Star = "ri-star-line",
  User = "ri-user-3-line",
  Funds = "ri-funds-line",
  Service = "ri-service-line",
  Link = "ri-link",
}

type Props = {
  title: string;
  icon: SectionIcon;
  testId?: string;
} & PropsWithChildren;

export default function Section({ title, icon, testId, children }: Props) {
  return (
    <div data-testid={testId} className="flex flex-col gap-2 px-6 py-4">
      <div className="flex flex-row items-center gap-1 whitespace-nowrap text-spaceBlue-200">
        <i className={`${icon} p-px text-xl font-normal`} />
        <span className="text-md text-sm font-medium uppercase">{title}</span>
      </div>
      {children}
    </div>
  );
}
