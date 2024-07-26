import { TInfo } from "app/hackathons/[hackathonSlug]/features/info/info.types";
import { OpenTimeline } from "app/hackathons/[hackathonSlug]/features/open-timeline/open-timeline";
import { Register } from "app/hackathons/[hackathonSlug]/features/register/register";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { InfoDropdown } from "components/features/info-dropdown/info-dropdown";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

function Links({ links }: { links: TInfo.Link[] }) {
  if (links.length > 2) {
    return (
      <InfoDropdown
        targetLabel={
          <Translate token={"v2.pages.hackathons.details.info.countLinks"} params={{ count: links.length }} />
        }
        dropdownTitleToken={"v2.pages.hackathons.details.info.links"}
        links={links}
      />
    );
  }

  return (
    <div className={"flex flex-wrap gap-2"}>
      {links.map(l => (
        <Tag
          key={l.url}
          as={BaseLink}
          htmlProps={{ href: l.url }}
          style={"outline"}
          color={"white"}
          size={"s"}
          icon={{ remixName: "ri-link" }}
          clickable={true}
        >
          {l.value ?? l.url}
        </Tag>
      ))}
    </div>
  );
}

function Sponsors({ sponsors }: { sponsors: TInfo.Sponsor[] }) {
  if (sponsors.length > 2) {
    return (
      <InfoDropdown
        targetLabel={
          <Translate token={"v2.pages.hackathons.details.info.countSponsors"} params={{ count: sponsors.length }} />
        }
        dropdownTitleToken={"v2.pages.hackathons.details.info.sponsors"}
        links={sponsors}
      />
    );
  }

  return (
    <div className={"flex flex-wrap gap-2"}>
      {sponsors.map(s => (
        <Tag
          key={s.id}
          as={s.url ? BaseLink : "span"}
          htmlProps={{ href: s.url ?? "" }}
          avatar={{ src: s.logoUrl, alt: s.name }}
          style={"outline"}
          color={"white"}
          size={"s"}
        >
          {s.name}
        </Tag>
      ))}
    </div>
  );
}

export function Info({ hackathon }: TInfo.Props) {
  const isClosed = hackathon.getStatus() === "closed";

  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "flex flex-col xl:flex-row justify-between gap-4" }}>
      <div className={"flex flex-wrap gap-3"}>
        {hackathon.communityLinks.length ? (
          <div className={"grid gap-1"}>
            <Typo
              size={"xs"}
              color={"text-2"}
              translate={{ token: "v2.pages.hackathons.details.info.communityLinks" }}
            />
            <Links links={hackathon.communityLinks} />
          </div>
        ) : null}

        {hackathon.links.length ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.links" }} />
            <Links links={hackathon.links} />
          </div>
        ) : null}

        {hackathon.totalBudget ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.totalBudget" }} />
            <Tag style={"outline"} color={"white"} size={"s"} icon={{ remixName: "ri-coin-line" }}>
              {hackathon.totalBudget}
            </Tag>
          </div>
        ) : null}

        {hackathon.sponsors.length ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.sponsors" }} />
            <Sponsors sponsors={hackathon.sponsors} />
          </div>
        ) : null}
      </div>

      <div className={"hidden xl:block"}>
        <Register
          hackathonId={hackathon.id}
          hackathonSlug={hackathon.slug}
          hackathonTitle={hackathon.title}
          hackathonBackgroundImage={hackathon.getBackgroundImage()}
          hackathonIsLive={hackathon.isLive()}
          buttonProps={{
            size: "xl",
            isDisabled: isClosed,
            classNames: { base: "whitespace-nowrap" },
          }}
          tooltipProps={{
            content: <Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />,
            enabled: isClosed,
            placement: "left",
          }}
        />
      </div>

      <div className={"flex w-full gap-4 xl:hidden"}>
        <Register
          hackathonId={hackathon.id}
          hackathonSlug={hackathon.slug}
          hackathonTitle={hackathon.title}
          hackathonBackgroundImage={hackathon.getBackgroundImage()}
          hackathonIsLive={hackathon.isLive()}
          buttonProps={{
            size: "l",
            isDisabled: isClosed,
            classNames: { base: "w-full whitespace-nowrap" },
          }}
          tooltipProps={{
            content: <Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />,
            enabled: isClosed,
            classNames: { wrapper: "w-full flex-1" },
          }}
        />

        <OpenTimeline eventsCount={hackathon.events?.length} />
      </div>
    </Paper>
  );
}
