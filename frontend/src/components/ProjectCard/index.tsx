import { gql } from "@apollo/client";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import Button, { ButtonSize } from "src/components/Button";
import Card, { CardBorder } from "src/components/Card";
import GithubLink from "src/components/GithubLink";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import TelegramLink from "src/components/TelegramLink";
import { useIntl } from "src/hooks/useIntl";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import { Project } from "src/pages/Projects";
import { buildLanguageString } from "src/utils/languages";
import { formatMoneyAmount } from "src/utils/money";
import { buildGithubLink } from "src/utils/stringUtils";

type ProjectCardProps = Project;

export default function ProjectCard({
  pendingInvitations,
  name,
  projectDetails,
  githubRepo,
  projectLeads,
  totalSpentAmountInUsd,
}: ProjectCardProps) {
  const { T } = useIntl();
  const lead = projectLeads?.[0]?.user;
  const logoUrl = projectDetails?.logoUrl || githubRepo?.content?.logoUrl || onlyDustLogo;
  return (
    <Card
      selectable={true}
      className={`bg-noise-light hover:bg-right ${
        pendingInvitations?.length > 0 && "bg-orange-500/8 hover:bg-orange-500/12"
      }`}
      border={CardBorder.Medium}
      dataTestId="project-card"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-full divide-x divide-stone-100/8 gap-6 justify-items-center font-walsheim">
          <div className="flex flex-col basis-4/12 gap-y-5">
            <div className="flex flex-row gap-4 items-start">
              <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Large} className="mt-1" />
              <div className="flex flex-col gap-0.5">
                <div className="text-2xl font-medium font-belwe">{name}</div>
                {lead && (
                  <div className="text-sm flex flex-row text-spaceBlue-200 gap-1 items-center">
                    <div className="whitespace-nowrap">{T("project.ledBy")}</div>
                    <div className="truncate">{lead?.displayName}</div>{" "}
                    <img src={lead?.avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
                  </div>
                )}
              </div>
            </div>
            {githubRepo?.languages && Object.keys(githubRepo?.languages).length > 0 && (
              <div className="flex flex-row border border-neutral-600 w-fit px-3 py-1 rounded-2xl gap-2 text-md">
                <div className="flex items-center justify-center">
                  <CodeSSlashLine className="text-gray-400" />
                </div>
                <div className="text-white">{buildLanguageString(githubRepo?.languages)}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col basis-8/12 pl-6 gap-6">
            <div className="line-clamp-2">{projectDetails?.description}</div>
            <div className="flex flex-row divide-x divide-stone-100/8">
              <div className="flex flex-row gap-2 pr-6">
                {projectDetails?.telegramLink && <TelegramLink link={projectDetails?.telegramLink} />}
                {githubRepo?.owner && githubRepo?.name && (
                  <GithubLink link={buildGithubLink(githubRepo?.owner, githubRepo?.name)} />
                )}
              </div>
              <div className="flex text-sm gap-4 items-center pl-6">
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
          <div className="flex flex-row justify-between items-center font-medium px-6 py-4 rounded-xl bg-orange-500/8">
            <div className="text-white">{T("project.projectLeadInvitation.prompt")}</div>
            <Button size={ButtonSize.Small}>{T("project.projectLeadInvitation.view")}</Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export const PROJECT_CARD_FRAGMENT = gql`
  fragment ProjectCardFields on Projects {
    id
    name
    totalSpentAmountInUsd
    projectDetails {
      description
      telegramLink
      logoUrl
    }
    pendingInvitations(where: { githubUserId: { _eq: $githubUserId } }) {
      id
    }
    projectLeads {
      user {
        displayName
        avatarUrl
      }
    }
    githubRepo {
      name
      owner
      content {
        contributors {
          login
          avatarUrl
        }
        logoUrl
      }
      languages
    }
  }
`;
