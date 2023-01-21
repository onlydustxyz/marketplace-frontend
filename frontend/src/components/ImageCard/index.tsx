export enum BackgroundSize {
  Cover = "cover",
  Contain = "contain",
  Auto = "auto",
}

interface ImageCardProps extends React.PropsWithChildren {
  backgroundImageUrl: string;
  backgroundSize?: BackgroundSize;
  className?: string;
  dataTestId?: string;
}

export default function ImageCard({
  backgroundImageUrl,
  backgroundSize = BackgroundSize.Auto,
  className = "",
  dataTestId,
  children,
}: ImageCardProps) {
  return (
    <div
      className="w-full rounded-2xl"
      style={{
        background: `url(${backgroundImageUrl}), rgba(255, 255, 255, 0.08)`,
        backgroundPosition: "center",
        backgroundSize,
      }}
      data-testid={dataTestId}
    >
      <div className={`w-full bg-noise-heavy p-6 rounded-2xl font-walsheim ${className}`}>{children}</div>
    </div>
  );
}
