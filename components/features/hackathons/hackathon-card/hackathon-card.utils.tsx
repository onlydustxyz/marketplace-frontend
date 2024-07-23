import { HackathonStatus } from "core/domain/hackathon/models/hackathon.types";
import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
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

export function formatHackathonDate(
  startDate?: Date,
  endDate?: Date
): {
  startDate: string;
  startTime: string;
  endDate: string | null;
} {
  if (!startDate) {
    return {
      startDate: "",
      startTime: "",
      endDate: null,
    };
  }

  const timeZone = "Europe/Paris";

  const formattedEndDate = endDate ? formatInTimeZone(endDate, timeZone, "MMMM dd, yyyy", { locale: enGB }) : null;
  const formattedStartDate = formatInTimeZone(startDate, timeZone, "MMMM dd, yyyy", { locale: enGB });
  const formattedStartTime = formatInTimeZone(startDate, timeZone, "hh:mm aa OOO", { locale: enGB });

  return {
    startDate: formattedStartDate,
    startTime: formattedStartTime,
    endDate: formattedEndDate,
  };
}
