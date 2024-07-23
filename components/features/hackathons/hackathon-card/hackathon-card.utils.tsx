import { HackathonStatus } from "core/domain/hackathon/models/hackathon.types";
import { ReactElement } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

export function mapHackathonStatusToTag(status?: HackathonStatus): {
  tagIcon?: RemixIconsName;
  tagText: string | ReactElement;
} {
  switch (status) {
    case "closed":
      return {
        tagText: <Translate token="v2.features.hackathonCard.status.closed" className="whitespace-nowrap" as="span" />,
      };
    case "open":
      return {
        tagText: <Translate token="v2.features.hackathonCard.status.open" className="whitespace-nowrap" as="span" />,
      };
    case "live":
      return {
        tagIcon: "ri-fire-line",
        tagText: <Translate token="v2.features.hackathonCard.status.live" className="whitespace-nowrap" as="span" />,
      };
    default:
      return {
        tagText: "",
      };
  }
}
