import { UsersActions } from "actions/Users/users.actions";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  const { params } = props;
  try {
    const user = await UsersActions.queries.retrieveByGithubLogin(params.slug);
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

export default function ProjectLayout({ children }: PropsWithChildren) {
  return children;
}
