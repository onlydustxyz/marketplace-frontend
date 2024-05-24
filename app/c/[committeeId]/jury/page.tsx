"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";
import { CommitteeJuryPrivatePage } from "app/c/[committeeId]/jury/features/private-page/private-page";

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
    <div className="scrollbar-sm my-auto flex w-full items-start justify-center">
      <div className="w-full overflow-hidden px-6 py-12">{Page}</div>
    </div>
  );
}
