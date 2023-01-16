import Overview from "./Overview";
import Payments from "./PaymentActions";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import Contributors from "./Contributors";
import { ProjectDetails } from ".";
import ProjectsSidebar from "./Sidebar";
import { User } from "src/types";

interface Props {
  user: User | null;
  currentProject: ProjectDetails;
  allProjects: ProjectDetails[];
  onChangeProjectFromDropdown: (project: unknown) => void;
  selectedTab: ProjectDetailsTab;
  availableTabs: ProjectDetailsTab[];
  onTabClicked: (tab: ProjectDetailsTab) => void;
  onInvitationAccepted: (invitationId: string) => void;
}

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
  Contributors = "Contributors",
}

export default function View({
  user,
  currentProject,
  allProjects,
  onChangeProjectFromDropdown,
  selectedTab,
  availableTabs,
  onTabClicked,
  onInvitationAccepted,
}: Props) {
  return (
    <div className="flex flex-1 w-full gap-2 h-full">
      <ProjectsSidebar
        {...{
          user,
          currentProject,
          allProjects,
          onChangeProjectFromDropdown,
          selectedTab,
          availableTabs,
          onTabClicked,
        }}
      />
      <div className="bg-space p-5 flex flex-col flex-1 rounded-r-2xl">
        {selectedTab === ProjectDetailsTab.Overview && currentProject.githubRepoInfo?.contributors && (
          <Overview {...currentProject}>
            {currentProject.invitationId && (
              <ProjectLeadInvitation
                projectName={currentProject.name}
                onClick={() => currentProject.invitationId && onInvitationAccepted(currentProject.invitationId)}
              />
            )}
          </Overview>
        )}
        {selectedTab === ProjectDetailsTab.Payments && currentProject.budget && (
          <Payments projectId={currentProject.id} budget={currentProject.budget} />
        )}
        {selectedTab === ProjectDetailsTab.Contributors && <Contributors projectId={currentProject.id} />}
      </div>
    </div>
  );
}
