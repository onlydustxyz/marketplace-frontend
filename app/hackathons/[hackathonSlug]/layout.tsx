import { bootstrap } from "core/bootstrap";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export async function generateMetadata(props: { params: { hackathonSlug: string } }): Promise<Metadata> {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
    const hackathon = await hackathonStorage
      .getHackathonBySlug({ pathParams: { hackathonSlug: props.params.hackathonSlug } })
      .request();

    return {
      ...sharedMetadata,
      title: `${hackathon.title}`,
      description: `${hackathon.subtitle}`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${hackathon.title}`,
        description: `${hackathon.subtitle}`,
      },
      twitter: {
        title: `${hackathon.title}`,
        description: `${hackathon.subtitle}`,
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}
export default function HackathonLayout({ children }: PropsWithChildren) {
  return (
    <ScrollView>
      <Container>{children}</Container>
    </ScrollView>
  );
}
