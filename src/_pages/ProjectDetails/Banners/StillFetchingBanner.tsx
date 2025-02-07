import ShinnyBanner, { CalloutSizes } from "src/components/New/Banners/ShinyBanner";
import Loader2Line from "src/icons/Loader2Line";

import { useIntl } from "hooks/translate/use-translate";

export default function StillFetchingBanner({ size, className }: { size?: CalloutSizes; className?: string }) {
  const { T } = useIntl();

  const isProjectLeader = false;

  if (!isProjectLeader) {
    return null;
  }

  return (
    <ShinnyBanner
      icon={<Loader2Line className="text-xl font-normal text-white" />}
      description={T("project.stillFetching")}
      className={className}
      size={size}
    />
  );
}
