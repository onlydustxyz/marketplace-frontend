"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { CommitteeApplicantPrivatePage } from "app/c/[committeeId]/applicant/features/private-page/private-page";
import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";
import { CommitteeSuccessPage } from "app/c/[committeeId]/features/success-page/success-page";

export default function CommitteeApplicantPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  const Page = useMemo(() => {
    if (isAuthenticated && !hasSubmitted) {
      return <CommitteeApplicantPrivatePage onSuccessSubmit={() => setHasSubmitted(true)} />;
    }

    if (isAuthenticated && hasSubmitted) {
      return <CommitteeSuccessPage back={() => setHasSubmitted(false)} />;
    }

    return <CommitteePublicPage />;
  }, [hasSubmitted, isAuthenticated]);

  if (isLoading) {
    return <CommitteeLoadingPage />;
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="max-w-full overflow-hidden px-6 py-12">{Page}</div>
    </div>
  );
}
