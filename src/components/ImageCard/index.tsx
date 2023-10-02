import classNames from "classnames";

export enum BackgroundPosition {
  Center = "center",
  TopLeft = "top left",
}

export enum BackgroundSize {
  Cover = "cover",
  Contain = "contain",
  Auto = "auto",
  Zoomed = "190%",
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

export enum Height {
  Fit = "fit",
  Full = "full",
}

interface ImageCardProps extends React.PropsWithChildren {
  backgroundImageUrl: string;
  backgroundPosition?: BackgroundPosition;
  backgroundSize?: BackgroundSize;
  backgroundNoise?: BackgroundNoise;
  width?: Width;
  height?: Height;
  dataTestId?: string;
}

export default function ImageCard({
  backgroundImageUrl,
  backgroundPosition = BackgroundPosition.Center,
  backgroundSize = BackgroundSize.Auto,
  backgroundNoise = BackgroundNoise.Heavy,
  width = Width.Full,
  height = Height.Full,
  dataTestId,
  children,
}: ImageCardProps) {
  return (
    <div
      className={classNames(
        "rounded-2xl",
        {
          "w-fit": width === Width.Fit,
          "w-full": width === Width.Full,
        },
        {
          "h-fit": height === Height.Fit,
          "h-full": height === Height.Full,
        }
      )}
      style={{
        background: `url(${backgroundImageUrl}), rgba(255, 255, 255, 0.08)`,
        backgroundPosition,
        backgroundSize,
      }}
      data-testid={dataTestId}
    >
      <div
        className={classNames(
          "rounded-2xl font-walsheim",
          {
            "w-fit": width === Width.Fit,
            "w-full": width === Width.Full,
          },
          {
            "bg-noise-light": backgroundNoise === BackgroundNoise.Light,
            "bg-noise-medium": backgroundNoise === BackgroundNoise.Medium,
            "bg-noise-heavy": backgroundNoise === BackgroundNoise.Heavy,
          }
        )}
      >
        {children}
      </div>
    </div>
  );
}
