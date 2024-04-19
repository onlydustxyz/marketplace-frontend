"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import RewardList from "src/_pages/ProjectDetails/Rewards/List";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function RewardsPage() {
  return <RewardList />;
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(RewardsPage)));
