"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import RewardList from "src/_pages/ProjectDetails/Rewards/List";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";

function RewardsPage() {
  return <RewardList />;
}

export default withAuthenticationRequired(withLeadRequired(RewardsPage));
