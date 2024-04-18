import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import { Project } from "app/h/[slug]/clients/project/project";
import { CardItem } from "app/h/[slug]/components/card-item/card-item";

import { AvatarLabelled } from "components/ds/avatar/avatar.labelled";
import { Card } from "components/ds/card/card";
import { Link } from "components/ds/link/link";

import { TOverview } from "./overview.types";

export function Overview({ startDate, endDate, totalBudget, sponsors, links, projects }: TOverview.Props) {
  const start = formatInTimeZone(new Date(startDate), "Europe/Paris", "MMMM dd, yyyy hh:mm aa OOO", { locale: enGB });
  const end = formatInTimeZone(new Date(endDate), "Europe/Paris", "MMMM dd, yyyy hh:mm aa OOO", { locale: enGB });

  return (
    <div className="flex w-full flex-col items-start justify-start gap-6">
      <Card background={"base"} border={"light"} hasPadding={false}>
        <CardItem
          label={"v2.pages.hackathons.details.overview.startDate"}
          icon={{ remixName: "ri-calendar-event-line" }}
          show={!!start}
        >
          {start}
        </CardItem>
        <CardItem
          label={"v2.pages.hackathons.details.overview.endDate"}
          icon={{ remixName: "ri-calendar-event-line" }}
          show={!!end}
        >
          {end}
        </CardItem>
        <CardItem
          label={"v2.pages.hackathons.details.overview.totalBudget"}
          icon={{ remixName: "ri-hand-coin-line" }}
          show={!!totalBudget}
          border={!!sponsors.length}
        >
          {totalBudget}
        </CardItem>
        <CardItem
          label={"v2.pages.hackathons.details.overview.sponsors"}
          icon={{ remixName: "ri-server-line" }}
          show={!!sponsors.length}
          border={false}
        >
          <div className="flex flex-row flex-wrap gap-4">
            {sponsors.map(sponsor => (
              <div key={sponsor.id}>
                <AvatarLabelled avatarProps={{ shape: "circle", size: "s", src: sponsor.logoUrl }}>
                  {sponsor.name}
                </AvatarLabelled>
              </div>
            ))}
          </div>
        </CardItem>
      </Card>
      <Card background={"base"} border={"light"} hasPadding={false}>
        <CardItem
          label={"v2.pages.hackathons.details.overview.links"}
          icon={{ remixName: "ri-links-line" }}
          show={!!links.length}
        >
          {links.map(link => (
            <div key={link.value}>
              <Link href={link.url} size="m">
                {link.value}
              </Link>
            </div>
          ))}
        </CardItem>
        <CardItem
          label={"v2.pages.hackathons.details.overview.projects"}
          icon={{ remixName: "ri-folder-2-line" }}
          show={!!projects.length}
          border={false}
        >
          <div className="flex flex-row flex-wrap gap-4">
            {projects.map(project => (
              <div key={project.id}>
                <Project slug={project.slug}>
                  <AvatarLabelled
                    avatarProps={{ shape: "square", size: "s", src: project.logoUrl }}
                    labelProps={{ className: "hover:text-spacePurple-500 transition-all" }}
                  >
                    {project.name}
                  </AvatarLabelled>
                </Project>
              </div>
            ))}
          </div>
        </CardItem>
      </Card>
    </div>
  );
}
