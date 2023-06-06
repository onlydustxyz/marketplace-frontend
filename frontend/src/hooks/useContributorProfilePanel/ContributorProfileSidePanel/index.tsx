import { ProfileProjectFragment } from "src/__generated/graphql";
import View from "./View";
import { Project } from "./ReadOnlyView/ProjectCard";
import { find, unionBy } from "lodash";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";
import { useAuth } from "src/hooks/useAuth";
import isDefined from "src/utils/isDefined";
import { HeaderColor } from "./Header";
import useUserProfile from "./useUserProfile";

type Props = {
  githubUserId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

type AugmentedProfileProjectFragment = {
  leadSince?: Date;
} & ProfileProjectFragment;

export default function ContributorProfileSidePanel({ githubUserId, ...rest }: Props) {
  const { user: currentUser, githubUserId: currentUserGithubId } = useAuth();
  const { userProfile } = useUserProfile(githubUserId);

  const projectLeaded =
    userProfile?.projectsLeaded
      .map(
        project =>
          ({
            ...project.project,
            leadSince: new Date(project.assignedAt + "Z"),
          } as AugmentedProfileProjectFragment)
      )
      .filter(isDefined) || [];

  const projectsContributed =
    userProfile?.projectsContributed.filter(isDefined).map(
      project =>
        ({
          ...project.project,
        } as AugmentedProfileProjectFragment)
    ) || [];

  const projects: Project[] = unionBy(projectLeaded, projectsContributed, p => p.id)
    .filter(project =>
      isProjectVisibleToUser({
        project,
        user: { userId: currentUser?.id, githubUserId: currentUserGithubId },
      })
    )
    .map(
      project =>
        ({
          id: project.id,
          name: project.projectDetails?.name,
          logoUrl: project.projectDetails?.logoUrl || onlyDustLogo,
          leadSince: project.leadSince,
          private: project.projectDetails?.visibility === "Private",
          contributionCount: find(userProfile?.contributionStats, { projectId: project.id })?.totalCount,
          lastContribution: find(userProfile?.contributionStats, { projectId: project.id })?.maxDate,
          contributorCount: project.contributorsAggregate?.aggregate?.count || 0,
          totalGranted: project.budgetsAggregate?.aggregate?.sum?.spentAmount || 0,
        } as Project)
    )
    .filter(project => project.leadSince || project.contributionCount);

  return userProfile ? (
    <View
      isOwn={currentUserGithubId === userProfile.githubUserId}
      profile={userProfile}
      projects={projects}
      {...rest}
      headerColor={HeaderColor.Blue}
    />
  ) : (
    <div />
  );
}
