"use client";

import LegacyPublicProfilePage from "src/_pages/PublicProfile";

import { withClientOnly } from "components/layout/client-only/client-only";

function PublicProfilePage() {
  return <LegacyPublicProfilePage />;
}

export default withClientOnly(PublicProfilePage);
