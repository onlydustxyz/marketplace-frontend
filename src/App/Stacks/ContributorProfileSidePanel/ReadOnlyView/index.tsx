import Header from "src/App/Stacks/ContributorProfileSidePanel/Header";
import IntroSection from "./IntroSection";
import TechnologiesSection from "./TechnologiesSection";
import StatsSection from "./StatsSection";
import ProjectsSection from "./ProjectsSection";
import { useCloseAllStack } from "src/libs/react-stack";
import { UserProfile } from "src/api/Users/queries";
import { useStackProjectOverview } from "../../Stacks";

type Props = {
  profile: UserProfile;
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
};

export default function ReadOnlyView({ profile, isOwn, setEditMode }: Props) {
  const closeAll = useCloseAllStack();
  const [openProjectOverview] = useStackProjectOverview();
  const onClickProject = (slug: string) => {
    openProjectOverview({ slug });
  };
  return (
    <div className="flex h-full flex-col">
      <Header profile={profile} />

      <div className="-mt-12 ml-8 mr-2 flex flex-col gap-12 pb-12 pr-6 pt-4 scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
        <IntroSection profile={profile} isOwn={isOwn} setEditMode={setEditMode} />

        <div className="flex flex-col gap-8">
          {profile?.technologies ? <TechnologiesSection technologies={profile.technologies ?? {}} /> : null}
          <StatsSection profile={profile} />
          {profile?.projects?.length ? (
            <ProjectsSection projects={profile.projects} setOpen={closeAll} event={onClickProject} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
