import Overview from "./Overview";
import Payments from "./PaymentActions";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import Contributors from "./Contributors";
import { ProjectDetails } from ".";
import ProjectsSidebar from "./Sidebar";
import { ProjectDetailsTab } from "./ProjectDetailsContext";

interface Props {
  currentProject: ProjectDetails;
  onProjectSelected: (projectId: string) => void;
  selectedTab: ProjectDetailsTab;
  availableTabs: ProjectDetailsTab[];
  onInvitationAccepted: (invitationId: string) => void;
}

export default function View({
  currentProject,
  onProjectSelected,
  selectedTab,
  availableTabs,
  onInvitationAccepted,
}: Props) {
  return (
    <div className="flex flex-1 w-full gap-2 h-full">
      <ProjectsSidebar
        {...{
          currentProject,
          onProjectSelected,
          selectedTab,
          availableTabs,
        }}
      />
      <div className="bg-space bg-no-repeat bg-fixed p-5 flex flex-col flex-1 rounded-r-2xl">
        {selectedTab === ProjectDetailsTab.Overview && currentProject.githubRepoInfo?.contributors && (
          <Overview {...currentProject} lead={{ ...currentProject.leads[0] }}>
            {currentProject.invitationId && (
              <ProjectLeadInvitation
                projectName={currentProject.name}
                onClick={() => currentProject.invitationId && onInvitationAccepted(currentProject.invitationId)}
              />
            )}
          </Overview>
        )}
        {selectedTab === ProjectDetailsTab.Payments && <Payments projectId={currentProject.id} />}
        {selectedTab === ProjectDetailsTab.Contributors && <Contributors projectId={currentProject.id} />}
      </div>
    </div>
  );
}
