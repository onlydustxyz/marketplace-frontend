import { Flex } from "@/components/layout/flex/flex";
import { Icon } from "@/components/layout/icon/icon";
import { cn } from "src/utils/cn";
import { TBadge } from "./badge.types";
import { badgeVariants } from "./badge.variants";

export function Badge({ value, remixIconName, className, ...props }: TBadge.Props) {
  const { size = "m" } = props;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="fit"
      className={cn(badgeVariants({ ...props }), className)}
      {...props}
    >
      {remixIconName ? <Icon remixName={remixIconName} size={size === "s" ? 12 : 16} /> : null}

      {value}
    </Flex>
  );
}
