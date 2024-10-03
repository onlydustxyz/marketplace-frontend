"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { GithubState } from "src/utils/githubSetupLink";

import { NEXT_ROUTER } from "constants/router";

function handleNavigation(searchParams: ReturnType<typeof useSearchParams>, router: ReturnType<typeof useRouter>) {
  const installationId = searchParams.get("installation_id");
  const state = searchParams.get("state");

  if (installationId && !state) {
    router.push(`${NEXT_ROUTER.projects.creation}?installation_id=${installationId}`);
  } else if (installationId && state) {
    const isEdit = state.includes(GithubState.edit);
    const isClaim = state.includes(GithubState.claim);
    const isGeneric = state.includes(GithubState.generic);
    if (isGeneric) {
      window.location.href = `${process.env.NEXT_PUBLIC_SAAS_URL}/github-callback`;
      return;
    }
    if (isEdit) {
      router.push(
        `${NEXT_ROUTER.projects.details.edit(state.replace(GithubState.edit, ""))}?installation_id=${installationId}`
      );
    } else if (isClaim) {
      router.push(
        `${NEXT_ROUTER.projects.details.root(state.replace(GithubState.claim, ""))}?claim_callback=${installationId}`
      );
    }
  }
}

export default function GithubCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    handleNavigation(searchParams, router);
  }, [searchParams, router]);

  if (!searchParams.has("installation_id") && !searchParams.has("state")) {
    router.push(NEXT_ROUTER.home.all);
  }

  return null;
}
