type SidebarProps = React.PropsWithChildren;

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div
      className={
        "flex flex-col min-h-full shrink-0 w-80 gap-8 bg-noise-medium bg-white/4 p-6 font-walsheim rounded-l-2xl"
      }
    >
      {children}
    </div>
  );
}
