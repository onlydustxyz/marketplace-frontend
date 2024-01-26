import React, { ReactElement } from "react";
import { cn } from "src/utils/cn";

export function DetailRow({
  icon,
  label,
  date,
  className,
}: {
  icon: ReactElement;
  label: string;
  date: string;
  className?: string;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {icon}
      <div className={cn("font-walsheim text-sm font-normal", className)}>
        <span>{label}</span>
        <span className="text-greyscale-300">{date}</span>
      </div>
    </div>
  );
}
