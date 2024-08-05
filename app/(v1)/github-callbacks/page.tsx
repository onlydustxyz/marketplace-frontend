"use client";

import LegacyGithubCallbackHandler from "src/_pages/Callbacks/GithubCallbackHandler";

import { withClientOnly } from "components/layout/client-only/client-only";

function GithubCallbacksPage() {
  return <LegacyGithubCallbackHandler />;
}

export default withClientOnly(GithubCallbacksPage);
