import headerElementBackground from "assets/img/grain-background.png";

type SidebarProps = React.PropsWithChildren;

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className={`rounded-xl`} style={{ backgroundImage: `url(${headerElementBackground})` }}>
      <div className={`h-full bg-zinc-900 p-6 border border-neutral-600/70 rounded-xl font-walsheim bg-opacity-90`}>
        {children}
      </div>
    </div>
  );
}
