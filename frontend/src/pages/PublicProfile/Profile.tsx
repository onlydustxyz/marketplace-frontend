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
    <div className="flex w-full h-full min-h-0 bg-greyscale-900 drop-shadow-lg rounded-3xl p-4">
      <div className="flex flex-row w-full min-h-0 divide-x divide-greyscale-50/8 gap-4">
        <div className="flex flex-col basis-1/2 overflow-y-scroll">
          <Header
            profile={{ ...profile, cover: translateProfileCover(profile.cover) ?? ProfileCover.Blue }}
            rounded={true}
          />
          <div className="flex flex-col gap-12 ml-8">
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
        <div className="flex flex-col gap-12 basis-1/2 pl-8 pr-4 overflow-y-scroll">
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
