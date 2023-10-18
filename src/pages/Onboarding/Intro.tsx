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
    <div className="px-4 pt-10">
      <Card
        fullWidth={true}
        padded={false}
        className="relative flex flex-col items-center bg-white/2 p-12 pt-[72px] xl:w-fit"
      >
        <div className="absolute -top-10">
          <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
        </div>
        <div className="flex flex-col items-center gap-6 xl:w-[592px]">
          <div className="text-center font-belwe text-3xl font-normal text-greyscale-50">
            {T("onboarding.intro.title")}
          </div>
          <div className="text-center font-walsheim text-base font-normal text-greyscale-50 xl:whitespace-pre">
            {T("onboarding.intro.description")}
          </div>
          <div className="flex flex-col items-center gap-6">
            <Button size={ButtonSize.Lg} onClick={start}>
              {T("onboarding.intro.acceptButton")}
            </Button>
            <div
              id="onboarding-skip"
              data-testid="onboarding-skip"
              onClick={skip}
              className="cursor-pointer font-walsheim text-sm font-medium text-greyscale-400"
            >
              {T("onboarding.intro.skip")}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
