import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "components/atoms/avatar";
import { ButtonPort } from "components/atoms/button/button.types";
import { PaperPort } from "components/atoms/paper";
import { TagPort } from "components/atoms/tag";

interface Variants {}

interface ClassNames {
  base: string;
}

interface Assignee {
  name: string;
  avatar: AvatarPort;
  onClick?: () => void;
  href?: string;
}

interface Repo {
  name: string;
  href?: string;
}

interface CreatedBy {
  name: string;
  avatar: AvatarPort;
}

interface Applicants {
  name: string;
  avatarUrl?: string;
}

interface Tokens {
  githubLink: ReactNode;
  createdBy: ReactNode;
  applicantsCount: ReactNode;
}

export type CardIssueStatus = "applied" | "open" | "assigned";

export interface CardIssuePort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  paperProps?: Partial<PaperPort<C>>;
  status?: CardIssueStatus;
  title: ReactNode;
  tokens: Tokens;
  tags?: Array<TagPort<"div">>;
  applyActionProps?: ButtonPort<"button">;
  viewActionProps?: ButtonPort<"button">;
  githubLink?: string;
  assignee?: Assignee;
  createdAt?: Date;
  createdBy?: CreatedBy;
  repo?: Repo;
  applicants?: Applicants[];
  applicantsTotalCount?: number;
}
