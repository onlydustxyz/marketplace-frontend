import { ReactNode } from "react";

import { TAvatar } from "components/ds/avatar/avatar.types";

export namespace TActivityContent {
  export interface Props {
    mainAvatar: TAvatar.Props;
    from: ReactNode;
    action: ReactNode;
    to: ReactNode;
    badge: ReactNode;
    timestamp: string;
    lastElement: boolean;
    details?: ReactNode;
  }
}
