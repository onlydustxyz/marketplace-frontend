export enum CardBorder {
  Light = "light",
  Medium = "medium",
}
interface CardProps extends React.PropsWithChildren {
  selectable?: boolean;
  className?: string;
  dataTestId?: string;
  border?: CardBorder;
}

export default function Card({
  selectable = false,
  className = "",
  border = CardBorder.Light,
  dataTestId,
  children,
}: CardProps) {
  return (
    <div
      className={`${className} w-full bg-white/2 backdrop-blur-lg p-6 outline outline-1 rounded-2xl font-walsheim ${
        selectable ? "transition duration-300 hover:bg-white/4 outline-offset-0 hover:outline-2" : ""
      } ${border === CardBorder.Light ? "outline-greyscale-50/8" : "outline-greyscale-50/12"} `}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
}
