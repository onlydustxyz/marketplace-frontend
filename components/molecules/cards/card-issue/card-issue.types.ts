import { ApplicationStatus } from "core/domain/issue/models/issue.type";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { AvatarPort } from "../../../atoms/avatar";
import { ButtonPort } from "../../../atoms/button/button.types";
import { PaperPort } from "../../../atoms/paper";
import { TagPort } from "../../../atoms/tag";

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

export interface CardIssuePort<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  paperProps?: Partial<PaperPort<C>>;
  status?: ApplicationStatus;
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
  applicantsCount?: number;
}
