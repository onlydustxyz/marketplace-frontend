import { useMemo } from "react";

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
import { Sponsors } from "./sponsors/sponsors";
import { Summary } from "./summary/summary";
import { Technologies } from "./technologies/technologies";
import { IconTag } from "components/ds/icon-tag/icon-tag";

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
          btnLabelToken="project.projectLeadInvitation.view"
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
      className={cn("relative duration-100 ease-out transition", {
        "bg-spaceBlue-900 hover:border-card-border-heavy hover:bg-card-background-solidHeavy hover:ease-in":
          !isErrorVariant,
        "border-orange-500 bg-orange-900": isErrorVariant,
        "mt-3": isFirstHiringProject,
      })}
      border={isInvitedAsProjectLead ? "multiColor" : "medium"}
      dataTestId="project-card"
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
        <Flex direction="col" className="flex-1 gap-1">
          <Flex direction="row" className="items-center gap-2 md:items-start">
            <div className="relative block flex-shrink-0 md:hidden">
              <Thumbnail
                src={project.logoUrl}
                alt={T("project.highlights.thumbnail")}
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
            <Flex direction="row" className="gap-2">
              <IconTag remixName="ri-seedling-line" size="medium" active />
              <IconTag remixName="ri-hand-coin-line" size="medium" />
              <IconTag remixName="ri-git-fork-line" size="medium" />
            </Flex>
          </Flex>
          <Summary shortDescription={project.shortDescription} />
          <div className="mt-5 grid grid-cols-2 items-center gap-4 md:flex md:flex-row">
            <Leaders leaders={project.leaders} />
            <ContributorsCounter count={project.contributorCount} />
            <Sponsors sponsors={project.sponsors} />
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
