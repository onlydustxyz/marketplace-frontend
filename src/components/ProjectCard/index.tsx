import { generatePath, Link } from "react-router-dom";
import { components } from "src/__generated/api";
import { RoutePaths } from "src/App";
import Card, { CardBorder } from "src/components/Card";
import ProjectLeadInvitationView from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Tag, { TagBorderColor, TagSize } from "src/components/Tag";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import RecordCircleLine from "src/icons/RecordCircleLine";
import User3Line from "src/icons/User3Line";
import { Visibility } from "src/types";
import { cn } from "src/utils/cn";
import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";
import { MissingGithubAppInstall } from "../New/Project/MissingGithubAppInstall";
import ProjectTitle from "./ProjectTitle";

export enum Variant {
  Default = "default",
  Error = "error",
}

type ProjectCardProps = {
  project: components["schemas"]["ProjectPageItemResponse"];
  className?: string;
  variant?: Variant;
};

export default function ProjectCard({ project, className, variant = Variant.Default }: ProjectCardProps) {
  const {
    id,
    sponsors,
    hiring,
    name = "",
    logoUrl,
    visibility,
    shortDescription,
    contributorCount = 0,
    technologies,
    slug = "",
    leaders = [],
    repoCount = 0,
    isInvitedAsProjectLead,
    isMissingGithubAppInstallation,
  } = project;

  const { T } = useIntl();

  const projectUrl = logoUrl ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + logoUrl : logoUrl;
  const topSponsors = sponsors?.map(sponsor => sponsor).slice(0, 3) ?? [];
  const languages = technologies ? getTopTechnologies(technologies) : [];

  return (
    <Link to={generatePath(RoutePaths.ProjectDetails, { projectKey: slug })}>
      <Card
        className={cn(
          "relative",
          {
            "bg-noise-light hover:bg-right": variant === Variant.Default,
            "border-orange-500 bg-orange-900": variant === Variant.Error,
          },
          className
        )}
        border={isInvitedAsProjectLead ? CardBorder.MultiColor : CardBorder.Medium}
        dataTestId="project-card"
      >
        {hiring && (
          <div className="absolute -top-3.5 right-3.5">
            <Tag
              size={TagSize.Small}
              opaque
              borderColor={variant === Variant.Error ? TagBorderColor.Orange : undefined}
            >
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
                projectName={name}
                projectLeads={leaders}
                logoUrl={projectUrl}
                private={visibility === Visibility.Private}
              />
              {languages.length ? (
                <div className="hidden lg:block">
                  <Tag testid={`languages-${id}`} size={TagSize.Large}>
                    <CodeSSlashLine className="text-xl" />
                    {buildLanguageString(languages)}
                  </Tag>
                </div>
              ) : null}
            </div>
            <div className="flex basis-2/3 flex-col justify-center gap-4 lg:gap-4 lg:pl-6">
              <div className="ml-px line-clamp-2 text-sm xl:text-base">{shortDescription}</div>
              <div className="flex flex-row flex-wrap gap-1 xl:gap-2">
                {repoCount && (
                  <Tag testid={`github-repo-count-${id}`} size={TagSize.Small}>
                    <GitRepositoryLine />
                    <span className="hidden xl:inline">
                      {T("project.details.githubRepos.count", { count: repoCount })}
                    </span>
                    <span className="xl:hidden">{repoCount}</span>
                  </Tag>
                )}

                {contributorCount ? (
                  <Tag testid={`contributor-count-${id}`} size={TagSize.Small}>
                    <User3Line />
                    {T("project.details.contributors.count", { count: contributorCount })}
                  </Tag>
                ) : null}

                {topSponsors?.length ? (
                  <Tag
                    testid={`sponsor-list-${id}`}
                    size={TagSize.Small}
                    {...withTooltip(
                      topSponsors.length > 1
                        ? T("project.fundedBy", {
                            topSponsorsString: topSponsors.map(sponsor => sponsor.name).join(", "),
                          })
                        : "",
                      { position: TooltipPosition.Bottom, className: "w-fit" }
                    )}
                  >
                    <div className="flex flex-row -space-x-1">
                      {topSponsors.map(sponsor => (
                        <RoundedImage
                          key={sponsor.id}
                          src={
                            sponsor.logoUrl
                              ? config.CLOUDFLARE_RESIZE_W_100_PREFIX + sponsor.logoUrl
                              : sponsor.logoUrl || ""
                          }
                          alt={sponsor.name || ""}
                          size={ImageSize.Xxs}
                          rounding={Rounding.Circle}
                        />
                      ))}
                    </div>
                    {topSponsors.length === 1
                      ? topSponsors.at(0)?.name
                      : T("project.sponsorsCount", { count: topSponsors.length })}
                  </Tag>
                ) : null}
              </div>
            </div>
          </div>
          {isInvitedAsProjectLead ? (
            <ProjectLeadInvitationView btnLabel={T("project.projectLeadInvitation.view")} />
          ) : null}
          {isMissingGithubAppInstallation ? <MissingGithubAppInstall slug={slug} /> : null}
        </div>
      </Card>
    </Link>
  );
}
