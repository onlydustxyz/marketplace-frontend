import type { Metadata } from "next";

import { ProjectsActions } from "../../actions/Projects/projects.actions.ts";
import { UsersActions } from "../../actions/Users/users.actions.ts";
import { sharedMetadata } from "../shared-metadata.ts";

export async function generateMetadata(props: { params: { slug: string[] } }): Promise<Metadata> {
  const { params } = props;
  try {
    /** project metadata */
    if (params?.slug?.length > 1 && params?.slug[0] === "p" && !!params?.slug[1]) {
      const project = await ProjectsActions.queries.retrieveBySlug(params.slug[1]);
      return {
        ...sharedMetadata,
        title: `${project.name} - OnlyDust`,
        openGraph: {
          ...sharedMetadata.openGraph,
          title: `${project.name} - OnlyDust`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/p/${project.slug}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
            },
          ],
        },
        twitter: {
          ...sharedMetadata.twitter,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/p/${project.slug}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
            },
          ],
        },
      };
    }
    /** user metadata */
    if (params?.slug?.length > 1 && params?.slug[0] === "u" && !!params?.slug[1]) {
      const user = await UsersActions.queries.retrieveByGithubLogin(params.slug[1]);
      return {
        ...sharedMetadata,
        openGraph: {
          ...sharedMetadata.openGraph,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/u/${user.login}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
            },
          ],
        },
        twitter: {
          ...sharedMetadata.twitter,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/u/${user.login}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.",
            },
          ],
        },
      };
    }
    return sharedMetadata;
  } catch {
    return sharedMetadata;
  }
}

export default function GenericLayout({ children }: { children: React.ReactNode }) {
  return children;
}
