import { ReactNode } from "react";
import { cn } from "src/utils/cn";

type FlexProps = {
  className?: string;
  children: ReactNode;
};

export default function Flex({ className, children, ...rest }: FlexProps) {
  return (
    <div className={cn("flex", className)} {...rest}>
      {children}
    </div>
  );
}
