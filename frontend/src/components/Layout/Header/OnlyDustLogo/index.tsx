import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustLogo() {
  const { T } = useIntl();
  return <img className="md:w-12 w-6" src={onlyDustLogo} alt={T("images.onlyDustLogo")} />;
}
