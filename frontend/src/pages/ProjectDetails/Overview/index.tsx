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
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import { useSuspenseQuery_experimental } from "@apollo/client";
import { Dispatch, useEffect, useState } from "react";
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

type OutletContext = {
  projectId: string;
  projectKey: string;
};

export default function Overview() {
  const { T } = useIntl();
  const { projectId, projectKey } = useOutletContext<OutletContext>();
  const { isLoggedIn, githubUserId } = useAuth();
  const { ledProjectIds } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const navigate = useNavigate();
  const dispatchSession = useSessionDispatch();

  const { data } = useSuspenseQuery_experimental<GetProjectOverviewDetailsQuery>(GetProjectOverviewDetailsDocument, {
    variables: { projectId },
    ...contextWithCacheHeaders,
  });

  const projectName = data?.projects[0]?.name;
  const logoUrl = data?.projects[0]?.logoUrl || onlyDustLogo;
  const description = data?.projects[0]?.longDescription || LOREM_IPSUM;
  const githubRepos = sortBy(data?.projects[0]?.githubRepos, "repo.stars")
    .reverse()
    .filter(r => r.repo);
  const sponsors = data?.projects[0]?.sponsors.map(s => s.sponsor) || [];
  const moreInfoLink = data?.projects[0]?.moreInfoLink || null;
  const topContributors = data?.projects[0]?.contributors.map(c => c.githubUser).filter(isDefined) || [];
  const totalContributorsCount = data?.projects[0]?.contributorsAggregate.aggregate?.count || 0;
  const leads = data?.projects[0]?.projectLeads.map(u => u.user).filter(isDefined);
  const languages = getMostUsedLanguages(getDeduplicatedAggregatedLanguages(githubRepos.map(r => r.repo)));
  const hiring = data?.projects[0]?.hiring;
  const invitationId = data?.projects[0]?.pendingInvitations.find(i => i.githubUserId === githubUserId)?.id;
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

  return (
    <>
      <Title>
        <div className="flex flex-row items-center justify-between gap-2">
          {T("project.details.overview.title")}
          {isProjectLeader && (
            <Button
              size={ButtonSize.Sm}
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
      <ProjectLeadInvitation projectId={projectId} />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex grow flex-col gap-4">
          <ProjectDescriptionCard
            {...{ projectName, logoUrl, visibility: data?.projects[0]?.visibility, languages, description }}
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
          <GithubRepositoriesCard githubRepos={githubRepos} />
        </div>
        <div className="flex shrink-0 flex-col gap-4 md:w-72 xl:w-80 3xl:w-116">
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
            {visibility === "private" && <PrivateTag />}
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

interface GithubRepositoriesCardProps {
  githubRepos: {
    __typename?: "ProjectGithubRepos";
    repo: { __typename?: "GithubRepos"; stars: number; id: number } | null;
  }[];
}

function GithubRepositoriesCard({ githubRepos }: GithubRepositoriesCardProps) {
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
        {githubRepos &&
          githubRepos.map(githubRepo => (
            <GithubRepoDetails key={githubRepo.repo?.id} githubRepoId={githubRepo.repo?.id} />
          ))}
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

  const contactInfoProvided =
    profile.contacts.telegram?.contact ||
    profile.contacts.whatsapp?.contact ||
    profile.contacts.twitter?.contact ||
    profile.contacts.discord?.contact ||
    profile.contacts.linkedin?.contact;

  const [contactInfoRequested, setContactInfoRequested] = useState(false);

  const formMethods = useForm<UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });

  const { handleSubmit, formState } = formMethods;
  const { isDirty, isValid } = formState;

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
