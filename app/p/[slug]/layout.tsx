import { PropsWithChildren } from "react";

import ProjectsSidebar from "src/_pages/ProjectDetails/Sidebar";

import { ClientLayout } from "./components/client-layout/client-layout";

export default function ProjectLayout({ children }: PropsWithChildren) {
  return (
    <div
      className="flex w-full flex-1 flex-col overflow-hidden border-[24px] border-t-0 border-black pt-4 xl:h-0 xl:flex-row xl:pt-0"
      style={{ boxSizing: "border-box" }}
    >
      <ProjectsSidebar />
      <ClientLayout>{children}</ClientLayout>
    </div>
  );
}
