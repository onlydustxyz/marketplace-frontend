import ImageCard, { BackgroundNoise, BackgroundSize, Height, Width } from "src/components/ImageCard";
import { useIntl } from "src/hooks/useIntl";
import backgroundImage from "src/assets/img/total-earnings-background.png";
import { formatMoneyAmount } from "src/utils/money";

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
      <div className="flex w-80 min-w-min flex-col p-8">
        <span className="font-walsheim text-base font-semibold text-white">{T("contributor.totalEarnings")}</span>
        <span className="font-belwe text-5xl font-normal text-greyscale-50">{formatMoneyAmount({ amount })}</span>
      </div>
    </ImageCard>
  );
}
