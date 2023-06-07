import onlyDustLogo from "assets/img/onlydust-logo.png";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import ClickableUser from "src/components/ClickableUser";

export type Contributor = {
  id?: number;
  avatarUrl: string;
  login: string;
  isRegistered: boolean;
};

type Props = {
  contributor: Contributor;
};

export default function Contributor({ contributor }: Props) {
  const { T } = useIntl();

  return (
    <div className="flex items-center gap-1.5">
      <ClickableUser name={contributor.login} avatarUrl={contributor.avatarUrl} githubUserId={contributor.id} />
      {contributor.isRegistered && (
        <>
          <img
            id={`od-logo-${contributor.login}`}
            src={onlyDustLogo}
            className="h-3.5 mt-px"
            {...withTooltip(T("contributor.table.userRegisteredTooltip"), { className: "w-36" })}
          />
        </>
      )}
    </div>
  );
}
