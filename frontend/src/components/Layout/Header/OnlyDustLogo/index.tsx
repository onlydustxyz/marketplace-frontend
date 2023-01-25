import onlyDustLogo from "assets/img/onlydust-logo.png";
import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustLogo() {
  const { T } = useIntl();
  return (
    <Link to={RoutePaths.Projects} className="flex w-fit">
      <img className="md:w-10 w-6" src={onlyDustLogo} alt={T("images.onlyDustLogo")} />
    </Link>
  );
}
