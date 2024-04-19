import Header from "src/App/Stacks/ContributorProfileSidePanel/Header";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import { useCloseAllStack } from "src/libs/react-stack";

import { useStackProjectOverview } from "../../Stacks";
import IntroSection from "./IntroSection";
import ProjectsSection from "./ProjectsSection";
import StatsSection from "./StatsSection";
import TechnologiesSection from "./TechnologiesSection";

type Props = {
  profile: UseGetMyProfileInfoResponse;
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
};

export default function ReadOnlyView({ profile, isOwn, setEditMode }: Props) {
  const closeAll = useCloseAllStack();
  const [openProjectOverview] = useStackProjectOverview();
  const onClickProject = (slug: string) => {
    openProjectOverview({ slug });
  };

  const isTechnologiesEmpty =
    profile?.technologies &&
    Object.keys(profile?.technologies).length === 0 &&
    profile?.technologies.constructor === Object;

  return (
    <div className="flex h-full flex-col">
      <Header profile={profile} />

      <div className="-mt-12 ml-8 mr-2 flex flex-col gap-12 pb-12 pr-6 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <IntroSection profile={profile} isOwn={isOwn} setEditMode={setEditMode} />

        <div className="flex flex-col gap-8">
          {!isTechnologiesEmpty ? <TechnologiesSection technologies={profile.technologies ?? {}} /> : null}
          <StatsSection profile={profile} />
          {profile?.projects?.length ? (
            <ProjectsSection projects={profile.projects} setOpen={closeAll} event={onClickProject} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
