import { Flex } from "@/components/layout/flex/flex";
import { Icon } from "@/components/layout/icon/icon";
import { RemixIconsName } from "@/components/layout/icon/remix-icon-names.type";
import { FC } from "react";
import { cn } from "src/utils/cn";
import { VariantProps, tv } from "tailwind-variants";

export type BadgeVariants = VariantProps<typeof badgeVariants>;

interface BadgeProps extends BadgeVariants {
  value: number;
  remixIconName?: RemixIconsName;
  className?: string;
}

export const badgeVariants = tv({
  base: "rounded-full bg-spacePurple-900 text-spacePurple-500",
  variants: {
    size: {
      s: "h-5 min-w-5 gap-0.5 py-0.5 px-1.5 od-text-body-s-bold",
      m: "h-6 min-w-6 gap-1 py-0.5 px-2 od-text-body-m-bold",
      l: "h-8 min-w-8 gap-1 py-1 px-3 od-text-body-l-bold",
    },
  },
  defaultVariants: {
    size: "m",
  },
});

export const Badge: FC<BadgeProps> = ({ value, remixIconName, className, ...props }) => {
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
};
