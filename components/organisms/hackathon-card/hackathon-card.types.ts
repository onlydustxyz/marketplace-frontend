import { StaticImageData } from "next/image";
import { ComponentPropsWithoutRef, ElementType } from "react";

import { components } from "src/__generated/api";

interface Variants {}

interface ClassNames {
  base: string;
}

type Status = "closed" | "open" | "live";
type Project = components["schemas"]["ProjectLinkResponse"];

export interface HackathonCardPort<C extends ElementType> extends Partial<Variants> {
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  title: string;
  slug?: string;
  backgroundImage: StaticImageData;
  location?: string;
  startDate?: Date;
  status?: Status;
  projects?: Project[];
  hasLayer?: boolean;
}
