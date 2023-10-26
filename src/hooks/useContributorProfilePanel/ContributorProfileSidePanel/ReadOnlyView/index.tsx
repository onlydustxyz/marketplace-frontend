import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import IntroSection from "./IntroSection";
import TechnologiesSection from "./TechnologiesSection";
import StatsSection from "./StatsSection";
import ProjectsSection from "./ProjectsSection";
import { Profile } from "src/hooks/useRestfulProfile/useRestfulProfile";
import { useMemo } from "react";

type Props = {
  userProfile: Profile;
  setOpen: (value: boolean) => void;
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
};

export default function ReadOnlyView({ userProfile, isOwn, setOpen, setEditMode }: Props) {
  const languages = useMemo(() => Object.keys(userProfile.technologies || {}), [userProfile]);
  return (
    <div className="flex h-full flex-col">
      <Header profile={userProfile} />

      <div className="-mt-12 ml-8 mr-2 flex flex-col gap-12 pb-12 pr-6 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <IntroSection profile={userProfile} isOwn={isOwn} setEditMode={setEditMode} />

        <div className="flex flex-col gap-8">
          {languages.length > 0 && <TechnologiesSection languages={languages} />}
          <StatsSection profile={userProfile} />
          {userProfile?.projects?.length ? <ProjectsSection projects={userProfile.projects} setOpen={setOpen} /> : null}
        </div>
      </div>
    </div>
  );
}
