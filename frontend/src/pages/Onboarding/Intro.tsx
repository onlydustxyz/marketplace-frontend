import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Button, { ButtonSize } from "src/components/Button";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  start: () => void;
  skip: () => void;
};

export default function Intro({ start, skip }: Props) {
  const { T } = useIntl();

  return (
    <Card
      fullWidth={false}
      padded={false}
      className="relative w-fit pt-[72px] p-12 flex flex-col items-center bg-white/2"
    >
      <div className="absolute -top-10">
        <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
      </div>
      <div className="w-[592px] flex flex-col gap-6 items-center">
        <div className="font-normal font-belwe text-3xl text-greyscale-50">{T("onboarding.intro.title")}</div>
        <div className="font-normal font-walsheim text-base text-center text-greyscale-50 whitespace-pre">
          {T("onboarding.intro.description")}
        </div>
        <div className="flex flex-col items-center gap-6">
          <Button size={ButtonSize.Lg} onClick={start}>
            {T("onboarding.intro.acceptButton")}
          </Button>
          <div onClick={skip} className="font-medium font-walsheim text-sm text-greyscale-400 cursor-pointer">
            {T("onboarding.intro.skip")}
          </div>
        </div>
      </div>
    </Card>
  );
}
