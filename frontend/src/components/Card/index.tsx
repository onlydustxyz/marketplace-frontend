interface ProjectCardProps extends React.PropsWithChildren {
  selectable?: boolean;
  backgroundImageUrl?: string;
  backgroundImageClassName?: string;
}

export default function Card({
  selectable = false,
  backgroundImageUrl,
  backgroundImageClassName = "",
  children,
}: ProjectCardProps) {
  return (
    <>
      {backgroundImageUrl && (
        <div
          className={`w-full rounded-xl ${backgroundImageClassName}`}
          style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundPosition: "center" }}
        >
          <div
            className={`w-full h-full bg-chineseBlack p-6 border-2 border-neutral-600/90 rounded-xl font-walsheim bg-opacity-50 backdrop-blur-xl ${
              selectable ? "transition hover:bg-opacity-80 hover:border-neutral-300/90 duration-400" : ""
            }`}
          >
            {children}
          </div>
        </div>
      )}
      {!backgroundImageUrl && (
        <div
          className={`w-full h-full bg-chineseBlack p-6 border-2 border-neutral-600/70 rounded-xl font-walsheim bg-opacity-50 ${
            selectable ? "transition hover:bg-opacity-80 hover:border-neutral-300/70 duration-400" : ""
          }`}
        >
          {children}
        </div>
      )}
    </>
  );
}
