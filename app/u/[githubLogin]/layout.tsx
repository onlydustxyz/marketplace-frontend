import { usersApiClient } from "api-client/resources/users";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

export async function generateMetadata({ params }: { params: { githubLogin: string } }): Promise<Metadata> {
  try {
    const user = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(params.githubLogin).request();
    return {
      ...sharedMetadata,
      title: `${user.login} - OnlyDust`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${user.login} - OnlyDust`,
      },
      twitter: {
        ...sharedMetadata.twitter,
      },
    };
  } catch {
    return sharedMetadata;
  }
}

export default function PublicProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="scrollbar-sm relative z-[1] h-full w-full overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:px-12 md:py-14 md:pb-12 ">{children}</div>
    </div>
  );
}
