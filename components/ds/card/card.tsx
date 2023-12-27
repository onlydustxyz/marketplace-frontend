import React from "react";
import { cn } from "src/utils/cn";
import { getBorderClass } from "./card.utils";
import { CardBorder } from "./card.types";

interface CardProps extends React.PropsWithChildren {
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
  hasPadding?: boolean;
  isFullWidth?: boolean;
  hasBackground?: boolean;
  onClick?: () => void;
}

export default function Card({
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
    <div
      className={cn(
        "rounded-2xl font-walsheim",
        {
          "bg-whiteFakeOpacity-2": hasBackground,
          "w-full": isFullWidth,
          "p-4 lg:p-6": hasPadding,
          "cursor-pointer": !!onClick,
        },
        getBorderClass(border),
        className
      )}
      data-testid={dataTestId}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
