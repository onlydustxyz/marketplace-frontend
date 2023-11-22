import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { sortBy } from "lodash";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { generatePath, useNavigate, useOutletContext } from "react-router-dom";
import { ProjectRewardsRoutePaths, ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import {
  OwnUserProfileDetailsFragment,
  OwnUserProfileDocument,
  UserProfileFragment,
  useUpdateUserProfileMutation,
} from "src/__generated/graphql";
import Badge, { BadgeSize } from "src/components/Badge";
import Button, { ButtonSize, Width } from "src/components/Button";
import Callout from "src/components/Callout";
import Card from "src/components/Card";
import ContactInformations from "src/components/ContactInformations";
import MarkdownPreview from "src/components/MarkdownPreview";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import Tag, { TagSize } from "src/components/Tag";
import { withTooltip } from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { useAuth } from "src/hooks/useAuth";
import {
  UserProfileInfo,
  fromFragment,
  toVariables,
} from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/EditView/types";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { useIntl } from "src/hooks/useIntl";
import useProjectVisibility from "src/hooks/useProjectVisibility";
import { Action, SessionMethod, useSession, useSessionDispatch } from "src/hooks/useSession";
import { rates } from "src/hooks/useWorkEstimation";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import LockFill from "src/icons/LockFill";
import RecordCircleLine from "src/icons/RecordCircleLine";
import Title from "src/pages/ProjectDetails/Title";
import { buildLanguageString } from "src/utils/languages";
import { getTopTechnologies } from "src/utils/technologies";
import { useMediaQuery } from "usehooks-ts";
import GithubRepoDetails from "./GithubRepoDetails";
import OverviewPanel from "./OverviewPanel";
import useApplications from "./useApplications";
import Flex from "src/components/Utils/Flex";
import StillFetchingBanner from "../Banners/StillFetchingBanner";
import { OutletContext } from "../View";
import { useProjectLeader } from "src/hooks/useProjectLeader/useProjectLeader";
import { EditProjectButton } from "../components/EditProjectButton";
import { useLoginUrl } from "src/hooks/useLoginUrl/useLoginUrl";

export default function Overview() {
  const { T } = useIntl();
  const { project } = useOutletContext<OutletContext>();
  const { isLoggedIn, githubUserId } = useAuth();
  const { lastVisitedProjectId } = useSession();
  const navigate = useNavigate();
  const dispatchSession = useSessionDispatch();
  const projectId = project?.id;
  const projectName = project?.name;
  const projectSlug = project?.slug;
  const logoUrl = project?.logoUrl || onlyDustLogo;
  const description = project?.longDescription || LOREM_IPSUM;
  const githubRepos = sortBy(project?.repos, "stars")
    .reverse()
    .filter(r => r);
  const sponsors = project?.sponsors || [];
  const moreInfoLink = project?.moreInfoUrl || null;
  const topContributors = project?.topContributors || [];
  const totalContributorsCount = project?.contributorCount || 0;
  const leads = project?.leaders;
  const languages = getTopTechnologies(project?.technologies);
  const hiring = project?.hiring;
  const isProjectLeader = useProjectLeader({ id: projectId });

  const { alreadyApplied, applyToProject } = useApplications(projectId);
  const { isCurrentUserMember } = useProjectVisibility(projectId);

  const { data: userProfileData } = useUserProfile({ githubUserId });
  const profile = userProfileData?.profile;

  const isInvited = !!project.invitedLeaders.find(invite => invite.githubUserId === githubUserId);

  useEffect(() => {
    if (projectId && projectId !== lastVisitedProjectId && isProjectLeader) {
      dispatchSession({ method: SessionMethod.SetLastVisitedProjectId, value: projectId });
    }
  }, [projectId, isProjectLeader]);

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const remainingBudget = project?.remainingUsdBudget;
  const isRewardDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  return (
    <>
      <StillFetchingBanner createdAt={project?.createdAt} />
      <Title>
        <div className="flex flex-row items-center justify-between gap-2">
          {T("project.details.overview.title")}
          {isProjectLeader ? (
            <Flex className="justify-end gap-2">
              <EditProjectButton projectKey={projectSlug} />

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
                        projectKey: projectSlug,
                      }
                    )
                  )
                }
              >
                {T("project.rewardButton.full")}
              </Button>
            </Flex>
          ) : null}
        </div>
      </Title>
      <ProjectLeadInvitation
        projectId={projectId}
        size={CalloutSizes.Large}
        projectSlug={projectSlug}
        isInvited={isInvited}
        projectName={project?.name}
      />
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
          <GithubRepositoriesCard githubRepos={githubRepos} />
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
  githubRepos: components["schemas"]["GithubRepoResponse"][];
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
        {githubRepos?.map(githubRepo => (
          <GithubRepoDetails key={githubRepo.id} githubRepo={githubRepo} />
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
  const getLoginUrl = useLoginUrl();
  const login_url = useMemo(() => getLoginUrl(), []);
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
            href={login_url}
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
