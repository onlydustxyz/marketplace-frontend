"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyRewards from "src/_pages/Rewards";

import { withClientOnly } from "components/layout/client-only/client-only";

function RewardsPage() {
  return <LegacyRewards />;
}

export default withClientOnly(withAuthenticationRequired(RewardsPage));
