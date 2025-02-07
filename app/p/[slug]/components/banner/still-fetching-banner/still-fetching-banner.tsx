import { Banner } from "components/ds/banner/banner";
import { Translate } from "components/layout/translate/translate";

export function StillFetchingBanner() {
  const isProjectLeader = false;

  if (!isProjectLeader) {
    return null;
  }

  return (
    <Banner
      title={<Translate token="v2.features.banners.stillFetching.title" />}
      variant="multiColor"
      icon={{ remixName: "ri-loader-2-line" }}
    />
  );
}
