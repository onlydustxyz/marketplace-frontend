"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import ProjectCreation from "src/_pages/ProjectCreation/ProjectCreation";

import { withClientOnly } from "components/layout/client-only/client-only";

function CreatePage() {
  return <ProjectCreation />;
}

export default withClientOnly(withAuthenticationRequired(CreatePage));
