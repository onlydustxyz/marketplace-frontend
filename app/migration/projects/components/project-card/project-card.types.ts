import { components } from "../../../../../src/__generated/api";

export type ProjectCardProps = {
  project: components["schemas"]["ProjectPageItemResponse"];
  isFirstHiringProject?: boolean;
  isUserProjectLead?: boolean;
};
