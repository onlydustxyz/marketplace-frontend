import onlyDustTitle from "assets/img/onlydust-title.svg";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustTitle() {
  const { T } = useIntl();
  return <img className="h-6" src={onlyDustTitle} alt={T("images.onlyDustTitle")} />;
}
