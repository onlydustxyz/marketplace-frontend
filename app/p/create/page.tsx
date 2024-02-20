"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import ProjectCreation from "src/_pages/ProjectCreation/ProjectCreation";

function CreatePage() {
  return <ProjectCreation />;
}

export default withAuthenticationRequired(CreatePage);
