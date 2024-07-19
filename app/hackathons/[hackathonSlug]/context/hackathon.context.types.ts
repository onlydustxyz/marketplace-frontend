import { PropsWithChildren } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

export namespace THackathonContext {
  export interface Props extends PropsWithChildren {}

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
      open: () => void;
      close: () => void;
    };
  }
}
