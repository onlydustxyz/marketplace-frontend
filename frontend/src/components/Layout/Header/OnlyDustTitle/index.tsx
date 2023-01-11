import onlyDustTitle from "assets/img/onlydust-title.svg";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustTitle() {
  const { T } = useIntl();
  return <img className="md:h-6 h-4" src={onlyDustTitle} alt={T("images.onlyDustTitle")} />;
}
