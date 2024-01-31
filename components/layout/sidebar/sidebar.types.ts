import { ReactNode } from "react";

export namespace TSidebar {
  export interface Props {
    children: ({ closePanel }: { closePanel?: () => void }) => ReactNode;
    mobileHeader?: JSX.Element;
  }
}
