"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyContributions from "src/_pages/Contributions/Contributions";

import { withClientOnly } from "components/layout/client-only/client-only";

function ContributionsPage() {
  return <LegacyContributions />;
}

export default withClientOnly(withAuthenticationRequired(ContributionsPage));
