import headerElementBackground from "assets/img/grain-background.png";

interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
}

export default function Card({ selectable = false, children }: ProjectCardProps) {
  return (
    <div className="rounded-xl" style={{ backgroundImage: `url(${headerElementBackground})` }}>
      <div
        className={`w-full bg-chineseBlack px-8 py-8 border border-neutral-600 rounded-xl font-walsheim bg-opacity-90 ${
          selectable ? "hover:-translate-y-1 hover:scale-105 duration-200" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
