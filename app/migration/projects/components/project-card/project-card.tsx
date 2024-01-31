import { useMemo } from "react";
import { generatePath } from "react-router-dom";

import { Ecosystems } from "app/migration/projects/components/project-card/ecosystems/ecosystems";
import { ProjectTags } from "app/migration/projects/features/project-tags/project-tags";

import { RoutePaths } from "src/App";
import PrivateTag from "src/components/PrivateTag";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { ProjectMissingGithubBanner } from "components/features/project-missing-github-banner/project-missing-github-banner";
import { Flex } from "components/layout/flex/flex";

import { ContributorsCounter } from "./contributors-counter/contributors-counter";
import { Leaders } from "./leaders/leaders";
import { TProjectCard } from "./project-card.types";
import { Summary } from "./summary/summary";
import { Technologies } from "./technologies/technologies";

export function ProjectCard({ project, isFirstHiringProject = false, isUserProjectLead }: TProjectCard.Props) {
  const { T } = useIntl();
  const { isInvitedAsProjectLead, isMissingGithubAppInstallation } = project;
  const isErrorVariant = Boolean(isUserProjectLead && isMissingGithubAppInstallation);
  const isPrivate = project.visibility === "PRIVATE";

  const InviteBanner = useMemo(() => {
    if (project.isInvitedAsProjectLead) {
      return (
        <ProjectLeadInvitationBanner
          projectName={project.name}
          on="cards"
          size={"s"}
          btnLabelToken="v2.features.banners.projectLeadInvitation.card.view"
        />
      );
    }

    return null;
  }, [project]);

  const MissingGithubBanner = useMemo(() => {
    if (isUserProjectLead && project.isMissingGithubAppInstallation) {
      return <ProjectMissingGithubBanner slug={project.slug} />;
    }

    return null;
  }, [project, isUserProjectLead]);

  return (
    <Card
      className={cn("transition", "relative w-full duration-300 ease-out", {
        "bg-spaceBlue-900 hover:border-card-border-heavy hover:bg-card-background-solidHeavy hover:ease-in":
          !isErrorVariant,
        "border-orange-500 bg-orange-900": isErrorVariant,
        "mt-3": isFirstHiringProject,
      })}
      border={isInvitedAsProjectLead ? "multiColor" : "medium"}
      dataTestId="project-card"
      as="a"
      href={generatePath(RoutePaths.ProjectDetails, { projectKey: project.slug })}
    >
      <Flex direction="row" className="gap-5">
        <div className="relative hidden flex-shrink-0 md:block">
          <Thumbnail
            src={project.logoUrl}
            alt={T("project.highlights.thumbnail")}
            size="xl"
            className="mt-1"
            type={"project"}
          />
          {isPrivate && (
            <div className="absolute -bottom-2.5 -right-2.5">
              <PrivateTag />
            </div>
          )}
        </div>
        <Flex direction="col" className="w-full flex-1 gap-2 overflow-hidden">
          <Flex direction="row" className="items-center gap-2 md:items-start">
            <div className="relative block flex-shrink-0 md:hidden">
              <Thumbnail
                src={project.logoUrl}
                alt={T("v2.pages.projects.highlights.thumbnail")}
                size="l"
                className="mt-1"
                type={"project"}
              />
              {isPrivate && (
                <div className="absolute -bottom-2.5 -right-2.5">
                  <PrivateTag />
                </div>
              )}
            </div>
            <div className="flex-1 truncate font-belwe text-2xl font-medium">{project.name}</div>
            {project.tags?.length ? <ProjectTags tags={project.tags} /> : null}
          </Flex>
          <Summary shortDescription={project.shortDescription} />
          <div className="mt-5 flex flex-row flex-wrap items-center gap-4">
            <Leaders leaders={project.leaders} />
            <ContributorsCounter count={project.contributorCount} />
            <Ecosystems ecosystems={project.ecosystems} />
            <Technologies technologies={project.technologies} />
          </div>
        </Flex>
      </Flex>
      {project.isInvitedAsProjectLead || project.isMissingGithubAppInstallation ? (
        <Flex direction="col" className="mt-5 gap-5">
          {InviteBanner}
          {MissingGithubBanner}
        </Flex>
      ) : null}
    </Card>
  );
}
