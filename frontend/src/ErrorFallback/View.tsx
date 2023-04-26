import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";
import { useIntl } from "src/hooks/useIntl";
import Button, { ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import Refresh from "src/icons/Refresh";

type Props = {
  onBackClicked?: () => void;
  onRefreshClicked?: () => void;
};

export default function View({ onBackClicked, onRefreshClicked }: Props) {
  const { T } = useIntl();

  const [begin, link, end] = T("state.error.description").split("_");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-12">
      <OnlyDustCrashedLogo />
      <div className="flex flex-col gap-6 w-72">
        <div className="font-normal font-belwe text-3xl text-greyscale-50">{T("state.error.title")}</div>
        <div className="font-normal font-walsheim text-lg text-spaceBlue-200 px-3.5">
          {begin}
          <a className="underline" href={"mailto:contact@onlydust.xyz"}>
            {link}
          </a>
          {end}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button type={ButtonType.Secondary} onClick={onBackClicked}>
          <ArrowLeftSLine className="text-xl" /> {T("state.error.back")}
        </Button>
        <Button onClick={onRefreshClicked}>
          <Refresh className="text-xl" /> {T("state.error.refresh")}
        </Button>
      </div>
    </div>
  );
}
