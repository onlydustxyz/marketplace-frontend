import { useState } from "react";
import { RoutePaths } from "src/App";
import BurgerIcon from "src/assets/icons/BurgerIcon";
import RoundedImage, { ImageSize } from "src/components/RoundedImage";
import { ProjectDetailsTab } from ".";
import BackLink from "./BackLink";
import View, { SidebarProjectDetails } from "./View";
import SidePanelWithBackdrop from "src/components/SidePanelWithBackdrop";
import { useLocation, useNavigate } from "react-router-dom";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { useIntl } from "src/hooks/useIntl";

interface Props {
  expandable: boolean;
  currentProject: SidebarProjectDetails;
  allProjects: SidebarProjectDetails[];
  availableTabs: ProjectDetailsTab[];
}

export default function ViewMobile(props: Props) {
  const { currentProject } = props;
  const [panelOpen, setPanelOpen] = useState(false);

  const { T } = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  const isGrantingReward = location.pathname.match("rewards/new");

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6">
        {!isGrantingReward && (
          <>
            <div className="flex items-center gap-1">
              <BackLink to={RoutePaths.Projects} className="divide-none" />
              <div className="flex items-center gap-2 font-belwe text-2xl">
                <RoundedImage src={currentProject?.logoUrl || ""} alt="Project Logo" size={ImageSize.Sm} />
                <div className="line-clamp-1">{currentProject.name}</div>
              </div>
            </div>
            <button className="rounded-lg border p-2" onClick={() => setPanelOpen(true)}>
              <BurgerIcon />
            </button>
          </>
        )}
        {isGrantingReward && (
          <div className="flex flex-row items-center gap-3">
            <div onClick={() => navigate(-1)}>
              <Button type={ButtonType.Secondary} size={ButtonSize.Sm} iconOnly>
                <CloseLine className="text-base" />
              </Button>
            </div>
            <div className="font-belwe text-2xl xl:text-3xl">{T("project.details.rewards.new.title")}</div>
          </div>
        )}
      </div>
      <SidePanelWithBackdrop open={panelOpen} setOpen={setPanelOpen} placement="bottom" hasCloseButton={false}>
        <View {...props} onLinkClick={() => setPanelOpen(false)} />
      </SidePanelWithBackdrop>
    </>
  );
}
