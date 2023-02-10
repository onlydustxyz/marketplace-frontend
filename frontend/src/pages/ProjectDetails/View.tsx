import { ProjectDetails } from ".";
import ProjectsSidebar from "./Sidebar";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { ProjectDetailsTab } from "./ProjectDetailsContext";
import { Outlet } from "react-router-dom";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";

interface Props {
  currentProject: ProjectDetails;
  onProjectSelected: (projectId: string) => void;
  selectedTab: ProjectDetailsTab;
  availableTabs__deprecated: ProjectDetailsTab[];
  onInvitationAccepted: (invitationId: string) => void;
}

export default function View({
  currentProject,
  onProjectSelected,
  selectedTab,
  availableTabs__deprecated,
  onInvitationAccepted,
}: Props) {
  const outletContext = {
    ...currentProject,
    lead: currentProject.leads[0],
    projectId: currentProject.id,
    children: currentProject.invitationId && (
      <ProjectLeadInvitation
        projectName={currentProject.name}
        onClick={() => currentProject.invitationId && onInvitationAccepted(currentProject.invitationId)}
      />
    ),
  };
  return (
    <div className="flex flex-1 w-full gap-2 h-full">
      <ProjectsSidebar
        {...{
          currentProject,
          onProjectSelected,
          selectedTab,
          availableTabs__deprecated,
        }}
      />
      <Background roundedBorders={BackgroundRoundedBorders.Right}>
        <div className="h-full p-5 flex flex-col flex-1">
          <Outlet context={outletContext} />
        </div>
      </Background>
    </div>
  );
}
