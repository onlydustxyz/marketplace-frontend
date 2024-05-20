"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteeApplicantPrivatePage } from "app/c/[committeeId]/applicant/features/private-page";
import { CommitteeApplicantPublicPage } from "app/c/[committeeId]/applicant/features/public-page";

export default function CommitteeApplicantPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="flex h-full items-center justify-center p-6">
      {isAuthenticated ? <CommitteeApplicantPrivatePage /> : <CommitteeApplicantPublicPage />}
    </div>
  );
}
