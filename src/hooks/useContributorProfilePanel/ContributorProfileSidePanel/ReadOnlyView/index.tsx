import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import IntroSection from "./IntroSection";
import TechnologiesSection from "./TechnologiesSection";
import StatsSection from "./StatsSection";
import ProjectsSection from "./ProjectsSection";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import { useMemo } from "react";
import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import { useCloseStack } from "src/libs/react-stack";

type Props = {
  userProfile: Profile;
  gqlProfile: UserProfileFragment & OwnUserProfileDetailsFragment; // use this for the completion score, should be revamp when we revamp the edit profile
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
};

export default function ReadOnlyView({ userProfile, gqlProfile, isOwn, setEditMode }: Props) {
  const languages = useMemo(() => Object.keys(userProfile.technologies || {}), [userProfile]);
  const closeAll = useCloseStack();
  return (
    <div className="flex h-full flex-col">
      <Header profile={userProfile} />

      <div className="-mt-12 ml-8 mr-2 flex flex-col gap-12 pb-12 pr-6 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <IntroSection gqlProfile={gqlProfile} profile={userProfile} isOwn={isOwn} setEditMode={setEditMode} />

        <div className="flex flex-col gap-8">
          {languages.length > 0 && <TechnologiesSection languages={languages} />}
          <StatsSection profile={userProfile} />
          {userProfile?.projects?.length ? (
            <ProjectsSection projects={userProfile.projects} setOpen={closeAll} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
