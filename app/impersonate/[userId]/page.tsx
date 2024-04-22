"use client";

import LegacyImpersonationPage from "src/_pages/Impersonation";

import { withAdminGuard } from "components/features/auth0/guards/admin-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function ImpersonationPage() {
  return <LegacyImpersonationPage />;
}

export default withClientOnly(withAdminGuard(ImpersonationPage));
