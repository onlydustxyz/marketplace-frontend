import { useParams } from "next/navigation";

import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";

import { Banner } from "components/ds/banner/banner";
import { Translate } from "components/layout/translate/translate";

// TODO: Add the border style
export function StillFetchingBanner() {
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const isProjectLeader = useProjectLeader({ slug: projectKey });

  if (!isProjectLeader) {
    return null;
  }

  return (
    <Banner
      title={<Translate token="project.stillFetching" />}
      variant="rainbow"
      hasBorder
      icon={{ remixName: "ri-loader-2-line" }}
    />
  );
}
