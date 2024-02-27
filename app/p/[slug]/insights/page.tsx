"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Insights from "src/_pages/ProjectDetails/Insights";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";

function InsightPage() {
  return <Insights />;
}

export default withAuthenticationRequired(withLeadRequired(InsightPage));
