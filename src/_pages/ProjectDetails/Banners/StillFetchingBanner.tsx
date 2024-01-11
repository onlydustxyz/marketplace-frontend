import { useIntl } from "src/hooks/useIntl";
import Loader2Line from "src/icons/Loader2Line";
import ShinnyBanner, { CalloutSizes } from "src/components/New/Banners/ShinyBanner";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { useParams } from "react-router-dom";

export default function StillFetchingBanner({ size, className }: { size?: CalloutSizes; className?: string }) {
  const { T } = useIntl();
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });

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
