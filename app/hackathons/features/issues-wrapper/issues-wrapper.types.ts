import { ComponentType, PropsWithChildren } from "react";

import { THackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context.types";

export namespace TIssuesWrapper {
  export interface Props {
    projectId: string;
    hackathonId: string;
    queryParams: THackathonIssuesContext.QueryParams;
    Wrapper?: ComponentType<PropsWithChildren>;
  }
}
