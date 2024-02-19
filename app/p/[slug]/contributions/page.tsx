"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Contributions from "src/_pages/ProjectDetails/Contributions";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";

function ContributionPage() {
  return <Contributions />;
}

export default withAuthenticationRequired(withLeadRequired(ContributionPage));
