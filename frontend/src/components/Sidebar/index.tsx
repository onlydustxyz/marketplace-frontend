type SidebarProps = React.PropsWithChildren;

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className={"flex flex-col shrink-0 w-96 gap-8 bg-white/[0.04] p-6 font-walsheim rounded-l-2xl"}>
      {children}
    </div>
  );
}
