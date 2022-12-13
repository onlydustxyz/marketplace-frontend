import onlyDustLogo from "assets/img/onlydust-logo.png";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustLogo() {
  const { T } = useIntl();
  return <img className="md:w-32 w-16 hover:opacity-90" src={onlyDustLogo} alt={T("images.onlyDustLogo")} />;
}
