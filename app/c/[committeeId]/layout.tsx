import { committeeApiClient } from "api-client/resources/committees";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

export async function generateMetadata(props: { params: { committeeId: string } }): Promise<Metadata> {
  try {
    const committee = await committeeApiClient.fetch.getPublicCommittee(props.params.committeeId).request();
    return {
      ...sharedMetadata,
      title: `${committee.name}`,
      description: "description",
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${committee.name}`,
        description: "description",
      },
      twitter: {
        title: `${committee.name}`,
        description: "description",
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}
export default function HackathonLayout({ children }: PropsWithChildren) {
  return children;
}
