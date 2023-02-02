import onlyDustLogo from "assets/img/onlydust-logo.png";
import classNames from "classnames";
import { MouseEventHandler } from "react";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tooltip from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import ExternalLinkLine from "src/icons/ExternalLinkLine";

export type Contributor = {
  avatarUrl: string;
  login: string;
  isRegistered: boolean;
};

type Props = {
  onClick?: MouseEventHandler<HTMLElement>;
  contributor: Contributor;
};
const Contributor = ({ onClick, contributor }: Props) => {
  const { T } = useIntl();
  const clickable = onClick !== undefined;

  return (
    <div
      onClick={onClick}
      className={classNames("flex items-center gap-3", {
        "group-hover/line:cursor-pointer": clickable,
      })}
    >
      <div>
        <RoundedImage
          src={contributor.avatarUrl}
          alt={contributor.login}
          size={ImageSize.Small}
          rounding={Rounding.Circle}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <div>
          <span
            className={classNames("text-spacePurple-200 font-medium text-sm", {
              "group-hover/line:underline decoration-1 underline-offset-1": clickable,
            })}
          >
            {contributor.login}
          </span>
        </div>
        {contributor.isRegistered && (
          <div className="relative group/od-logo">
            <img src={onlyDustLogo} className="h-3.5 mt-px" />
            <div className="invisible group-hover/od-logo:visible absolute top-5 -left-16 w-36 z-10">
              <Tooltip>{T("contributor.table.userRegisteredTooltip")}</Tooltip>
            </div>
          </div>
        )}
      </div>
      {clickable && (
        <div className="ml-1 mt-0.5">
          <ExternalLinkLine className="text-spacePurple-500 invisible group-hover/line:visible" />
        </div>
      )}
    </div>
  );
};

export default Contributor;
