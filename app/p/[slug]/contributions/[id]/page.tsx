"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { notFound, useParams } from "next/navigation";

import ProjectApi from "src/api/Project";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Flex } from "components/layout/flex/flex";

import { ContributionHeader } from "./features/contribution-header/contribution-header";
import { ContributorDetails } from "./features/contributor-details/contributor-details";
import { ContributorSelect } from "./features/contributor-select/contributor-select";

function ContributionPage() {
  const { slug = "", id = "" } = useParams<{ slug?: string; id?: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const { data: contribution, isLoading: isLoadingContribution } = ProjectApi.queries.useGetProjectContributionDetail({
    params: { projectId: project?.id, contributionId: id },
    options: {
      enabled: !!project,
    },
  });

  if (!isLoadingProject && !isLoadingContribution && !contribution) {
    notFound();
  }

  return (
    <Flex direction="col" className="gap-6">
      <ContributionHeader title={contribution?.githubTitle} />

      <Flex className="gap-6">
        <ContributorSelect />
        <ContributorDetails />
      </Flex>
    </Flex>
  );
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(ContributionPage)));
