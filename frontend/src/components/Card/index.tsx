import headerElementBackground from "assets/img/grain-background.png";

interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
}

export default function Card({ selectable = false, children }: ProjectCardProps) {
  return (
    <div className="w-full rounded-xl" style={{ backgroundImage: `url(${headerElementBackground})` }}>
      <div className="w-full h-full bg-chineseBlack p-6 border border-neutral-600/70 rounded-xl font-walsheim bg-opacity-90 hover:bg-opacity-95">
        {children}
      </div>
    </div>
  );
}
