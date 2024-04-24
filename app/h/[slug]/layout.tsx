import { hackathonsApiClient } from "api-client/resources/hackathons";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  try {
    const hackathon = await hackathonsApiClient.fetch.getHackathonBySlug(props.params.slug).request();
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
    <div
      className="flex w-full flex-1 flex-col overflow-hidden border-0 border-t-0 border-black pt-4 xl:h-0 xl:flex-row xl:border-[24px] xl:border-t-0 xl:pt-0"
      style={{ boxSizing: "border-box" }}
    >
      {children}
    </div>
  );
}
