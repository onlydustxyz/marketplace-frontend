import { useIntl } from "src/hooks/useIntl";
import Loader2Line from "src/icons/Loader2Line";
import dayjs from "dayjs";
import ShinnyBanner from "src/components/New/Banners/ShinyBanner";
import { useProjectDetailsLastAddedRepoStorage } from "../hooks/useProjectDetailsStorage";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { useParams } from "react-router-dom";

type StillFetchingBannerProps = {
  createdAt: string;
};

const shouldDisplayBanner = (createdAt: string | undefined): boolean => {
  if (!createdAt) {
    return false;
  }
  return dayjs().isBefore(dayjs(createdAt).add(10, "minute"));
};

export default function StillFetchingBanner({ createdAt }: StillFetchingBannerProps) {
  const { T } = useIntl();
  const params = useParams();
  const isProjectLeader = useProjectLeader({ slug: params.projectKey });
  const { getValue } = useProjectDetailsLastAddedRepoStorage(params.projectKey || "");
  const canDisplay = shouldDisplayBanner(createdAt) || shouldDisplayBanner(getValue());

  if (!isProjectLeader) {
    return null;
  }

  if (!createdAt) {
    return null;
  }

  if (!canDisplay) {
    return null;
  }

  return (
    <ShinnyBanner
      icon={<Loader2Line className="text-xl font-normal text-white" />}
      description={T("project.stillFetching")}
    />
  );
}
