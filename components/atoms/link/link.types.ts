import { PropsWithChildren } from "react";

import { TBaseLink } from "components/layout/base-link/base-link.types";

type BaseLinkProps = Omit<TBaseLink.Props, "children" | "style">;

interface Variants {
  color: "default" | "inverse";
}

interface ClassNames {
  base: string;
}

export interface LinkPort extends BaseLinkProps, Partial<Variants>, PropsWithChildren {
  classNames?: Partial<ClassNames>;
}
