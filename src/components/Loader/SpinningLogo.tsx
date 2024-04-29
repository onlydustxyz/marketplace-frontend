import { IMAGES } from "src/assets/img";

import { useIntl } from "hooks/translate/use-translate";

export function SpinningLogo() {
  const { T } = useIntl();

  return <img src={IMAGES.icons.atom} alt={T("state.loading")} className="h-24 w-24 animate-spin-medium" />;
}
