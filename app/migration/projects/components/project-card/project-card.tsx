import { components } from "../../../../../src/__generated/api";
import { CardVariant } from "./project-card.types.ts";
import Translate from "../../../../../components/layout/translate/translate.tsx";
import Tag from "../../../../../components/ds/tag/tag.tsx";
import RecordCircleLine from "../../../../../src/icons/RecordCircleLine.tsx";
import React from "react";

type Props = {
  project: components["schemas"]["ProjectPageItemResponse"];
  className?: string;
  variant?: CardVariant;
};

export default function ProjectCard({ project, className, variant = "default" }: Props) {
  return (
    <>
      <div className=" text-orange-600">
        <Translate token="project.claim.panel.cancel" params={{ count: 222 }} />
      </div>
      <Tag size="large" borderColor="orange">
        <RecordCircleLine />
        blablabla
      </Tag>
    </>
  );
}
