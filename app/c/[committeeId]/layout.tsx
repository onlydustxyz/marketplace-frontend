import { committeeApiClient } from "api-client/resources/committees";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

export async function generateMetadata(props: { params: { committeeId: string } }): Promise<Metadata> {
  try {
    const committee = await committeeApiClient.fetch.getPublicCommittee(props.params.committeeId).request();
    return {
      ...sharedMetadata,
      title: committee.name,
      description:
        "Apply for a grant to boost your open-source project. Selected projects will receive funding to further their innovation. Don’t miss out!",
      openGraph: {
        ...sharedMetadata.openGraph,
        title: committee.name,
        description:
          "Apply for a grant to boost your open-source project. Selected projects will receive funding to further their innovation. Don’t miss out!",
      },
      twitter: {
        title: committee.name,
        description:
          "Apply for a grant to boost your open-source project. Selected projects will receive funding to further their innovation. Don’t miss out!",
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}
export default function CommitteeLayout({ children }: PropsWithChildren) {
  return children;
}
