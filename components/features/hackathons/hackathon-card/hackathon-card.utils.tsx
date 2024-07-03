import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import backgroundImage1 from "public/images/hackathons/cover-1.webp";
import backgroundImage2 from "public/images/hackathons/cover-2.webp";
import backgroundImage3 from "public/images/hackathons/cover-3.webp";
import backgroundImage4 from "public/images/hackathons/cover-4.webp";
import backgroundImage5 from "public/images/hackathons/cover-5.webp";
import backgroundImage6 from "public/images/hackathons/cover-6.webp";
import backgroundImage7 from "public/images/hackathons/cover-7.webp";
import backgroundImage8 from "public/images/hackathons/cover-8.webp";
import backgroundImage9 from "public/images/hackathons/cover-9.webp";
import backgroundImage10 from "public/images/hackathons/cover-10.webp";
import backgroundImage11 from "public/images/hackathons/cover-11.webp";
import backgroundImage12 from "public/images/hackathons/cover-12.webp";
import backgroundImage13 from "public/images/hackathons/cover-13.webp";
import backgroundImage14 from "public/images/hackathons/cover-14.webp";
import backgroundImage15 from "public/images/hackathons/cover-15.webp";
import backgroundImage16 from "public/images/hackathons/cover-16.webp";
import { ReactElement } from "react";

import { HackathonStatus } from "components/features/hackathons/hackathon-card/hackathon-card.types";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";

const backgroundSets = [
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5,
  backgroundImage6,
  backgroundImage7,
  backgroundImage8,
  backgroundImage9,
  backgroundImage10,
  backgroundImage11,
  backgroundImage12,
  backgroundImage13,
  backgroundImage14,
  backgroundImage15,
  backgroundImage16,
];

const settings = {
  backgroundNumbers: 16,
};
export function getHackathonBackground(index: number) {
  let backgroundIndex = index;

  if (backgroundIndex >= settings.backgroundNumbers) {
    backgroundIndex = backgroundIndex % settings.backgroundNumbers;
  }

  return backgroundSets[backgroundIndex];
}

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

export function formatHackathonDate(startDate?: Date): {
  formattedDate: string;
  formattedTime: string;
} {
  if (!startDate) {
    return {
      formattedDate: "",
      formattedTime: "",
    };
  }

  const timeZone = "Europe/Paris";

  const formattedDate = formatInTimeZone(startDate, timeZone, "MMMM dd, yyyy", { locale: enGB });
  const formattedTime = formatInTimeZone(startDate, timeZone, "hh:mm aa OOO", { locale: enGB });

  return {
    formattedDate,
    formattedTime,
  };
}
