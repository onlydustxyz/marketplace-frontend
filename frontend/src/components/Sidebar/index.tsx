type SidebarProps = React.PropsWithChildren;

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className={"flex flex-col gap-8 bg-zinc-900 p-6 font-walsheim bg-opacity-90 rounded-l-2xl"}>{children}</div>
  );
}
