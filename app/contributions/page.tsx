"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyContributions from "src/_pages/Contributions/Contributions";

function ContributionsPage() {
  return <LegacyContributions />;
}

export default withAuthenticationRequired(ContributionsPage);
