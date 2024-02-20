import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import BurgerIcon from "src/assets/icons/BurgerIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import CloseLine from "src/icons/CloseLine";

import { Avatar } from "components/ds/avatar/avatar";

import { ProjectDetailsTab } from ".";
import BackLink from "./BackLink";
import View from "./View";

interface Props {
  expandable: boolean;
  currentProject: UseGetProjectBySlugResponse;
  projects: components["schemas"]["ProjectLedShortResponse"][];
  pendingProjects: components["schemas"]["ProjectLedShortResponse"][];
  availableTabs: ProjectDetailsTab[];
}

export default function ViewMobile(props: Props) {
  const { currentProject } = props;

  const { T } = useIntl();
  const location = useLocation();
  const router = useRouter();
  const [panelOpen, setPanelOpen] = useState(!!location.state?.openMenu);

  const isGrantingReward = location.pathname.match("rewards/new");

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6">
        {!isGrantingReward && (
          <>
            <div className="flex items-center gap-1">
              <BackLink to={RoutePaths.Projects} className="divide-none" />
              <div className="flex items-center gap-2 font-belwe text-2xl">
                <Avatar src={currentProject?.logoUrl || ""} alt="Project Logo" size="s" />
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
            <Button onClick={() => router.back()} type={ButtonType.Secondary} size={ButtonSize.Sm} iconOnly>
              <CloseLine className="text-base" />
            </Button>

            <div className="font-belwe text-2xl xl:text-3xl">{T("project.details.rewards.new.title")}</div>
          </div>
        )}
      </div>
      <SidePanel withBackdrop open={panelOpen} setOpen={setPanelOpen} hasCloseButton={false} placement="bottom">
        <View {...props} onLinkClick={() => setPanelOpen(false)} />
      </SidePanel>
    </>
  );
}
