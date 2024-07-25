import { PropsWithChildren } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

export namespace THackathonContext {
  export interface Props extends PropsWithChildren {
    hasEvents: boolean;
    hackathonId: string;
  }

  export interface Return {
    panelSize: ReturnType<typeof HackathonUtils.getContainerSize>;
    timeline: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    };
    issues: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    };
    hackathonId: string;
    project: {
      isOpen: boolean;
      projectId: string;
      open: (projectId: string) => void;
      close: () => void;
    };
  }
}
