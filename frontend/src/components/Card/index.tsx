interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
  backgroundImageUrl?: string;
  backgroundImageClassName?: string;
  className?: string;
  dataTestId?: string;
}

export default function Card({
  selectable = false,
  backgroundImageUrl,
  backgroundImageClassName = "",
  className = "",
  dataTestId,
  children,
}: ProjectCardProps) {
  return (
    <>
      {backgroundImageUrl && (
        <div
          className={`w-full rounded-xl ${backgroundImageClassName}`}
          style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundPosition: "center" }}
          data-testid={dataTestId}
        >
          <div
            className={`w-full bg-chineseBlack p-6 border-2 border-neutral-600/90 rounded-xl font-walsheim bg-opacity-50 backdrop-blur-xl ${
              selectable ? "transition hover:bg-opacity-80 hover:border-neutral-300/90 duration-400" : ""
            } ${className}`}
          >
            {children}
          </div>
        </div>
      )}
      {!backgroundImageUrl && (
        <div
          className={`w-full bg-white/[0.02] backdrop-blur-4xl p-6 border border-stone-100/[0.08] rounded-xl font-walsheim ${
            selectable ? "transition hover:bg-opacity-80 hover:border-neutral-300/70 duration-400" : ""
          } ${className}`}
          data-testid={dataTestId}
        >
          {children}
        </div>
      )}
    </>
  );
}
