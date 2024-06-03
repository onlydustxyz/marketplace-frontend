import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

import { TFilterCard } from "./filter-card.types";

export function FilterCard({ icon, children, ...props }: TFilterCard.Props) {
  return (
    <Card
      className={cn(
        "group/card",
        "relative z-[1] w-fit min-w-[190px] border-none bg-gradient-to-r from-[#2E1334] via-[#23142F] to-[#14112C] !p-[3px]",
        "border-mask before:pointer-events-none before:absolute before:inset-0 before:-z-[1] before:h-full before:w-full before:rounded-2xl before:bg-gradient-to-r before:from-[#3D2147] before:via-[#312142] before:to-[#5D5170]",
        "after:absolute after:inset-0 after:-z-[1] after:h-full after:w-full after:rounded-2xl after:bg-noise-light"
      )}
      {...props}
    >
      <div className="relative z-[1] flex flex-row items-center justify-start gap-2 p-6">
        {icon}
        <Typography variant={"body-l-bold"} as="div" className="transition-all group-hover:text-spacePurple-100">
          {children}
        </Typography>
      </div>
    </Card>
  );
}
