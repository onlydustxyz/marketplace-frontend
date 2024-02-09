import { useMemo } from "react";
import { Link, generatePath } from "react-router-dom";

import { RoutePaths } from "src/App";
import PrivateTag from "src/components/PrivateTag";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { ProjectMissingGithubBanner } from "components/features/project-missing-github-banner/project-missing-github-banner";
import { Flex } from "components/layout/flex/flex";

import { ProjectTags } from "../../features/project-tags/project-tags";
import { ContributorsCounter } from "./contributors-counter/contributors-counter";
import { Ecosystems } from "./ecosystems/ecosystems";
import { Leaders } from "./leaders/leaders";
import { TProjectCard } from "./project-card.types";
import { Summary } from "./summary/summary";
import { Technologies } from "./technologies/technologies";

export function ProjectCard({ project, isFirstHiringProject = false, isUserProjectLead }: TProjectCard.Props) {
  const { T } = useIntl();
  const {
    isInvitedAsProjectLead,
    isMissingGithubAppInstallation,
    visibility,
    name,
    slug,
    logoUrl,
    tags,
    shortDescription,
    leaders,
    contributorCount,
    ecosystems,
    technologies,
  } = project;

  const isErrorVariant = Boolean(isUserProjectLead && isMissingGithubAppInstallation);
  const isPrivate = visibility === "PRIVATE";

  const InviteBanner = useMemo(() => {
    if (isInvitedAsProjectLead) {
      return (
        <ProjectLeadInvitationBanner
          projectName={name}
          on="cards"
          size={"s"}
          btnLabelToken="v2.features.banners.projectLeadInvitation.card.view"
        />
      );
    }

    return null;
  }, [project]);

  const MissingGithubBanner = useMemo(() => {
    if (isUserProjectLead && isMissingGithubAppInstallation) {
      return <ProjectMissingGithubBanner slug={slug} />;
    }

    return null;
  }, [project, isUserProjectLead]);

  return (
    <Link to={generatePath(RoutePaths.ProjectDetails, { projectKey: slug })} className="w-full">
      <Card
        className={cn("relative w-full transition-all hover:scale-[0.995]", {
          "border-orange-500 bg-orange-900": isErrorVariant,
          "mt-3": isFirstHiringProject,
        })}
        clickable
        border={isInvitedAsProjectLead ? "multiColor" : "light"}
        dataTestId="project-card"
        background="base"
      >
        <Flex direction="row" className="origin-center gap-5">
          <div className="relative hidden flex-shrink-0 md:block">
            <Thumbnail
              src={logoUrl}
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
          <Flex direction="col" className="w-full flex-1 gap-1 overflow-hidden">
            <Flex direction="row" className="items-center gap-2 md:items-start">
              <div className="relative block flex-shrink-0 md:hidden">
                <Thumbnail
                  src={logoUrl}
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
              {tags?.length ? <ProjectTags tags={tags} /> : null}
            </Flex>
            <Summary shortDescription={shortDescription} />
            <div className="mt-4 flex flex-row flex-wrap items-center gap-4">
              <Leaders leaders={leaders} />
              <ContributorsCounter count={contributorCount} />
              <Ecosystems ecosystems={ecosystems} />
              <Technologies technologies={technologies} />
            </div>
          </Flex>
        </Flex>
        {isInvitedAsProjectLead || isMissingGithubAppInstallation ? (
          <Flex direction="col" className="mt-5 gap-5">
            {InviteBanner}
            {MissingGithubBanner}
          </Flex>
        ) : null}
      </Card>
    </Link>
  );
}
