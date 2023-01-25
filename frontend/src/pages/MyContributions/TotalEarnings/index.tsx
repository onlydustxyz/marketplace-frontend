import ImageCard, { BackgroundNoise, BackgroundSize, Height, Width } from "src/components/ImageCard";
import { useIntl } from "src/hooks/useIntl";
import backgroundImage from "src/assets/img/total-earnings-background.png";
import { formatDollars } from "src/utils/money";

type Props = {
  amount: number;
};

export default function TotalEarnings({ amount }: Props) {
  const { T } = useIntl();

  return (
    <ImageCard
      backgroundImageUrl={backgroundImage}
      backgroundSize={BackgroundSize.Cover}
      backgroundNoise={BackgroundNoise.Medium}
      width={Width.Fit}
      height={Height.Fit}
    >
      <div className="flex flex-col p-8 w-80 min-w-min">
        <span className="text-base font-walsheim text-white font-semibold">{T("contributor.totalEarnings")}</span>
        <span className="text-5xl font-belwe text-greyscale-50 font-normal">{formatDollars(amount)}</span>
      </div>
    </ImageCard>
  );
}
