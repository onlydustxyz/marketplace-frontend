import { useState } from "react";
import { RoutePaths } from "src/App";
import BurgerIcon from "src/assets/icons/BurgerIcon";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import SidePanel from "src/components/SidePanel";
import { ProjectDetailsTab } from ".";
import BackLink from "./BackLink";
import View, { SidebarProjectDetails } from "./View";
import CloseLine from "src/icons/CloseLine";

interface Props {
  expandable: boolean;
  currentProject: SidebarProjectDetails;
  allProjects: SidebarProjectDetails[];
  availableTabs: ProjectDetailsTab[];
}

export default function ViewMobile(props: Props) {
  const { currentProject } = props;
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6">
        <div className="flex items-center gap-1">
          <BackLink to={RoutePaths.Projects} className="divide-none" />
          <div className="flex items-center gap-2 font-belwe text-2xl">
            <RoundedImage src={currentProject?.logoUrl || ""} alt="Project Logo" size={ImageSize.Sm} />
            <div className="line-clamp-1">{currentProject.name}</div>
          </div>
        </div>
        {panelOpen ? (
          <div className="rounded-lg border border-spacePurple-200 p-2 text-spacePurple-300">
            <CloseLine className="flex h-3.5 w-3.5 items-center justify-center text-lg" />
          </div>
        ) : (
          <button className="rounded-lg border p-2" onClick={() => setPanelOpen(true)}>
            <BurgerIcon />
          </button>
        )}
      </div>
      <SidePanel open={panelOpen} setOpen={setPanelOpen} placement="bottom" hasCloseButton={false}>
        <View {...props} onLinkClick={() => setPanelOpen(false)} />
      </SidePanel>
    </>
  );
}
