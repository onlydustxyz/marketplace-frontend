import { StaticImageData } from "next/image";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { components } from "src/__generated/api";

interface Variants {}

interface ClassNames {
  base: string;
}

export type HackathonStatus = "closed" | "open" | "live";
type Project = components["schemas"]["ProjectLinkResponse"];

export interface HackathonCardPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: string;
  slug?: string;
  backgroundImage: StaticImageData;
  location?: ReactNode;
  startDate?: Date;
  status?: HackathonStatus;
  projects?: Project[];
  hasLayer?: boolean;
}
