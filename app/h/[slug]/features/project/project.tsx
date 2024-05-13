"use client";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";

import { TProject } from "./project.types";

export function Project({ children, slug, className }: TProject.Props) {
  const [openProjectOverview] = useStackProjectOverview();

  const onClickProject = () => {
    openProjectOverview({ slug });
  };

  return (
    <button onClick={onClickProject} className={className}>
      {children}
    </button>
  );
}
