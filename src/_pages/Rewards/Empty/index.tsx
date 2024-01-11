import { IMAGES } from "src/assets/img";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

interface Props {
  activeFilter?: boolean;
  activeFilterButtonEvent?: () => void;
}

const UseRewardsEmptyState = ({ activeFilter = false, activeFilterButtonEvent }: Props) => {
  const { T } = useIntl();
  return (
    <div className={cn("flex w-full flex-col items-center gap-8 p-2 pt-8")}>
      <div className="w-36">
        <img
          src={activeFilter ? IMAGES.icons.compass : IMAGES.global.payment}
          loading="lazy"
          alt={T("myRewards.tableFallback.title")}
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-belwe text-2xl leading-8 text-greyscale-50">
          {activeFilter ? T("myRewards.tableFallback.withFilter.title") : T("myRewards.tableFallback.title")}
        </span>
        <span className="font-walsheim text-base leading-6 text-greyscale-50">
          {activeFilter ? T("myRewards.tableFallback.withFilter.message") : T("myRewards.tableFallback.message")}
        </span>
      </div>
      {activeFilter && activeFilterButtonEvent ? (
        <Button
          onBackground={ButtonOnBackground.Blue}
          className="flex-1 md:flex-initial"
          size={ButtonSize.Lg}
          onClick={activeFilterButtonEvent}
        >
          {T("myRewards.tableFallback.withFilter.buttonLabel")}
        </Button>
      ) : null}
    </div>
  );
};

export default UseRewardsEmptyState;
