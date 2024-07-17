import { ReactNode } from "react";

import { Key } from "hooks/translate/use-translate";

export namespace TInfoDropdown {
  export interface Props {
    targetLabel: ReactNode;
    dropdownTitleToken: Key;
    links: { url?: string | null; value?: string }[];
  }
}
