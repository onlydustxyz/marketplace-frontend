import { useMemo } from "react";
import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import IntroSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/IntroSection";
import ProjectsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ProjectsSection";
import StatsSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/StatsSection";
import TechnologiesSection from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/TechnologiesSection";
import { Profile as ProfileType } from "src/hooks/useRestfulProfile/useRestfulProfile";

type Props = {
  userProfile: ProfileType;
  gqlProfile?: UserProfileFragment & OwnUserProfileDetailsFragment; // use this for the completion score, should be revamp when we revamp the edit profile
};

export default function Profile({ userProfile, gqlProfile }: Props) {
  const languages = useMemo(() => Object.keys(userProfile.technologies || {}), [userProfile]);

  return (
    <div className="flex h-full min-h-0 w-full bg-greyscale-900 px-4 md:rounded-3xl">
      <div className="flex min-h-0 w-full flex-col gap-4 lg:flex-row lg:divide-x lg:divide-greyscale-50/8">
        <div className="flex flex-col py-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:basis-1/2 lg:overflow-y-auto">
          <Header profile={{ ...userProfile }} rounded={true} />
          <div className="flex flex-col gap-12 px-px lg:ml-8">
            <IntroSection
              gqlProfile={gqlProfile}
              profile={userProfile}
              isOwn={false}
              isPublic={true}
              setEditMode={() => {
                return;
              }}
            />
            {languages.length > 0 && <TechnologiesSection languages={languages} />}
          </div>
        </div>
        <div className="flex flex-col gap-12 px-px py-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5 lg:basis-1/2 lg:overflow-y-auto lg:pl-8 lg:pr-4">
          <StatsSection profile={userProfile} />
          {userProfile?.projects?.length ? (
            <ProjectsSection
              projects={userProfile?.projects}
              setOpen={() => {
                return;
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
