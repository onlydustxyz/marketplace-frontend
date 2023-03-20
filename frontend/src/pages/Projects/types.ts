import { ArrayElement } from "src/types";
import { GetProjectsQuery } from "src/__generated/graphql";

export type Project = ArrayElement<GetProjectsQuery["projects"]>;

export enum ProjectOwnershipType {
  All = "All",
  Mine = "Mine",
}

export interface ProjectFilter {
  ownershipType: ProjectOwnershipType;
  technologies: string[];
  sponsors: string[];
}

export enum ProjectFilterActionType {
  Clear = "clear",
  SelectOwnership = "ownership",
  SelectTechnologies = "technologies",
  SelectSponsors = "sponsors",
}

export type ProjectFilterAction =
  | {
      type: ProjectFilterActionType.Clear;
    }
  | {
      type: ProjectFilterActionType.SelectTechnologies | ProjectFilterActionType.SelectSponsors;
      values: string[];
    }
  | {
      type: ProjectFilterActionType.SelectOwnership;
      ownership: ProjectOwnershipType;
    };
