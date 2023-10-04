import atomLogo from "assets/img/atom.png";
import { useIntl } from "src/hooks/useIntl";

export function SpinningLogo() {
  const { T } = useIntl();

  return <img src={atomLogo} alt={T("state.loading")} className="h-24 w-24 animate-spin-medium" />;
}
