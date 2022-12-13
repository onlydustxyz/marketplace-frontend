interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
}

export default function Card({ selectable = false, children }: ProjectCardProps) {
  return (
    <div
      className={`w-full bg-gradient-to-br from-fuchsia-800/40 to-fuchsia-900/10 px-8 py-8 border-2 rounded-lg font-walsheim ${
        selectable ? "hover:-translate-y-1 hover:scale-105 duration-200" : ""
      }`}
    >
      {children}
    </div>
  );
}
