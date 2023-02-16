import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustLogo() {
  const { T } = useIntl();
  return <img className="w-10 w-6" src={onlyDustLogo} alt={T("images.onlyDustLogo")} />;
}
