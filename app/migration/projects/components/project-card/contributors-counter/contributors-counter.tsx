import { Tag } from "components/ds/tag/tag";
import { Translate } from "components/layout/translate/translate";
import User3Line from "../../../../../../src/icons/User3Line";
import { TContributorsCounter } from "./contributors-counter.types";

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
