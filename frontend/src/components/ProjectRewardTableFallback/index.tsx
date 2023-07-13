import paymentLogo from "assets/img/payment.png";
import { Link } from "react-router-dom";
import { ProjectRewardsRoutePaths } from "src/App";
import CurrencyLine from "src/icons/CurrencyLine";
import { useT } from "talkr";
import Button, { ButtonSize, Width } from "src/components/Button";
import { withTooltip } from "src/components/Tooltip";

interface Props {
  disabled?: boolean;
}

const ProjectRewardTableFallback = ({ disabled = false }: Props) => {
  const { T } = useT();
  return (
    <div className="flex w-full flex-col items-center gap-8 p-2">
      <div className="w-36">
        <img src={paymentLogo} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-belwe text-2xl leading-8 text-greyscale-50">
          {T("project.details.tableFallback.noRewards")}
        </span>
        <span className="font-walsheim text-base leading-6 text-greyscale-50">
          {T("project.details.tableFallback.send")}
        </span>
      </div>
      {disabled ? (
        <div {...withTooltip(T("project.details.tableFallback.disabledButtonTooltip"))}>
          <Button size={ButtonSize.Lg} disabled>
            <CurrencyLine />
            <span>{T("project.details.tableFallback.newReward")}</span>
          </Button>
        </div>
      ) : (
        <Link to={ProjectRewardsRoutePaths.New}>
          <Button width={Width.Full} size={ButtonSize.Lg}>
            <CurrencyLine />
            <span>{T("project.details.tableFallback.newReward")}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectRewardTableFallback;
