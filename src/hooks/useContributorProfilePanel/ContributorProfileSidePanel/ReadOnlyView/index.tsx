import { ProfileCover } from "src/__generated/graphql";
import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import { translateProfileCover } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";
import IntroSection from "./IntroSection";
import { UserProfile } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/useUserProfile";
import TechnologiesSection from "./TechnologiesSection";
import StatsSection from "./StatsSection";
import ProjectsSection from "./ProjectsSection";

type Props = {
  userProfile: UserProfile;
  setOpen: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
};

export default function ReadOnlyView({
  userProfile: { profile, projects, languages, contributionCounts, contributionCountVariationSinceLastWeek },
  isOwn,
  setOpen,
  setEditMode,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <Header profile={{ ...profile, cover: translateProfileCover(profile.cover) ?? ProfileCover.Blue }} />

      <div className="-mt-12 ml-8 mr-2 flex flex-col gap-12 pb-12 pr-6 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <IntroSection profile={profile} isOwn={isOwn} setEditMode={setEditMode} />

        <div className="flex flex-col gap-8">
          {languages.length > 0 && <TechnologiesSection languages={languages} />}
          <StatsSection
            profile={profile}
            contributionCounts={contributionCounts}
            contributionCountVariationSinceLastWeek={contributionCountVariationSinceLastWeek}
          />
          {projects.length > 0 && <ProjectsSection projects={projects} setOpen={setOpen} />}
        </div>
      </div>
    </div>
  );
}
