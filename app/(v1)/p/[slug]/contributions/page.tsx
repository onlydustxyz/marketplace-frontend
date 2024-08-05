"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Contributions from "src/_pages/ProjectDetails/Contributions";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function ContributionsPage() {
  return <Contributions />;
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(ContributionsPage)));
