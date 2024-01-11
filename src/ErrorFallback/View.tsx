import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";
import { useIntl } from "src/hooks/useIntl";
import Button, { ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import Refresh from "src/icons/Refresh";
import { cn } from "src/utils/cn";

type Props = {
  isFixed?: boolean;
  onBackClicked?: () => void;
  onRefreshClicked?: () => void;
};

export default function View({ onBackClicked, onRefreshClicked, isFixed }: Props) {
  const { T } = useIntl();

  const [begin, link, end] = T("state.error.description").split("_");

  return (
    <div
      className={cn(
        "flex min-h-[calc(100dvh)] flex-col items-center justify-center gap-12 text-center",
        isFixed && "fixed left-0 top-0 min-w-[calc(100dvw)] bg-black"
      )}
    >
      <OnlyDustCrashedLogo />
      <div className="flex w-72 flex-col gap-6">
        <div className="font-belwe text-3xl font-normal text-greyscale-50">{T("state.error.title")}</div>
        <div className="px-3.5 font-walsheim text-lg font-normal text-spaceBlue-200">
          {begin}
          <a className="underline" href={"mailto:contact@onlydust.xyz"}>
            {link}
          </a>
          {end}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
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
