import classNames from "classnames";

export enum CardBorder {
  Light = "light",
  Medium = "medium",
}
interface CardProps extends React.PropsWithChildren {
  selectable?: boolean;
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
  padded?: boolean;
  blurred?: boolean;
  fullWidth?: boolean;
  outline?: boolean;
}

export default function Card({
  selectable = false,
  className = "",
  border = CardBorder.Light,
  padded = true,
  blurred = true,
  fullWidth = true,
  outline = true,
  dataTestId,
  children,
}: CardProps) {
  return (
    <div
      className={classNames(
        "rounded-2xl font-walsheim",
        {
          "pseudo-outline": outline,
        },
        {
          "w-full": fullWidth,
        },
        {
          "p-4 lg:p-6": padded,
        },
        {
          "backdrop-blur-lg": blurred,
        },
        {
          "transition duration-300 hover:cursor-pointer hover:bg-white/4": selectable,
          "hover:pseudo-outline-2": selectable,
        },
        {
          "before:border-greyscale-50/8": outline && border === CardBorder.Light,
          "before:border-greyscale-50/12": outline && border === CardBorder.Medium,
        },
        className
      )}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
}
