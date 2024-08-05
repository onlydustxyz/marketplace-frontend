"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import RewardForm from "src/_pages/ProjectDetails/Rewards/RewardForm";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function NewRewardsPage() {
  return <RewardForm />;
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(NewRewardsPage)));
