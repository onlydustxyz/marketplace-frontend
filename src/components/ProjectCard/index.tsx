import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import { cn } from "src/utils/cn";
import Card, { CardBorder } from "src/components/Card";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString, getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import User3Line from "src/icons/User3Line";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import ProjectTitle from "./ProjectTitle";
import isDefined from "src/utils/isDefined";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Tag, { TagSize } from "src/components/Tag";
import { ArrayElement, Leader, Technologies } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import RecordCircleLine from "src/icons/RecordCircleLine";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import config from "src/config";
import ProjectLeadInvitationView from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import { getTopTechnologies } from "src/utils/technologies";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

// TODO(Backend): This is a temporary solution until we delete graphql fields
type ExtendedProject = Project & {
  contributorCount?: number;
  technologies?: Technologies;
  slug?: string;
  leaders?: Leader[];
  repoCount?: number;
};

type ProjectCardProps = {
  project: ExtendedProject;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const {
    id,
    key,
    pendingInvitations,
    githubRepos,
    projectLeads,
    contributorsAggregate,
    sponsors,
    hiring,
    name,
    logoUrl,
    visibility,
    shortDescription,
    // TODO(Backend):
    // New REST API Fields
    contributorCount,
    technologies,
    slug,
    leaders,
    repoCount,
  } = project;

  const projectUrl = logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + logoUrl : logoUrl;

  // TODO(Backend): This is a temporary solution until we delete graphql fields
  const repositoryCount = githubRepos?.length || repoCount || 0;

  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  // TODO(Backend): This is a temporary solution until we delete graphql fields
  const topSponsors = sponsors?.map(projectSponsor => projectSponsor.sponsor || projectSponsor).slice(0, 3) || [];

  // TODO(Backend): This is a temporary solution until we delete graphql fields
  const languages = githubRepos
    ? getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos?.map(r => r.repo)))
    : technologies
    ? getTopTechnologies(technologies)
    : [];

  // TODO(Backend): This is a temporary solution until we delete graphql fields
  const contributorsCount = contributorsAggregate?.aggregate?.count || contributorCount || 0;

  const hasPendingInvitation = pendingInvitations?.length > 0;

  const card = (
    <Card
      className={cn("relative bg-noise-light hover:bg-right", className)}
      border={hasPendingInvitation ? CardBorder.MultiColor : CardBorder.Medium}
      dataTestId="project-card"
    >
      {hiring && (
        <div className="absolute -top-3.5 right-3.5">
          <Tag size={TagSize.Small} opaque>
            <RecordCircleLine />
            {T("project.hiring")}
          </Tag>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex w-full flex-col justify-items-center gap-4 divide-stone-100/8 font-walsheim lg:flex-row lg:gap-6 lg:divide-x">
          <div className="min-w-0 basis-1/3 flex-col gap-y-5 lg:flex">
            <ProjectTitle
              projectId={id}
              projectName={name || ""}
              projectLeads={projectLeads?.map(lead => lead.user).filter(isDefined) || leaders || []}
              logoUrl={projectUrl || onlyDustLogo}
              private={visibility === "PRIVATE"}
            />
            {languages.length > 0 && (
              <div className="hidden lg:block">
                <Tag testid={`languages-${id}`} size={TagSize.Large}>
                  <CodeSSlashLine className="text-xl" />
                  {buildLanguageString(languages)}
                </Tag>
              </div>
            )}
          </div>
          <div className="flex basis-2/3 flex-col justify-center gap-4 lg:gap-4 lg:pl-6">
            <div className="ml-px line-clamp-2 text-sm xl:text-base">{shortDescription}</div>
            <div className="flex flex-row flex-wrap gap-1 xl:gap-2">
              {repositoryCount && (
                <Tag testid={`github-repo-count-${id}`} size={TagSize.Small}>
                  <GitRepositoryLine />
                  {isXl ? T("project.details.githubRepos.count", { count: repositoryCount }) : repositoryCount}
                </Tag>
              )}
              {contributorsCount > 0 && (
                <Tag testid={`contributor-count-${id}`} size={TagSize.Small}>
                  <User3Line />
                  {T("project.details.contributors.count", { count: contributorsCount })}
                </Tag>
              )}
              {topSponsors?.length > 0 && (
                <Tag
                  testid={`sponsor-list-${id}`}
                  size={TagSize.Small}
                  {...withTooltip(
                    topSponsors.length > 1
                      ? T("project.fundedBy", {
                          topSponsorsString: topSponsors.map(sponsor => sponsor.name).join(", "),
                        })
                      : "",
                    { position: TooltipPosition.Top, className: "w-fit" }
                  )}
                >
                  <div className="flex flex-row -space-x-1">
                    {topSponsors.map(sponsor => (
                      <RoundedImage
                        key={sponsor.id}
                        src={
                          sponsor.logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + sponsor.logoUrl : sponsor.logoUrl
                        }
                        alt={sponsor.name}
                        size={ImageSize.Xxs}
                        rounding={Rounding.Circle}
                      />
                    ))}
                  </div>
                  {topSponsors.length === 1
                    ? topSponsors.at(0)?.name
                    : T("project.sponsorsCount", { count: topSponsors.length })}
                </Tag>
              )}
            </div>
          </div>
        </div>
        {hasPendingInvitation && <ProjectLeadInvitationView btnLabel={T("project.projectLeadInvitation.view")} />}
      </div>
    </Card>
  );
  return (
    <Link
      to={generatePath(RoutePaths.ProjectDetails, {
        // TODO(Backend): This is a temporary solution until we delete graphql fields
        projectKey: key || slug || "",
      })}
    >
      {card}
    </Link>
  );
}
