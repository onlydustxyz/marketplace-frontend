"use client";

import LegacyImpersonationPage from "src/_pages/Impersonation";

import { withAdminGuard } from "components/features/auth0/guards/admin-guard";

function ImpersonationPage() {
  return <LegacyImpersonationPage />;
}

export default withAdminGuard(ImpersonationPage);
