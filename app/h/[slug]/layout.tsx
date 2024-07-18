import { hackathonsApiClient } from "api-client/resources/hackathons";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

import { Container } from "components/layout/container/container";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  try {
    const hackathon = await hackathonsApiClient.fetch.getHackathonBySlug(props.params.slug).request();
    return {
      ...sharedMetadata,
      title: `${hackathon.title}`,
      description: `${hackathon.description}`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${hackathon.title}`,
        description: `${hackathon.description}`,
      },
      twitter: {
        title: `${hackathon.title}`,
        description: `${hackathon.description}`,
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
      <Container>
        <div className="pt-6">{children}</div>
      </Container>
    </ScrollView>
  );
}
