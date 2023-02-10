import Overview from "./Overview";
import Payments from "./Payments";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import Contributors from "./Contributors";
import { ProjectDetails } from ".";
import ProjectsSidebar from "./Sidebar";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { ProjectDetailsTab__deprecated } from "./ProjectDetailsContext";

interface Props {
  currentProject: ProjectDetails;
  selectedTab: ProjectDetailsTab__deprecated;
  availableTabs__deprecated: ProjectDetailsTab__deprecated[];
  onInvitationAccepted: (invitationId: string) => void;
}

export default function View({ currentProject, selectedTab, availableTabs__deprecated, onInvitationAccepted }: Props) {
  return (
    <div className="flex flex-1 w-full gap-2 h-full">
      <ProjectsSidebar
        {...{
          currentProject,
          selectedTab,
          availableTabs__deprecated,
        }}
      />
      <Background roundedBorders={BackgroundRoundedBorders.Right}>
        <div className="h-full p-5 flex flex-col flex-1">
          {selectedTab === ProjectDetailsTab__deprecated.Overview && currentProject.githubRepoInfo?.contributors && (
            <Overview {...currentProject} lead={{ ...currentProject.leads[0] }}>
              {currentProject.invitationId && (
                <ProjectLeadInvitation
                  projectName={currentProject.name}
                  onClick={() => currentProject.invitationId && onInvitationAccepted(currentProject.invitationId)}
                />
              )}
            </Overview>
          )}
          {selectedTab === ProjectDetailsTab__deprecated.Payments && <Payments projectId={currentProject.id} />}
          {selectedTab === ProjectDetailsTab__deprecated.Contributors && <Contributors projectId={currentProject.id} />}
        </div>
      </Background>
    </div>
  );
}
