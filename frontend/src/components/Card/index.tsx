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
}

export default function Card({
  selectable = false,
  className = "",
  border = CardBorder.Light,
  padded = true,
  dataTestId,
  children,
}: CardProps) {
  return (
    <div
      className={classNames(
        className,
        "w-full rounded-2xl font-walsheim",
        "pseudo-outline",
        "bg-white/2 backdrop-blur-lg",
        {
          "p-4 lg:p-6": padded,
        },
        {
          "transition duration-300 hover:bg-white/4": selectable,
          "hover:pseudo-outline-2": selectable,
        },
        {
          "before:border-greyscale-50/8": border === CardBorder.Light,
          "before:border-greyscale-50/12": border === CardBorder.Medium,
        }
      )}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
}
