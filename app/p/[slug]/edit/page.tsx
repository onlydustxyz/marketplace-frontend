"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";

export function EditPage() {
  return <div>EditPage</div>;
}

export default withAuthenticationRequired(withLeadRequired(EditPage));
