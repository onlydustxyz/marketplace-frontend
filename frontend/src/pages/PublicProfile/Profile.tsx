import { ProfileCover } from "src/__generated/graphql";
import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import IntroSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/IntroSection";
import ProjectsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ProjectsSection";
import StatsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/StatsSection";
import TechnologiesSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/TechnologiesSection";
import useUserProfile from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { translateProfileCover } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";

type Props = {
  userLogin: string;
};

export default function Profile({ userLogin }: Props) {
  const userProfile = useUserProfile({ githubUserLogin: userLogin });
  if (!userProfile) {
    return <></>;
  }

  const { profile, projects, languages, contributionCounts, contributionCountVariationSinceLastWeek } = userProfile;

  return (
    <div className="flex w-full h-full bg-greyscale-900 drop-shadow-lg rounded-3xl p-4">
      <div className="flex flex-row divide-x divide-greyscale-50/8 gap-4">
        <div className="flex flex-col w-full scrollbar-thin scrollbar-thumb-rounded">
          <Header
            profile={{ ...profile, cover: translateProfileCover(profile.cover) ?? ProfileCover.Blue }}
            rounded={true}
          />
          <div className="ml-8">
            <IntroSection
              profile={profile}
              isOwn={false}
              setEditMode={() => {
                return;
              }}
            />
            {languages.length > 0 && <TechnologiesSection languages={languages} />}
          </div>
        </div>
        <div className="flex flex-col w-full pl-8 pr-4 scrollbar-thin scrollbar-thumb-rounded">
          <StatsSection
            profile={profile}
            contributionCounts={contributionCounts}
            contributionCountVariationSinceLastWeek={contributionCountVariationSinceLastWeek}
          />
          {projects.length > 0 && (
            <ProjectsSection
              projects={projects}
              setOpen={() => {
                return;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
