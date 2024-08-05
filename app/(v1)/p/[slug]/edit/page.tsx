"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyEditPage from "src/_pages/ProjectDetails/ProjectEdition/ProjectEdition";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";

function EditPage() {
  return <LegacyEditPage />;
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(EditPage)));
