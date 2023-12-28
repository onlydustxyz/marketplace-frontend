import React, { ElementType } from "react";
import { cn } from "src/utils/cn";
import { CardBorder } from "./card.types";
import { tv } from "tailwind-variants";

const cardVariant = tv({
  base: "rounded-2xl font-walsheim",
  variants: {
    hasBackground: {
      true: "bg-whiteFakeOpacity-2",
      false: "",
    },
    isFullWidth: {
      true: "w-full",
      false: "",
    },
    hasPadding: {
      true: "p-4 lg:p-6",
      false: "",
    },
    cursor: {
      true: "cursor-pointer",
      false: "",
    },
    border: {
      light: "border border-greyscale-50/8",
      medium: "border border-greyscale-50/12",
      multiColor: "border-multicolored before:rounded-2xl",
    },
  },
});

interface CardProps extends React.PropsWithChildren {
  as?: ElementType;
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
  hasPadding?: boolean;
  isFullWidth?: boolean;
  hasBackground?: boolean;
  onClick?: () => void;
}

export default function Card({
  as: Component = "div",
  className = "",
  dataTestId,
  border = "light",
  hasPadding = true,
  isFullWidth = true,
  hasBackground = true,
  onClick,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        cardVariant({
          hasBackground,
          isFullWidth,
          hasPadding,
          cursor: !!onClick,
          border,
        }),
        className
      )}
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
