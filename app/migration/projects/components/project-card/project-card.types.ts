import { components } from "../../../../../src/__generated/api";
import React from "react";

export type ProjectCardProps = {
  project: components["schemas"]["ProjectPageItemResponse"];
  isFirstHiringProject?: boolean;
  githubAppBanner?: React.ReactNode;
  isUserProjectLead?: boolean;
};
