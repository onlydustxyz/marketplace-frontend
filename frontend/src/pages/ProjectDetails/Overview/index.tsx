import { useIntl } from "src/hooks/useIntl";
import OverviewPanel from "./OverviewPanel";
import { useLocation, useOutletContext } from "react-router-dom";
import { ReactNode } from "react";
import { useGetProjectOverviewDetailsQuery } from "src/__generated/graphql";
import QueryWrapper from "src/components/QueryWrapper";
import Card from "src/components/Card";
import GithubRepoDetails from "./GithubRepoDetails";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import classNames from "classnames";
import Badge, { BadgeSize } from "src/components/Badge";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Title from "src/pages/ProjectDetails/Title";
import MarkdownPreview from "src/components/MarkdownPreview";
import { contextWithCacheHeaders } from "src/utils/headers";
import { sortBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { buildLanguageString, getDeduplicatedAggregatedLanguages } from "src/utils/languages";
import Tag, { TagSize } from "src/components/Tag";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import Callout from "src/components/Callout";
import RecordCircleLine from "src/icons/RecordCircleLine";
import Button, { ButtonSize, Width } from "src/components/Button";
import { useAuth } from "src/hooks/useAuth";
import { LOGIN_URL } from "src/App/Layout/Header/GithubLink";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import Tooltip from "src/components/Tooltip";
import useApplications from "./useApplications";

type OutletContext = {
  projectId: string;
  children: ReactNode;
};

export default function Overview() {
  const { T } = useIntl();
  const { projectId, children } = useOutletContext<OutletContext>();
  const { isLoggedIn, user, githubUserId } = useAuth();
  const dispatchSession = useSessionDispatch();
  const location = useLocation();

  const { data, loading } = useGetProjectOverviewDetailsQuery({
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  const { applyToProject } = useApplications(projectId);

  const projectName = data?.projectsByPk?.projectDetails?.name;
  const logoUrl = data?.projectsByPk?.projectDetails?.logoUrl || onlyDustLogo;
  const description = data?.projectsByPk?.projectDetails?.longDescription || LOREM_IPSUM;
  const githubRepos = sortBy(data?.projectsByPk?.githubRepos, "repo.stars").reverse();
  const sponsors = data?.projectsByPk?.projectSponsors.map(s => s.sponsor) || [];
  const telegramLink = data?.projectsByPk?.projectDetails?.telegramLink || null;
  const topContributors = data?.projectsByPk?.contributors.map(c => c.githubUser).filter(isDefined) || [];
  const totalContributorsCount = data?.projectsByPk?.contributorsAggregate.aggregate?.count || 0;
  const leads = data?.projectsByPk?.projectLeads.map(u => u.user).filter(isDefined);
  const totalInitialAmountInUsd = data?.projectsByPk?.budgetsAggregate.aggregate?.sum?.initialAmount;
  const totalSpentAmountInUsd = data?.projectsByPk?.budgetsAggregate.aggregate?.sum?.spentAmount;
  const languages = getDeduplicatedAggregatedLanguages(data?.projectsByPk?.githubRepos.map(r => r.repo));
  const hiring = data?.projectsByPk?.projectDetails?.hiring;
  const alreadyApplied = data?.projectsByPk?.applications.some(a => a.applicantId === user?.id);
  const isContributor = data?.projectsByPk?.contributors.some(c => c.githubUser?.id === githubUserId);
  const isProjectLead = data?.projectsByPk?.projectLeads.some(l => l.user?.id === user?.id);
  const isInvited = data?.projectsByPk?.pendingInvitations.some(i => i.githubUserId === githubUserId);

  return (
    <>
      <Title>{T("project.details.overview.title")}</Title>
      {children}
      <div className="flex flex-row gap-6">
        <QueryWrapper query={{ data, loading }}>
          <div className="flex flex-col gap-4 w-full">
            <Card className={classNames("px-6 py-4 flex flex-col gap-4")}>
              <div className="flex flex-row items-center gap-4">
                <img
                  alt={data?.projectsByPk?.projectDetails?.name}
                  src={logoUrl}
                  className="w-20 h-20 flex-shrink-0 rounded-lg bg-spaceBlue-900"
                />
                <div className="flex flex-col gap-1">
                  <div className="font-belwe font-normal text-2xl text-greyscale-50">{projectName}</div>
                  {Object.keys(languages).length > 0 && (
                    <Tag size={TagSize.Small}>
                      <CodeSSlashLine />
                      {buildLanguageString(languages)}
                    </Tag>
                  )}
                </div>
              </div>
              <MarkdownPreview>{description}</MarkdownPreview>
            </Card>
            <Card className="flex flex-col gap-4">
              <div className="flex flex-row font-walsheim font-medium text-base text-greyscale-50 items-center border-b border-greyscale-50/8 pb-2 justify-between">
                <div className="flex flex-row items-center gap-3">
                  <GitRepositoryLine className="text-white text-2xl" />
                  {T("project.details.overview.repositories.title")}
                </div>
                <Badge value={githubRepos.length} size={BadgeSize.Small} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {githubRepos &&
                  githubRepos.map(githubRepo => (
                    <GithubRepoDetails key={githubRepo.repo?.id} githubRepoId={githubRepo.repo?.id} />
                  ))}
              </div>
            </Card>
          </div>
        </QueryWrapper>
        <div className="flex flex-col gap-4">
          {hiring && !(isProjectLead || isContributor || isInvited) && (
            <Callout>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 items-center text-spaceBlue-200 font-walsheim font-medium text-sm">
                  <RecordCircleLine />
                  {T("project.hiring").toUpperCase()}
                </div>
                {isLoggedIn ? (
                  <div id="applyButton">
                    <Button
                      data-testid="apply-btn"
                      size={ButtonSize.Md}
                      width={Width.Full}
                      disabled={alreadyApplied}
                      onClick={applyToProject}
                    >
                      {T("project.showInterest.connected")}
                    </Button>
                    {alreadyApplied && (
                      <Tooltip anchorId="applyButton">{T("project.showInterest.appliedTooltip")}</Tooltip>
                    )}
                  </div>
                ) : (
                  <a
                    href={LOGIN_URL}
                    onClick={() =>
                      dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })
                    }
                  >
                    <Button size={ButtonSize.Md} width={Width.Full}>
                      {T("project.showInterest.notConnected")}
                    </Button>
                  </a>
                )}
              </div>
            </Callout>
          )}
          <OverviewPanel
            {...{
              sponsors,
              telegramLink,
              topContributors,
              totalContributorsCount,
              leads,
              totalInitialAmountInUsd,
              totalSpentAmountInUsd,
            }}
          />
        </div>
      </div>
    </>
  );
}

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur *adipiscing elit*. Sed non risus. **Suspendisse lectus** tortor, dignissim sit amet:
- adipiscing nec
- ultricies sed
- dolor.

Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue.
`;
