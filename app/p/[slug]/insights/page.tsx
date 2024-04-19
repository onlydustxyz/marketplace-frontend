"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Insights from "src/_pages/ProjectDetails/Insights";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function InsightPage() {
  return <Insights />;
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(InsightPage)));
