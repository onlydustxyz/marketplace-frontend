import RainbowBanner from "src/components/New/Banners/RainbowBanner";
import { useIntl } from "src/hooks/useIntl";
import LoaderTwo from "src/icons/LoaderTwo";

type StillFetchingBannerProps = {
  createdAt: string;
};

const shouldDisplayBanner = (createdAt: string): boolean => {
  const createdAtDate = new Date(createdAt);
  const currentTime = new Date();
  const tenMinutesInMilliseconds = 10 * 60 * 1000;

  console.log("createdAtDate", createdAtDate);
  console.log("currentTime", currentTime);

  return currentTime.getTime() - createdAtDate.getTime() < tenMinutesInMilliseconds;
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
    <RainbowBanner
      icon={<LoaderTwo className="text-xl font-normal text-white" />}
      description={T("project.stillFetching")}
    />
  );
}
