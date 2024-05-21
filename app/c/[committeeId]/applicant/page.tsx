"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteeApplicantPrivatePage } from "app/c/[committeeId]/applicant/features/private-page/private-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";

import { SkeletonEl } from "components/ds/skeleton/skeleton";

export default function CommitteeApplicantPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="m-auto flex items-center justify-center">
        <div className="px-6 py-12">
          <div className={"mx-auto w-screen max-w-3xl"}>
            <SkeletonEl width={"100%"} height={318} variant={"rounded"} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="px-6 py-12">{isAuthenticated ? <CommitteeApplicantPrivatePage /> : <CommitteePublicPage />}</div>
    </div>
  );
}
