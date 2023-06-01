import { useUserProfileQuery } from "src/__generated/graphql";
import View, { HeaderColor } from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";
import { Project } from "./ProjectCard";
import { unionBy } from "lodash";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";
import { useAuth } from "src/hooks/useAuth";

type Props = {
  githubUserId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, ...rest }: Props) {
  const { user: currentUser, githubUserId: currentUserGithubId } = useAuth();
  const { data } = useUserProfileQuery({ variables: { githubUserId }, ...contextWithCacheHeaders });
  const userProfile = data?.userProfiles.at(0);

  const projects: Project[] = unionBy(
    userProfile?.projectsLeaded
      .filter(project =>
        isProjectVisibleToUser({
          project: project.project,
          user: { userId: currentUser?.id, githubUserId: currentUserGithubId },
        })
      )
      .map(
        project =>
          ({
            ...project,
            id: project.projectId,
            name: project.project?.projectDetails?.name || "",
            logoUrl: project.project?.projectDetails?.logoUrl || onlyDustLogo,
            leadSince: new Date(project.assignedAt + "Z"),
            contributorCount: project.project?.contributorsAggregate.aggregate?.count || 0,
            totalGranted: project.project?.budgetsAggregate.aggregate?.sum?.spentAmount || 0,
            private: project.project?.projectDetails?.visibility === "Private",
          } as Project)
      ),
    userProfile?.projects
      .filter(project =>
        isProjectVisibleToUser({
          project: project.project,
          user: { userId: currentUser?.id, githubUserId: currentUserGithubId },
        })
      )
      .map(project => ({
        ...project,
        id: project.projectId,
        name: project.project?.projectDetails?.name || "",
        logoUrl: project.project?.projectDetails?.logoUrl || onlyDustLogo,
        contributionCount: project.contributionCount,
        lastContribution: project.maxContributionDate,
        contributorCount: project.project?.contributorsAggregate.aggregate?.count || 0,
        totalGranted: project.project?.budgetsAggregate.aggregate?.sum?.spentAmount || 0,
        private: project.project?.projectDetails?.visibility === "Private",
      })),
    "id"
  );

  return userProfile ? (
    <View profile={userProfile} projects={projects} {...rest} headerColor={HeaderColor.Blue} />
  ) : (
    <div />
  );
}
