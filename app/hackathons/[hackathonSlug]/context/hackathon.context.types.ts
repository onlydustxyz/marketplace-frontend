import { PropsWithChildren } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

export namespace THackathonContext {
  export interface Props extends PropsWithChildren {
    hasEvents: boolean;
  }

  export interface Return {
    panelSize: ReturnType<typeof HackathonUtils.getContainerSize>;
    timeline: {
      isOpen: boolean;
    };
    issues: {
      isOpen: boolean;
      open: () => void;
      close: () => void;
    };
    project: {
      isOpen: boolean;
      projectId: string;
      open: (projectId: string) => void;
      close: () => void;
    };
  }
}
