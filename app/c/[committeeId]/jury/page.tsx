"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteeLoadingPage } from "app/c/[committeeId]/features/loading-page/loading-page";
import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";
import { CommitteeJuryPrivatePage } from "app/c/[committeeId]/jury/features/private-page/private-page";

export default function CommitteeJuryPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CommitteeLoadingPage />;
  }

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="max-w-full overflow-hidden px-6 py-12">
        {isAuthenticated ? <CommitteeJuryPrivatePage /> : <CommitteePublicPage type={"jury"} />}
      </div>
    </div>
  );
}
