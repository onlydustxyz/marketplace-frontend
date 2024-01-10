import { Tag } from "@/components/ds/tag/tag.tsx";
import Translate from "@/components/layout/translate/translate.tsx";
import User3Line from "../../../../../../src/icons/User3Line.tsx";
import { TContributorsCounter } from "./contributors-counter.types.ts";

export function ContributorsCounter({ count }: TContributorsCounter.Props) {
  if (!count) {
    return null;
  }

  return (
    <Tag size="small">
      <User3Line />
      <Translate token="project.details.contributors.count" params={{ count }} />
    </Tag>
  );
}
