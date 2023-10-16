import { useIntl } from "src/hooks/useIntl";
import OverviewPanel from "./OverviewPanel";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import {
  GetProjectOverviewDetailsDocument,
  GetProjectOverviewDetailsQuery,
  OwnUserProfileDetailsFragment,
  OwnUserProfileDocument,
  UserProfileFragment,
  useUpdateUserProfileMutation,
} from "src/__generated/graphql";
import Card from "src/components/Card";
import GithubRepoDetails from "./GithubRepoDetails";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
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
import { Action, SessionMethod, useSession, useSessionDispatch } from "src/hooks/useSession";
import { withTooltip } from "src/components/Tooltip";
import useApplications from "./useApplications";
import LockFill from "src/icons/LockFill";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import { useSuspenseQuery_experimental } from "@apollo/client";
import { Dispatch, ReactNode, useContext, useEffect, useState } from "react";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";
import ContactInformations from "src/components/ContactInformations";
import { FormProvider, useForm } from "react-hook-form";
import {
  UserProfileInfo,
  fromFragment,
  toVariables,
} from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/types";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import { rates } from "src/hooks/useWorkEstimation";
import DataDisplay from "src/App/DataWrapper/DataDisplay";
import DataSwitch from "src/App/DataWrapper/DataSwitch";
import { ApiResourcePaths } from "src/App/DataWrapper/config";
import { DataContext, isExtendedGetProjectsQuery } from "src/App/DataWrapper/DataContext";
import { getTopTechnologies } from "src/utils/technologies";
import { ProjectDetailsRESTfull } from "..";
import { Project, Repo } from "src/types";

type OutletContext = {
  projectId: string;
  projectKey: string;
};

interface OverviewDataWrapperProps {
  children: ReactNode;
  param?: string;
}

function OverviewDataWrapper({ children, param }: OverviewDataWrapperProps) {
  const { data } = useSuspenseQuery_experimental<GetProjectOverviewDetailsQuery>(GetProjectOverviewDetailsDocument, {
    variables: { projectId: param },
    ...contextWithCacheHeaders,
  });

  return (
    <DataDisplay param={param} data={data?.projects[0] as Project & GetProjectOverviewDetailsQuery["projects"][0]}>
      {children}
    </DataDisplay>
  );
}

export default function Overview() {
  const { projectId } = useOutletContext<OutletContext>();

  return (
    <DataSwitch
      param={projectId}
      ApolloDataWrapper={OverviewDataWrapper}
      resourcePath={ApiResourcePaths.GET_PROJECT_OVERVIEW}
    >
      <PresentOverview />
    </DataSwitch>
  );
}

function PresentOverview() {
  const { T } = useIntl();
  const { projectId, projectKey } = useOutletContext<OutletContext>();
  const { isLoggedIn, githubUserId } = useAuth();
  const { ledProjectIds } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const navigate = useNavigate();
  const dispatchSession = useSessionDispatch();

  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error(T("dataFetching.dataContext"));
  }

  const { data } = dataContext;
  const project = data as Project & GetProjectOverviewDetailsQuery["projects"][0];

  const projectName = project?.name;
  const logoUrl = project?.logoUrl || onlyDustLogo;
  const description = project?.longDescription || LOREM_IPSUM;
  const githubRepos = sortBy(project?.githubRepos, "repo.stars")
    .reverse()
    .filter(r => r.repo);
  // TODO(Backend): This is a temporary solution until we delete graphql fields
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sponsors = project?.sponsors.map(s => s.sponsor || s) || [];
  const moreInfoLink = project?.moreInfoLink || project?.moreInfoUrl || null;
  const topContributors =
    project?.contributors?.map(c => c.githubUser).filter(isDefined) || project?.topContributors || [];
  const totalContributorsCount = project?.contributorsAggregate?.aggregate?.count || project?.contributorCount || 0;
  const leads =
    project?.projectLeads?.map(u => u.user).filter(isDefined) || project?.leaders?.map(u => u).filter(isDefined) || [];

  // TODO(Backend): This is a temporary solution until we delete graphql fields
  const languages =
    githubRepos.length > 0
      ? getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos?.map(r => r.repo)))
      : project?.technologies
      ? getTopTechnologies(project?.technologies)
      : [];

  const hiring = project?.hiring;
  const invitationId = project?.pendingInvitations?.find(i => i.githubUserId === githubUserId)?.id || undefined;
  const isProjectLeader = ledProjectIds.includes(projectId);

  const { alreadyApplied, applyToProject } = useApplications(projectId);
  const { isCurrentUserMember } = useProjectVisibility(projectId);

  const { data: userProfileData } = useUserProfile({ githubUserId });
  const profile = userProfileData?.profile;

  useEffect(() => {
    if (projectId && ((projectId !== lastVisitedProjectId && ledProjectIds.includes(projectId)) || !!invitationId)) {
      dispatchSession({ method: SessionMethod.SetLastVisitedProjectId, value: projectId });
    }
  }, [projectId, ledProjectIds]);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const remainingBudget = project?.usdBudget?.initialAmount - project?.usdBudget?.spentAmount;
  const isRewardDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  return (
    <>
      <Title>
        <div className="flex flex-row items-center justify-between gap-2">
          {T("project.details.overview.title")}
          {isProjectLeader && (
            <Button
              disabled={isRewardDisabled}
              size={ButtonSize.Sm}
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
              onClick={() =>
                navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                )
              }
            >
              {T("project.rewardButton.full")}
            </Button>
          )}
        </div>
      </Title>
      <ProjectLeadInvitation projectId={projectId} size={CalloutSizes.Large} />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex grow flex-col gap-4">
          <ProjectDescriptionCard
            {...{ projectName, logoUrl, visibility: project?.visibility, languages, description }}
          />
          {!isMd && (
            <OverviewPanel
              {...{
                sponsors,
                moreInfoLink,
                topContributors,
                totalContributorsCount,
                leads,
              }}
            />
          )}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <GithubRepositoriesCard githubRepos={githubRepos.length > 0 ? githubRepos : project?.repos} />
        </div>
        <div className="flex shrink-0 flex-col gap-4 md:w-72 xl:w-80">
          {hiring && !isCurrentUserMember && profile && (
            <ApplyCallout {...{ isLoggedIn, alreadyApplied, applyToProject, dispatchSession, profile }} />
          )}
          {isMd && (
            <OverviewPanel
              {...{
                sponsors,
                moreInfoLink,
                topContributors,
                totalContributorsCount,
                leads,
              }}
            />
          )}
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
      className="flex flex-row items-center gap-2 rounded-lg bg-orange-900 px-2.5 py-1 font-walsheim text-xs font-medium text-orange-500 hover:cursor-default"
      {...withTooltip(T("project.visibility.private.tooltip"))}
    >
      <LockFill /> {T("project.visibility.private.name")}
    </div>
  );
}

interface ProjectDescriptionCardProps {
  projectName?: string | null;
  logoUrl: string;
  visibility: string;
  languages: string[];
  description: string;
}

function ProjectDescriptionCard({
  projectName,
  logoUrl,
  visibility,
  languages,
  description,
}: ProjectDescriptionCardProps) {
  return (
    <Card className="flex flex-col gap-4 px-6 py-4">
      <div className="flex flex-row items-center gap-4">
        <img
          alt={projectName || ""}
          src={logoUrl}
          className="h-20 w-20 flex-shrink-0 rounded-lg bg-spaceBlue-900 object-cover"
        />
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-row items-center justify-between font-belwe text-2xl font-normal text-greyscale-50">
            {projectName}
            {visibility === "PRIVATE" && <PrivateTag />}
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
  );
}

interface GithubRepo {
  __typename?: "ProjectGithubRepos" | undefined;
  repo: Repo | null;
  id?: number | null;
}

interface GithubRepositoriesCardProps {
  githubRepos: GithubRepo[];
}

interface ReposRESTfull {
  repos?: Repo[];
}

function GithubRepositoriesCard({ githubRepos }: GithubRepositoriesCardProps & ReposRESTfull) {
  const { T } = useIntl();
  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between border-b border-greyscale-50/8 pb-2 font-walsheim text-base font-medium text-greyscale-50">
        <div className="flex flex-row items-center gap-3">
          <GitRepositoryLine className="text-2xl text-white" />
          {T("project.details.overview.repositories.title")}
        </div>
        <Badge value={githubRepos.length} size={BadgeSize.Small} />
      </div>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {githubRepos?.map(githubRepo => {
          if (githubRepo.repo && githubRepo.repo?.id) {
            return <GithubRepoDetails key={githubRepo.repo?.id} githubRepoId={githubRepo.repo?.id} />;
          } else if (githubRepo?.id) {
            // TODO(Backend): This is a temporary solution until we delete graphql fields
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return <GithubRepoDetails key={githubRepo?.id} githubRepoId={githubRepo?.id} repo={githubRepo} />;
          } else {
            return null;
          }
        })}
      </div>
    </Card>
  );
}

interface ApplyCalloutProps {
  isLoggedIn?: boolean;
  alreadyApplied?: boolean;
  applyToProject: () => void;
  dispatchSession: Dispatch<Action>;
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
}

function ApplyCallout({ isLoggedIn, profile, alreadyApplied, applyToProject, dispatchSession }: ApplyCalloutProps) {
  const { T } = useIntl();

  const contactInfoProvided = Boolean(
    profile.contacts.telegram?.contact ||
      profile.contacts.whatsapp?.contact ||
      profile.contacts.twitter?.contact ||
      profile.contacts.discord?.contact ||
      profile.contacts.linkedin?.contact
  );

  const [contactInfoRequested, setContactInfoRequested] = useState(false);

  const formMethods = useForm<UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });

  const { handleSubmit, formState, getValues, reset } = formMethods;
  const { isDirty, isValid } = formState;

  useEffect(() => {
    const values = getValues();
    // If the form state is modified without this component remounting, this state will be unsynced from the "profile" value so we need to reset the state
    if (JSON.stringify(values) !== JSON.stringify(fromFragment(profile))) {
      reset(fromFragment(profile));
    }
  }, []);

  const [updateUserProfileInfo, { loading }] = useUpdateUserProfileMutation({
    context: { graphqlErrorDisplay: "toaster" },
    refetchQueries: [{ query: OwnUserProfileDocument, variables: { githubUserId: profile.githubUserId } }],
    awaitRefetchQueries: true,
    onCompleted: applyToProject,
  });

  const submitDisabled = !isDirty || !isValid || loading;

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo({ variables: toVariables(formData) });

  return (
    <Callout>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2 font-walsheim text-sm font-medium text-spaceBlue-200">
          <RecordCircleLine />
          {T("project.hiring").toUpperCase()}
        </div>
        {isLoggedIn ? (
          contactInfoRequested && !contactInfoProvided ? (
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 rounded-xl border border-orange-500 p-4">
                  <div className="font-walsheim text-sm font-medium text-orange-500">
                    {T("applications.contactNeeded")}
                  </div>
                  <ContactInformations onlyEditable />
                  <div {...withTooltip(submitDisabled ? "" : T("applications.notYetAppliedTooltip"))}>
                    <Button
                      data-testid="apply-btn"
                      size={ButtonSize.Md}
                      width={Width.Full}
                      disabled={submitDisabled}
                      htmlType="submit"
                    >
                      {T("applications.applyButton")}
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          ) : (
            <div
              {...withTooltip(T(alreadyApplied ? "applications.appliedTooltip" : "applications.notYetAppliedTooltip"))}
            >
              <Button
                data-testid="apply-btn"
                size={ButtonSize.Md}
                width={Width.Full}
                disabled={alreadyApplied}
                onClick={() => {
                  if (!contactInfoProvided) {
                    setContactInfoRequested(true);
                  } else {
                    applyToProject();
                  }
                }}
              >
                {T("applications.applyButton")}
              </Button>
            </div>
          )
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
  );
}
