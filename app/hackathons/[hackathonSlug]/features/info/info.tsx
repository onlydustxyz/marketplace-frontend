import { InfoDropdown } from "app/hackathons/[hackathonSlug]/components/info-dropdown/info-dropdown";
import { TInfo } from "app/hackathons/[hackathonSlug]/features/info/info.types";
import { Register } from "app/hackathons/[hackathonSlug]/features/register/register";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
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

  return links.map(l => (
    <Tag
      key={l.url}
      as={BaseLink}
      htmlProps={{ href: l.url }}
      style={"outline"}
      color={"white"}
      size={"s"}
      icon={{ remixName: "ri-link" }}
    >
      {l.value ?? l.url}
    </Tag>
  ));
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

  return sponsors.map(s => (
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
  ));
}

export function Info({ hackathon }: TInfo.Props) {
  const isClosed = hackathon.getStatus() === "closed";

  return (
    <Paper
      size={"m"}
      container={"2"}
      classNames={{ base: "flex flex-col md:flex-row md:items-center justify-between gap-4" }}
    >
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

      <div className={"hidden md:block"}>
        <Register
          hackathonId={hackathon.id}
          hackathonSlug={hackathon.slug}
          hackathonTitle={hackathon.title}
          hackathonIndex={hackathon.index}
          buttonProps={{
            size: "xl",
            isDisabled: isClosed,
          }}
          tooltipProps={{
            content: <Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />,
            enabled: isClosed,
            placement: "left",
          }}
        />
      </div>

      <div className={"grid w-full gap-4 md:hidden"}>
        <Register
          hackathonId={hackathon.id}
          hackathonSlug={hackathon.slug}
          hackathonTitle={hackathon.title}
          hackathonIndex={hackathon.index}
          buttonProps={{
            size: "l",
            isDisabled: isClosed,
            classNames: { base: "w-full" },
          }}
          tooltipProps={{
            content: <Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />,
            enabled: isClosed,
          }}
        />

        {/*<Button variant={"secondary-light"} size={"l"} classNames={{ base: "w-full" }}>*/}
        {/*  <Translate token={"v2.pages.hackathons.details.info.seeEvents"} />*/}
        {/*</Button>*/}
      </div>
    </Paper>
  );
}
