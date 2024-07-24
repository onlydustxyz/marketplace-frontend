import { HackathonStatus } from "core/domain/hackathon/models/hackathon.types";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { components } from "src/__generated/api";

import { mapHackathonStatusToTag } from "components/features/hackathons/hackathon-card/hackathon-card.utils";

interface Variants {}

interface ClassNames {
  base: string;
}

type Project = components["schemas"]["ProjectLinkResponse"];

export interface HackathonCardStatusProps {
  status?: HackathonStatus;
  subscriberCount?: number;
  openIssueCount?: number;
  issueCount?: number;
  adaptMapStatusToTag?: typeof mapHackathonStatusToTag;
}

export interface HackathonCardPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  upperTitle?: ReactNode;
  buttonLabel?: ReactNode;
  title: string;
  slug?: string;
  backgroundImage: string;
  location?: ReactNode;
  status?: HackathonStatus;
  projects?: Project[];
  hasLayer?: boolean;
  subscriberCount?: number;
  openIssueCount?: number;
  issueCount?: number;
  adaptMapStatusToTag?: typeof mapHackathonStatusToTag;
  dates: {
    startDate: string;
    endDate: string;
    startTime: string;
  };
}

export interface HackathonCardMiniPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  upperTitle?: ReactNode;
  title: string;
  slug?: string;
  backgroundImage: string;
  hasLayer?: boolean;
}
