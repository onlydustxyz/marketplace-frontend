import { useIntl } from "src/hooks/useIntl";
import OverviewPanel from "./OverviewPanel";
import { useLocation, useOutletContext } from "react-router-dom";
import {
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQuery,
  useAcceptProjectLeaderInvitationMutation,
} from "src/__generated/graphql";
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
import { buildLanguageString, getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import Tag, { TagSize } from "src/components/Tag";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import Callout from "src/components/Callout";
import RecordCircleLine from "src/icons/RecordCircleLine";
import Button, { ButtonSize, Width } from "src/components/Button";
import { useAuth } from "src/hooks/useAuth";
import { LOGIN_URL } from "src/App/Layout/Header/GithubLink";
import { SessionMethod, useSession, useSessionDispatch } from "src/hooks/useSession";
import { withTooltip } from "src/components/Tooltip";
import useApplications from "./useApplications";
import LockFill from "src/icons/LockFill";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import { useSuspenseQuery_experimental } from "@apollo/client";
import { useEffect } from "react";

type OutletContext = {
  projectId: string;
};

export default function Overview() {
  const { T } = useIntl();
  const { projectId } = useOutletContext<OutletContext>();
  const { isLoggedIn, githubUserId } = useAuth();
  const { ledProjectIds } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const location = useLocation();
  const dispatchSession = useSessionDispatch();

  const { data } = useSuspenseQuery_experimental<GetProjectOverviewDetailsQuery>(GetProjectOverviewDetailsDocument, {
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  const projectName = data?.projectsByPk?.projectDetails?.name;
  const logoUrl = data?.projectsByPk?.projectDetails?.logoUrl || onlyDustLogo;
  const description = data?.projectsByPk?.projectDetails?.longDescription || LOREM_IPSUM;
  const githubRepos = sortBy(data?.projectsByPk?.githubRepos, "repo.stars")
    .reverse()
    .filter(r => r.repo);
  const sponsors = data?.projectsByPk?.projectSponsors.map(s => s.sponsor) || [];
  const telegramLink = data?.projectsByPk?.projectDetails?.telegramLink || null;
  const topContributors = data?.projectsByPk?.contributors.map(c => c.githubUser).filter(isDefined) || [];
  const totalContributorsCount = data?.projectsByPk?.contributorsAggregate.aggregate?.count || 0;
  const leads = data?.projectsByPk?.projectLeads.map(u => u.user).filter(isDefined);
  const totalInitialAmountInUsd = data?.projectsByPk?.budgetsAggregate.aggregate?.sum?.initialAmount;
  const totalSpentAmountInUsd = data?.projectsByPk?.budgetsAggregate.aggregate?.sum?.spentAmount;
  const languages = getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos.map(r => r.repo)));
  const hiring = data?.projectsByPk?.projectDetails?.hiring;
  const invitationId = data?.projectsByPk?.pendingInvitations.find(i => i.githubUserId === githubUserId)?.id;

  const { alreadyApplied, applyToProject } = useApplications(projectId);
  const { isCurrentUserMember } = useProjectVisibility(projectId);

  const [acceptInvitation] = useAcceptProjectLeaderInvitationMutation({
    context: { graphqlErrorDisplay: "toaster" },
    variables: { invitationId },
    onCompleted: () => window.location.reload(),
  });

  useEffect(() => {
    if (projectId && ((projectId !== lastVisitedProjectId && ledProjectIds.includes(projectId)) || !!invitationId)) {
      dispatchSession({ method: SessionMethod.SetLastVisitedProjectId, value: projectId });
    }
  }, [projectId, ledProjectIds]);

  return (
    <>
      <Title>{T("project.details.overview.title")}</Title>
      {invitationId && <ProjectLeadInvitation projectName={projectName} onClick={acceptInvitation} />}
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-4 w-full">
          <Card className={classNames("px-6 py-4 flex flex-col gap-4 z-10")}>
            <div className="flex flex-row items-center gap-4">
              <img
                alt={data?.projectsByPk?.projectDetails?.name}
                src={logoUrl}
                className="w-20 h-20 flex-shrink-0 rounded-lg bg-spaceBlue-900"
              />
              <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row items-center justify-between font-belwe font-normal text-2xl text-greyscale-50">
                  {projectName}
                  {data?.projectsByPk?.projectDetails?.visibility === "private" && <PrivateTag />}
                </div>
                {languages.length > 0 && (
                  <Tag size={TagSize.Small}>
                    <CodeSSlashLine />
                    {buildLanguageString(languages)}
                  </Tag>
                )}
              </div>
            </div>
            <MarkdownPreview className="text-sm">{description}</MarkdownPreview>
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
        <div className="flex flex-col gap-4">
          {hiring && !isCurrentUserMember && (
            <Callout>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2 items-center text-spaceBlue-200 font-walsheim font-medium text-sm">
                  <RecordCircleLine />
                  {T("project.hiring").toUpperCase()}
                </div>
                {isLoggedIn ? (
                  <div
                    {...withTooltip(T("applications.appliedTooltip"), {
                      visible: alreadyApplied,
                    })}
                  >
                    <Button
                      data-testid="apply-btn"
                      size={ButtonSize.Md}
                      width={Width.Full}
                      disabled={alreadyApplied}
                      onClick={applyToProject}
                    >
                      {T("applications.applyButton")}
                    </Button>
                  </div>
                ) : (
                  <a
                    href={LOGIN_URL}
                    onClick={() =>
                      dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })
                    }
                  >
                    <Button size={ButtonSize.Md} width={Width.Full}>
                      {T("applications.connectToApplyButton")}
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

function PrivateTag() {
  const { T } = useIntl();

  return (
    <div
      className="flex flex-row gap-2 items-center py-1 px-2.5 text-orange-500 font-medium font-walsheim text-xs rounded-lg bg-orange-900 hover:cursor-default"
      {...withTooltip(T("project.visibility.private.tooltip"))}
    >
      <LockFill /> {T("project.visibility.private.name")}
    </div>
  );
}
