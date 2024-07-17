import { HackathonStatus } from "core/domain/hackathon/models/hackathon-model";
import { StaticImageData } from "next/image";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { components } from "src/__generated/api";

import {
  formatHackathonDate,
  mapHackathonStatusToTag,
} from "components/features/hackathons/hackathon-card/hackathon-card.utils";

interface Variants {}

interface ClassNames {
  base: string;
}

type Project = components["schemas"]["ProjectLinkResponse"];

export interface HackathonCardStatusProps {
  status?: HackathonStatus;
  applicantCount?: number;
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
  backgroundImage: StaticImageData;
  location?: ReactNode;
  startDate?: Date;
  endDate?: Date;
  status?: HackathonStatus;
  projects?: Project[];
  hasLayer?: boolean;
  applicantCount?: number;
  openIssueCount?: number;
  issueCount?: number;
  adaptMapStatusToTag?: typeof mapHackathonStatusToTag;
  adaptFormatDate?: typeof formatHackathonDate;
}

export interface HackathonCardMiniPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  upperTitle?: ReactNode;
  title: string;
  slug?: string;
  backgroundImage: StaticImageData;
  hasLayer?: boolean;
}
