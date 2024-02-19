"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import LegacyEditPage from "src/_pages/ProjectDetails/ProjectEdition/ProjectEdition";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";

export function EditPage() {
  return <LegacyEditPage />;
}

export default withAuthenticationRequired(withLeadRequired(EditPage));
