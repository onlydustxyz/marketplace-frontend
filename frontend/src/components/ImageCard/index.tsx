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

export enum Width {
  Fit = "fit",
  Full = "full",
}

interface ImageCardProps extends React.PropsWithChildren {
  backgroundImageUrl: string;
  backgroundSize?: BackgroundSize;
  backgroundNoise?: BackgroundNoise;
  width?: Width;
  dataTestId?: string;
}

export default function ImageCard({
  backgroundImageUrl,
  backgroundSize = BackgroundSize.Auto,
  backgroundNoise = BackgroundNoise.Heavy,
  width = Width.Full,
  dataTestId,
  children,
}: ImageCardProps) {
  return (
    <div
      className={`${width === Width.Fit ? "w-fit" : "w-full"} rounded-2xl`}
      style={{
        background: `url(${backgroundImageUrl}), rgba(255, 255, 255, 0.08)`,
        backgroundPosition: "center",
        backgroundSize,
      }}
      data-testid={dataTestId}
    >
      <div
        className={`${width === Width.Fit ? "w-fit" : "w-full"} bg-noise-${backgroundNoise} rounded-2xl font-walsheim`}
      >
        {children}
      </div>
    </div>
  );
}
