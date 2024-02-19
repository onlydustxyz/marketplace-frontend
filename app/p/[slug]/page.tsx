"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import ProjectDetailsOverview from "src/_pages/ProjectDetails/Overview";

export function ProjectPage() {
  return <ProjectDetailsOverview />;
}

export default withAuthenticationRequired(ProjectPage);
