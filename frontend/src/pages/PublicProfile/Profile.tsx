import { ProfileCover } from "src/__generated/graphql";
import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import IntroSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/IntroSection";
import ProjectsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ProjectsSection";
import StatsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/StatsSection";
import TechnologiesSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/TechnologiesSection";
import { UserProfile } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import { translateProfileCover } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";

type Props = {
  userProfile: UserProfile;
};

export default function Profile({
  userProfile: { profile, projects, languages, contributionCounts, contributionCountVariationSinceLastWeek },
}: Props) {
  return (
    <div className="flex w-full h-full min-h-0 bg-greyscale-900 md:rounded-3xl px-4">
      <div className="flex w-full min-h-0 gap-4 flex-col lg:flex-row lg:divide-x lg:divide-greyscale-50/8">
        <div className="flex flex-col lg:basis-1/2 lg:overflow-y-auto py-4">
          <Header
            profile={{ ...profile, cover: translateProfileCover(profile.cover) ?? ProfileCover.Blue }}
            rounded={true}
          />
          <div className="flex flex-col gap-12 px-px lg:ml-8">
            <IntroSection
              profile={profile}
              isOwn={false}
              isPublic={true}
              setEditMode={() => {
                return;
              }}
            />
            {languages.length > 0 && <TechnologiesSection languages={languages} />}
          </div>
        </div>
        <div className="flex flex-col gap-12 px-px lg:pl-8 lg:pr-4 lg:basis-1/2 lg:overflow-y-auto py-4">
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
