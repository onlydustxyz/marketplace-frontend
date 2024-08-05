"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "next/navigation";

import { ApplicationsTable } from "app/(v1)/p/[slug]/applications/features/applications-table/applications-table";

import { MissingGithubAppInstallBanner } from "src/_pages/ProjectDetails/Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "src/_pages/ProjectDetails/Banners/StillFetchingBanner";
import Title from "src/_pages/ProjectDetails/Title";
import { EditProjectButton } from "src/_pages/ProjectDetails/components/EditProjectButton";
import { RewardProjectButton } from "src/_pages/ProjectDetails/components/RewardProjectButton";
import ProjectApi from "src/api/Project";
import Flex from "src/components/Utils/Flex";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { withClientOnly } from "components/layout/client-only/client-only";

import { useIntl } from "hooks/translate/use-translate";

function ProjectApplicationsPage() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug?: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  return (
    <>
      <PosthogOnMount eventName={"project_applications_list_viewed"} />

      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.applications.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={slug} />
            {project && <RewardProjectButton project={project} />}
          </Flex>
        ) : null}
      </div>

      {!project?.indexingComplete && !isLoadingProject ? <StillFetchingBanner /> : null}

      {project && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      <ApplicationsTable projectId={project?.id} />
    </>
  );
}

export default withClientOnly(withAuthenticationRequired(withLeadRequired(ProjectApplicationsPage)));
