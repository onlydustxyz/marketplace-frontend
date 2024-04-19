"use client";

import Contributors from "src/_pages/ProjectDetails/Contributors";

import { withClientOnly } from "components/layout/client-only/client-only";

function ContributorsPage() {
  return <Contributors />;
}

export default withClientOnly(ContributorsPage);
