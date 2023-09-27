import classNames from "classnames";

export enum CardBorder {
  Light = "light",
  Medium = "medium",
  MultiColor = "multiColor",
}
interface CardProps extends React.PropsWithChildren {
  selectable?: boolean;
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
  padded?: boolean;
  fullWidth?: boolean;
  withBg?: boolean;
}

export default function Card({
  selectable = false,
  className = "",
  border = CardBorder.Light,
  padded = true,
  fullWidth = true,
  withBg = true,
  dataTestId,
  children,
}: CardProps) {
  return (
    <div
      className={classNames(
        "rounded-2xl font-walsheim",
        {
          "bg-whiteFakeOpacity-2": withBg,
          "w-full": fullWidth,
          "p-4 lg:p-6": padded,
          "cursor-pointer": selectable,
        },
        {
          "border border-greyscale-50/8": border === CardBorder.Light,
          "border border-greyscale-50/12": border === CardBorder.Medium,
          "border-multicolored before:rounded-2xl": border === CardBorder.MultiColor,
        },
        className
      )}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
}
