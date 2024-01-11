import { ReactNode } from "react";
import { cn } from "src/utils/cn";

type CenterProps = {
  className?: string;
  children: ReactNode;
};

export default function Center({ className, children, ...rest }: CenterProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...rest}>
      {children}
    </div>
  );
}
