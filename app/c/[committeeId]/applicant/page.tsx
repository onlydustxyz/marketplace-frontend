"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteeApplicantPrivatePage } from "app/c/[committeeId]/applicant/features/private-page/private-page";
import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";

export default function CommitteeApplicantPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CommitteeLoadingPage />;
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="max-w-full overflow-hiddenpx-6 py-12">
        {isAuthenticated ? <CommitteeApplicantPrivatePage /> : <CommitteePublicPage type={"applicant"} />}
      </div>
    </div>
  );
}
