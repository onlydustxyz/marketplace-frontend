import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";

export default function OnlyDustTitle() {
  const { T } = useIntl();
  return <img className="h-6" src={IMAGES.svg.onlydust.title} alt={T("images.onlyDustTitle")} loading="lazy" />;
}
