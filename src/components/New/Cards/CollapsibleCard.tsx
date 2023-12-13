import { ReactNode, useState } from "react";
import { viewportConfig } from "src/config";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import { cn } from "src/utils/cn";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  title: string;
  description: string;
  icon: (className: string) => ReactNode;
  isEmpty?: boolean;
  hasShowMore?: boolean;
  children: React.ReactNode;
};

export default function CollapsibleCard({ title, description, icon, isEmpty, hasShowMore, children }: Props) {
  // Used for performance optimization, avoid rendering large invisible DOM
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <section className="overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base lg:shadow-heavy">
      <header
        className={cn("flex items-start justify-between gap-6 bg-card-background-light px-6 py-4 md:items-center", {
          "cursor-pointer": !isEmpty,
          "border-b border-card-border-light": !collapsed && !isEmpty,
        })}
        onClick={!isEmpty ? () => setCollapsed(prevState => !prevState) : undefined}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-card-background-medium p-3 leading-none text-greyscale-50">
            {icon("h-5 w-5 text-xl leading-none text-base")}
          </div>
          <div className="font-walsheim">
            <p className="text-base font-medium text-greyscale-50">{title}</p>
            <p className="text-sm text-spaceBlue-200">{description}</p>
          </div>
        </div>
        {!isEmpty ? (
          <span
            className={cn("flex h-6 w-6 items-center justify-center", {
              "rotate-180": !collapsed,
            })}
          >
            <ArrowDownSLine className="text-xl text-greyscale-50" />
          </span>
        ) : null}
      </header>
      <div
        className={cn("px-4 pt-6 lg:block", isLg && hasShowMore ? "pb-0" : "pb-6", {
          "lg:hidden": collapsed,
        })}
      >
        {children}
      </div>
    </section>
  );
}
