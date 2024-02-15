import { PropsWithChildren, ReactNode } from "react";

import { TButton } from "components/ds/button/button.types";

export namespace TConfirmationModal {
  export interface Props extends PropsWithChildren {
    open?: boolean;
    onOpen?: () => void;
    onClose: () => void;
    title?: ReactNode;
    content?: ReactNode;
    width?: string | number;
    closeOnConfirm?: boolean;
    closeOnCancel?: boolean;
    buttons: {
      confirm?: TButton.Props;
      cancel?: TButton.Props;
    };
  }
}
