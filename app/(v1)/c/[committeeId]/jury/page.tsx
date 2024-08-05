"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

import { CommitteeLoadingPage } from "app/(v1)/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/(v1)/c/[committeeId]/features/public-page/public-page";
import { CommitteeJuryPrivatePage } from "app/(v1)/c/[committeeId]/jury/features/private-page/private-page";

export default function CommitteeJuryPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  const Page = useMemo(() => {
    if (isLoading) {
      return <CommitteeLoadingPage />;
    }

    if (isAuthenticated) {
      return <CommitteeJuryPrivatePage />;
    }

    return <CommitteePublicPage type="jury" />;
  }, [isLoading, isAuthenticated]);

  return (
    <div className="scrollbar-sm flex w-full items-start justify-center sm:my-auto">
      <div className="w-full overflow-hidden px-0 py-0 sm:px-6 sm:py-12">{Page}</div>
    </div>
  );
}
