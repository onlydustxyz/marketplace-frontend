import { useMemo } from "react";
import { Card } from "components/ds/card/card";
import { cn } from "src/utils/cn";
import { Highlights } from "./highlights/highlights";
import { Technologies } from "./technologies/technologies";
import { Leaders } from "./leaders/leaders";
import { Summary } from "./summary/summary";
import { ReposCounter } from "./repos-counter/repos-counter";
import { ContributorsCounter } from "./contributors-counter/contributors-counter";
import { Sponsors } from "./sponsors/sponsors";
import { TProjectCard } from "./project-card.types";
import { Flex } from "components/layout/flex/flex";
import { ProjectLeadInvitationBanner } from "components/features/project-lead-invitation-banner/project-lead-invitation-banner";
import { ProjectMissingGithubBanner } from "components/features/project-missing-github-banner/project-missing-github-banner";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import PrivateTag from "src/components/PrivateTag";
import { useIntl } from "src/hooks/useIntl";

export function ProjectCard({ project, isFirstHiringProject = false, isUserProjectLead }: TProjectCard.Props) {
  const { T } = useIntl();
  const { hiring, isInvitedAsProjectLead, isMissingGithubAppInstallation } = project;
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
      className={cn("relative", {
        "bg-noise-light hover:bg-right": !isErrorVariant,
        "border-orange-500 bg-orange-900": isErrorVariant,
        "mt-3": isFirstHiringProject,
      })}
      border={isInvitedAsProjectLead ? "multiColor" : "medium"}
      dataTestId="project-card"
    >
      <Flex direction="col" className="gap-5">
        <div className="relative flex-shrink-0">
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
        <Flex direction="col"></Flex>
      </Flex>

      <Flex direction="col" className="gap-5">
        <Flex direction="col" className="items-stretch gap-6 divide-stone-100/8 lg:flex-row lg:gap-6 lg:divide-x">
          <Flex direction="col" className="min-w-0 basis-1/3 gap-y-5">
            <Highlights
              name={project.name}
              isPrivate={isPrivate}
              logoUrl={project.logoUrl}
              leaders={<Leaders leaders={project.leaders} />}
            />
            <Technologies technologies={project.technologies} />
          </Flex>
          <Flex direction="col" className="basis-2/3 items-stretch justify-center gap-4 lg:gap-4 lg:pl-6">
            <Summary shortDescription={project.shortDescription} />
            <Flex direction="col" className="w-full flex-row flex-wrap gap-1 xl:gap-2">
              <ReposCounter count={project.repoCount} />
              <ContributorsCounter count={project.contributorCount} />
              <Sponsors sponsors={project.sponsors} />
            </Flex>
          </Flex>
        </Flex>
        {InviteBanner}
        {MissingGithubBanner}
      </Flex>
    </Card>
  );
}
