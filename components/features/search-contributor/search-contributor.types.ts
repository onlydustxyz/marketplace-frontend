import { ListboxProps } from "@nextui-org/react";

import { ContributorResponse } from "src/types";

export namespace TSearchContributor {
  export interface ListboxItemSection {
    name: string;
    items: ContributorResponse[];
    showDivider: boolean;
  }

  export type Base = Partial<ListboxProps>;
  export interface Props extends Base {
    onSelectContributors: (user: ContributorResponse[]) => void;
    initialValue?: ContributorResponse;
  }
}
