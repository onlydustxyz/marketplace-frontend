"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";
import { ProjectsAccordion } from "app/c/[committeeId]/jury/features/projects-accordion/projects-accordion";

export default function CommitteeJuryPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CommitteeLoadingPage />;
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="px-6 py-12">
        {isAuthenticated ? (
          <ProjectsAccordion
            projects={[{ id: "123", name: "nice project", logoUrl: "", description: "awesome project", status: "" }]}
          />
        ) : (
          <CommitteePublicPage />
        )}
      </div>
    </div>
  );
}
