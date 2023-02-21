import { gql } from "@apollo/client";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import { generatePath, Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import classNames from "classnames";
import Button, { ButtonSize } from "src/components/Button";
import Card, { CardBorder } from "src/components/Card";
import GithubLink from "src/components/GithubLink";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import TelegramLink from "src/components/TelegramLink";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { Project } from "src/pages/Projects";
import { buildLanguageString } from "src/utils/languages";
import { formatMoneyAmount } from "src/utils/money";
import { buildGithubLink } from "src/utils/stringUtils";
import { useMediaQuery } from "usehooks-ts";
import { ProjectLeadFragmentDoc, SponsorFragmentDoc } from "src/__generated/graphql";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";
import User3Line from "src/icons/User3Line";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";

type ProjectCardProps = Project & {
  selectable?: boolean;
};

function ProjectCard__deprecated({
  id,
  pendingInvitations,
  projectDetails,
  githubRepo,
  projectLeads,
  budgetsAggregate,
}: ProjectCardProps) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const lead = projectLeads?.[0]?.user;
  const name = projectDetails?.name || "";
  const logoUrl = projectDetails?.logoUrl || githubRepo?.content?.logoUrl || onlyDustLogo;
  const totalSpentAmountInUsd = budgetsAggregate?.aggregate?.sum?.spentAmount;

  const card = (
    <Card
      selectable={isXl}
      className={classNames("bg-noise-light hover:bg-right", {
        "xl:bg-orange-500/8 xl:hover:bg-orange-500/12": pendingInvitations?.length > 0,
      })}
      border={CardBorder.Medium}
      dataTestId="project-card"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row w-full lg:divide-x divide-stone-100/8 gap-4 lg:gap-6 justify-items-center font-walsheim">
          <div className="lg:flex flex-col basis-1/3 min-w-0 gap-y-5">
            <div className="flex gap-4 items-start">
              <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
              <div className="min-w-0">
                <div className="text-2xl font-medium font-belwe truncate">{name}</div>
                {lead && (
                  <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
                    <div className="whitespace-nowrap">{T("project.ledBy")}</div>
                    <div className="truncate">{lead?.displayName}</div>{" "}
                    <img src={lead?.avatarUrl} className="w-4 h-4 rounded-full" />
                  </div>
                )}
              </div>
            </div>
            {githubRepo?.languages && Object.keys(githubRepo?.languages).length > 0 && (
              <div className="hidden lg:flex flex-row border border-neutral-600 w-fit px-3 py-1 rounded-2xl gap-2 text-md">
                <div className="flex items-center justify-center">
                  <CodeSSlashLine className="text-gray-400" />
                </div>
                <div className="text-white">{buildLanguageString(githubRepo?.languages)}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col basis-2/3 lg:pl-6 gap-4 lg:gap-6">
            <div className="line-clamp-2">{projectDetails?.shortDescription}</div>
            <div className="flex flex-row lg:divide-x divide-stone-100/8">
              <div className="hidden lg:flex flex-row gap-2 pr-6">
                {projectDetails?.telegramLink && <TelegramLink link={projectDetails?.telegramLink} />}
                {githubRepo?.owner && githubRepo?.name && (
                  <GithubLink link={buildGithubLink(githubRepo?.owner, githubRepo?.name)} />
                )}
              </div>
              <div className="flex text-sm gap-4 items-center lg:pl-6">
                {!!githubRepo?.content.contributors?.length && (
                  <span>
                    {T("project.details.contributors.count", { count: githubRepo?.content.contributors?.length })}
                  </span>
                )}
                {totalSpentAmountInUsd !== undefined && (
                  <span>{T("project.amountGranted", { amount: formatMoneyAmount(totalSpentAmountInUsd) })}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {pendingInvitations?.length > 0 && (
          <div className="hidden xl:flex flex-row justify-between items-center font-medium px-6 py-4 rounded-xl bg-orange-500/8">
            <div className="text-white">{T("project.projectLeadInvitation.prompt")}</div>
            <Button size={ButtonSize.Small}>{T("project.projectLeadInvitation.view")}</Button>
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

function ProjectCard({
  id,
  pendingInvitations,
  projectDetails,
  githubRepo,
  projectLeads,
  budgetsAggregate,
}: ProjectCardProps) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const lead = projectLeads?.[0]?.user;
  const name = projectDetails?.name || "";
  const logoUrl = projectDetails?.logoUrl || githubRepo?.content?.logoUrl || onlyDustLogo;
  const totalSpentAmountInUsd = budgetsAggregate?.aggregate?.sum?.spentAmount;

  const card = (
    <Card
      selectable={isXl}
      className={classNames("bg-noise-light hover:bg-right", {
        "xl:bg-orange-500/8 xl:hover:bg-orange-500/12": pendingInvitations?.length > 0,
      })}
      border={CardBorder.Medium}
      dataTestId="project-card"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row w-full lg:divide-x divide-stone-100/8 gap-4 lg:gap-6 justify-items-center font-walsheim">
          <div className="lg:flex flex-col basis-1/3 min-w-0 gap-y-5">
            <div className="flex gap-4 items-start">
              <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" />
              <div className="min-w-0">
                <div className="text-2xl font-medium font-belwe truncate">{name}</div>
                {lead && (
                  <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center pt-0.5">
                    <div className="whitespace-nowrap">{T("project.ledBy")}</div>
                    <div className="truncate">{lead?.displayName}</div>{" "}
                    <img src={lead?.avatarUrl} className="w-4 h-4 rounded-full" />
                  </div>
                )}
              </div>
            </div>
            {githubRepo?.languages && Object.keys(githubRepo?.languages).length > 0 && (
              <div className="hidden lg:flex flex-row border border-neutral-600 w-fit px-3 py-1 rounded-2xl gap-2 text-sm">
                <div className="flex items-center justify-center">
                  <CodeSSlashLine className="text-gray-400" />
                </div>
                <div className="text-white">{buildLanguageString(githubRepo?.languages)}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col basis-2/3 lg:pl-6 gap-4 lg:gap-4 justify-center">
            <div className="line-clamp-2 ml-px">{projectDetails?.shortDescription}</div>
            <div className="flex flex-row gap-2">
              {!!githubRepo?.content.contributors?.length && (
                <div className="flex flex-row border border-neutral-600 w-fit px-2 py-1 rounded-2xl gap-1 lg:gap-2 text-xs">
                  <User3Line />
                  {T("project.details.contributors.count", { count: githubRepo?.content.contributors?.length })}
                </div>
              )}
              {totalSpentAmountInUsd !== undefined && (
                <div className="flex flex-row border border-neutral-600 w-fit px-2 py-1 rounded-2xl gap-2 text-xs">
                  <MoneyDollarCircleLine />
                  {T("project.amountGranted", { amount: formatMoneyAmount(totalSpentAmountInUsd) })}
                </div>
              )}
            </div>
          </div>
        </div>
        {pendingInvitations?.length > 0 && (
          <div className="hidden xl:flex flex-row justify-between items-center font-medium px-6 py-4 rounded-xl bg-orange-500/8">
            <div className="text-white">{T("project.projectLeadInvitation.prompt")}</div>
            <Button size={ButtonSize.Small}>{T("project.projectLeadInvitation.view")}</Button>
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

export default isFeatureEnabled(FeatureFlags.SHOW_SPONSORS) ? ProjectCard : ProjectCard__deprecated;

export const PROJECT_CARD_FRAGMENT = gql`
  ${ProjectLeadFragmentDoc}
  ${SponsorFragmentDoc}
  fragment ProjectCardFields on Projects {
    id
    budgetsAggregate {
      aggregate {
        sum {
          spentAmount
        }
      }
    }
    projectDetails {
      projectId
      name
      telegramLink
      logoUrl
      shortDescription
    }
    pendingInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
      id
    }
    projectLeads {
      user {
        ...ProjectLead
      }
    }
    githubRepo {
      id
      name
      owner
      content {
        id
        contributors {
          login
          avatarUrl
        }
        logoUrl
      }
      languages
    }
    projectSponsors {
      sponsor {
        ...Sponsor
      }
    }
  }
`;
