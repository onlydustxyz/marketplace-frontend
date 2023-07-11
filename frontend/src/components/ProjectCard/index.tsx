import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import classNames from "classnames";
import Button, { ButtonSize } from "src/components/Button";
import Card, { CardBorder } from "src/components/Card";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString, getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import { formatMoneyAmount } from "src/utils/money";
import User3Line from "src/icons/User3Line";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import ProjectTitle from "./ProjectTitle";
import isDefined from "src/utils/isDefined";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Tag, { TagSize } from "src/components/Tag";
import { ArrayElement } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import RecordCircleLine from "src/icons/RecordCircleLine";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

type ProjectCardProps = Project & {
  selectable?: boolean;
};

export default function ProjectCard({
  id,
  pendingInvitations,
  githubRepos,
  projectLeads,
  budgetsAggregate,
  contributorsAggregate,
  sponsors,
  hiring,
  name,
  logoUrl,
  visibility,
  shortDescription,
}: ProjectCardProps) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const totalSpentAmountInUsd = budgetsAggregate?.aggregate?.sum?.spentAmount;
  const totalInitialAmountInUsd = budgetsAggregate?.aggregate?.sum?.initialAmount;

  const topSponsors = sponsors?.map(projectSponsor => projectSponsor.sponsor).slice(0, 3) || [];
  const languages = getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos.map(r => r.repo)));
  const contributorsCount = contributorsAggregate.aggregate?.count || 0;

  const card = (
    <Card
      className={classNames("relative bg-noise-light hover:bg-right", {
        "xl:bg-orange-500/8 xl:hover:bg-orange-500/12": pendingInvitations?.length > 0,
      })}
      border={CardBorder.Medium}
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
              projectLeads={projectLeads?.map(lead => lead.user).filter(isDefined) || []}
              logoUrl={logoUrl || onlyDustLogo}
              private={visibility === "private"}
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
              {githubRepos && githubRepos.length > 0 && (
                <Tag testid={`github-repo-count-${id}`} size={TagSize.Small}>
                  <GitRepositoryLine />
                  {isXl ? T("project.details.githubRepos.count", { count: githubRepos.length }) : githubRepos.length}
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
                    T("project.fundedBy", {
                      count: topSponsors.length,
                      topSponsorsString: topSponsors.map(sponsor => sponsor.name).join(", "),
                      leftToSpend: formatMoneyAmount({
                        amount: totalInitialAmountInUsd - totalSpentAmountInUsd,
                        notation: "compact",
                      }),
                    }),
                    { position: TooltipPosition.Top, className: "w-fit" }
                  )}
                >
                  <div className="flex flex-row -space-x-1">
                    {topSponsors.map(sponsor => (
                      <RoundedImage
                        key={sponsor.id}
                        src={sponsor.logoUrl}
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
        {pendingInvitations?.length > 0 && (
          <div className="flex flex-col flex-wrap items-center justify-between gap-2 rounded-xl bg-orange-500/8 px-4 py-4 text-center font-medium sm:flex-row xl:px-6 xl:py-4">
            <div className="text-sm text-white md:text-base">{T("project.projectLeadInvitation.prompt")}</div>
            <Button size={ButtonSize.Sm}>{T("project.projectLeadInvitation.view")}</Button>
          </div>
        )}
      </div>
    </Card>
  );
  return (
    <Link
      to={generatePath(RoutePaths.ProjectDetails, {
        projectId: id,
      })}
    >
      {card}
    </Link>
  );
}
