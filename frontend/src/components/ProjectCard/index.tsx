import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import classNames from "classnames";
import Button, { ButtonSize } from "src/components/Button";
import Card, { CardBorder } from "src/components/Card";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { buildLanguageString, getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import { formatMoneyAmount } from "src/utils/money";
import { useMediaQuery } from "usehooks-ts";
import User3Line from "src/icons/User3Line";
import FundsLine from "src/icons/FundsLine";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import ProjectTitle from "./ProjectTitle";
import isDefined from "src/utils/isDefined";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Tag, { TagSize } from "src/components/Tag";
import { ArrayElement } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";
import RecordCircleLine from "src/icons/RecordCircleLine";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

type ProjectCardProps = Project & {
  selectable?: boolean;
};

export default function ProjectCard({
  id,
  pendingInvitations,
  projectDetails,
  githubRepos,
  projectLeads,
  budgetsAggregate,
  contributorsAggregate,
  projectSponsors,
}: ProjectCardProps) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const totalSpentAmountInUsd = budgetsAggregate?.aggregate?.sum?.spentAmount;
  const totalInitialAmountInUsd = budgetsAggregate?.aggregate?.sum?.initialAmount;

  const topSponsors = projectSponsors?.map(projectSponsor => projectSponsor.sponsor).slice(0, 3) || [];
  const languages = getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos.map(r => r.repo)));
  const contributorsCount = contributorsAggregate.aggregate?.count || 0;

  const card = (
    <Card
      selectable={isXl}
      className={classNames("bg-noise-light hover:bg-right relative", {
        "xl:bg-orange-500/8 xl:hover:bg-orange-500/12": pendingInvitations?.length > 0,
      })}
      border={CardBorder.Medium}
      dataTestId="project-card"
    >
      {projectDetails?.hiring && (
        <div className="absolute right-3.5 -top-3.5">
          <Tag size={TagSize.Small} opaque>
            <RecordCircleLine />
            {T("project.hiring")}
          </Tag>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row w-full lg:divide-x divide-stone-100/8 gap-4 lg:gap-6 justify-items-center font-walsheim">
          <div className="lg:flex flex-col basis-1/3 min-w-0 gap-y-5">
            <ProjectTitle
              projectId={id}
              projectName={projectDetails?.name || ""}
              projectLeads={projectLeads?.map(lead => lead.user).filter(isDefined) || []}
              logoUrl={projectDetails?.logoUrl || onlyDustLogo}
              private={projectDetails?.visibility === "Private"}
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
          <div className="flex flex-col basis-2/3 lg:pl-6 gap-4 lg:gap-4 justify-center">
            <div className="line-clamp-2 ml-px">{projectDetails?.shortDescription}</div>
            <div className="flex flex-row gap-2">
              {githubRepos && githubRepos.length > 0 && (
                <Tag testid={`github-repo-count-${id}`} size={TagSize.Small}>
                  <GitRepositoryLine />
                  {T("project.details.githubRepos.count", { count: githubRepos.length })}
                </Tag>
              )}
              {contributorsCount > 0 && (
                <Tag testid={`contributor-count-${id}`} size={TagSize.Small}>
                  <User3Line />
                  {T("project.details.contributors.count", { count: contributorsCount })}
                </Tag>
              )}
              {totalSpentAmountInUsd !== undefined && (
                <>
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
                    {projectSponsors?.length ? (
                      <>
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
                      </>
                    ) : (
                      <FundsLine />
                    )}
                    {isXl
                      ? T("project.amountGranted", {
                          granted: formatMoneyAmount({ amount: totalSpentAmountInUsd, notation: "compact" }),
                          total: formatMoneyAmount({ amount: totalInitialAmountInUsd, notation: "compact" }),
                        })
                      : formatMoneyAmount({ amount: totalSpentAmountInUsd, notation: "compact" })}
                  </Tag>
                </>
              )}
            </div>
          </div>
        </div>
        {pendingInvitations?.length > 0 && (
          <div className="hidden xl:flex flex-row justify-between items-center font-medium px-6 py-4 rounded-xl bg-orange-500/8">
            <div className="text-white">{T("project.projectLeadInvitation.prompt")}</div>
            <Button size={ButtonSize.Sm}>{T("project.projectLeadInvitation.view")}</Button>
          </div>
        )}
      </div>
    </Card>
  );
  return isXl ? (
    <Link
      to={generatePath(RoutePaths.ProjectDetails, {
        projectId: id,
      })}
    >
      {card}
    </Link>
  ) : (
    card
  );
}
