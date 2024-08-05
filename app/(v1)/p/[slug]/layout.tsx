import { ProjectsActions } from "actions/Projects/projects.actions";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { sharedMetadata } from "app/shared-metadata";

import ProjectsSidebar from "src/_pages/ProjectDetails/Sidebar";

import ClientLayout from "./components/client-layout/client-layout";

export async function generateMetadata(props: { params: { slug: string } }): Promise<Metadata> {
  const { params } = props;
  try {
    const project = await ProjectsActions.queries.retrieveBySlug(params.slug);
    return {
      ...sharedMetadata,
      title: `${project.name} - OnlyDust`,
      openGraph: {
        ...sharedMetadata.openGraph,
        title: `${project.name} - OnlyDust`,
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
  return (
    <div
      className="flex w-full flex-1 flex-col overflow-hidden border-0 border-t-0 border-black pt-4 xl:h-0 xl:flex-row xl:border-[24px] xl:border-t-0 xl:pt-0"
      style={{ boxSizing: "border-box" }}
    >
      <ProjectsSidebar />
      <ClientLayout>{children}</ClientLayout>
    </div>
  );
}
