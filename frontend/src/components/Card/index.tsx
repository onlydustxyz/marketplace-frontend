import headerElementBackground from "assets/img/grain-background.png";

interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
  backgroundImageUrl?: string;
  backgroundImageClassName?: string;
}

export default function Card({
  selectable = false,
  backgroundImageUrl = headerElementBackground,
  backgroundImageClassName = "",
  children,
}: ProjectCardProps) {
  return (
    <div
      className={`w-full rounded-xl ${backgroundImageClassName}`}
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className={`w-full h-full bg-chineseBlack p-6 border border-neutral-600/70 rounded-xl font-walsheim bg-opacity-90 ${
          selectable ? "hover:bg-opacity-95" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
