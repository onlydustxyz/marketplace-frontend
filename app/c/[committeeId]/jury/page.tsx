"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { meApiClient } from "api-client/resources/me";
import { useParams } from "next/navigation";

import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";
import { ProjectsAccordion } from "app/c/[committeeId]/jury/features/projects-accordion/projects-accordion";

export default function CommitteeJuryPage() {
  const { committeeId } = useParams();
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuth0();
  const {
    data,
    isLoading: isLoadingCommittee,
    isError,
  } = meApiClient.queries.useGetMyCommitteeAssignments(typeof committeeId === "string" ? committeeId : "");

  if (isLoadingAuth || isLoadingCommittee) {
    return <CommitteeLoadingPage />;
  }

  if (isError) {
    // TODO
    return "Error";
  }

  if (!data) {
    // TODO
    return "Empty";
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="px-6 py-12">
        {isAuthenticated ? <ProjectsAccordion projectAssignments={data.projectAssignments} /> : <CommitteePublicPage />}
      </div>
    </div>
  );
}
