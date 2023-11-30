import { useIntl } from "src/hooks/useIntl";
import Loader2Line from "src/icons/Loader2Line";
import dayjs from "dayjs";
import ShinnyBanner from "src/components/New/Banners/ShinyBanner";

type StillFetchingBannerProps = {
  createdAt: string;
};

const shouldDisplayBanner = (createdAt: string): boolean => {
  return dayjs().isBefore(dayjs(createdAt).add(10, "minute"));
};

export default function StillFetchingBanner({ createdAt }: StillFetchingBannerProps) {
  const { T } = useIntl();
  const canDisplay = shouldDisplayBanner(createdAt);

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
