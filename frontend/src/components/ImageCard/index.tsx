export enum BackgroundSize {
  Cover = "cover",
  Contain = "contain",
  Auto = "auto",
}

export enum BackgroundNoise {
  Light = "light",
  Medium = "medium",
  Heavy = "heavy",
}

interface ImageCardProps extends React.PropsWithChildren {
  backgroundImageUrl: string;
  backgroundSize?: BackgroundSize;
  backgroundNoise?: BackgroundNoise;
  dataTestId?: string;
}

export default function ImageCard({
  backgroundImageUrl,
  backgroundSize = BackgroundSize.Auto,
  backgroundNoise = BackgroundNoise.Heavy,
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
      <div className={`w-full bg-noise-${backgroundNoise} rounded-2xl font-walsheim`}>{children}</div>
    </div>
  );
}
