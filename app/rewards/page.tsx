"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyRewards from "src/_pages/Rewards";

function RewardsPage() {
  return <LegacyRewards />;
}

export default withAuthenticationRequired(RewardsPage);
