"use client";

import { useAuth0 } from "@auth0/auth0-react";

import { CommitteePublicPage } from "app/c/[committeeId]/features/public-page/public-page";

export default function CommitteeJuryPage() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="scrollbar-sm my-auto flex items-start justify-center">
      <div className="px-6 py-12">{isAuthenticated ? <div>TODO</div> : <CommitteePublicPage />}</div>
    </div>
  );
}
