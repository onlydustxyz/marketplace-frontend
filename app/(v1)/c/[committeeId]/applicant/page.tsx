"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { CommitteeApplicantPrivatePage } from "app/(v1)/c/[committeeId]/applicant/features/private-page/private-page";
import { CommitteeLoadingPage } from "app/(v1)/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/(v1)/c/[committeeId]/features/public-page/public-page";
import { CommitteeSuccessPage } from "app/(v1)/c/[committeeId]/features/success-page/success-page";

export default function CommitteeApplicantPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  const Page = useMemo(() => {
    if (isLoading) {
      return <CommitteeLoadingPage />;
    }

    if (isAuthenticated && !hasSubmitted) {
      return <CommitteeApplicantPrivatePage onSuccessSubmit={() => setHasSubmitted(true)} />;
    }

    if (isAuthenticated && hasSubmitted) {
      return <CommitteeSuccessPage back={() => setHasSubmitted(false)} />;
    }

    return <CommitteePublicPage type="applicant" />;
  }, [isLoading, hasSubmitted, isAuthenticated]);

  return (
    <div className="scrollbar-sm my-auto flex w-full items-start justify-center">
      <div className="w-full overflow-hidden px-6 py-12">{Page}</div>
    </div>
  );
}
