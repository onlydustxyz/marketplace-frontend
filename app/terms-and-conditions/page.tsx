"use client";

import LegacyTermsAndConditions from "src/_pages/TermsAndConditions/index";

import { withClientOnly } from "components/layout/client-only/client-only";

function TermsAndConditionsPage() {
  return <LegacyTermsAndConditions />;
}

export default withClientOnly(TermsAndConditionsPage);
