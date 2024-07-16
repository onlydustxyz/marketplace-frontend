import { InfoDropdown } from "app/hackathons/[hackathonSlug]/components/info-dropdown/info-dropdown";
import { TInfo } from "app/hackathons/[hackathonSlug]/features/info/info.types";
import { Register } from "app/hackathons/[hackathonSlug]/features/register/register";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Tooltip } from "components/atoms/tooltip";
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
      as={BaseLink}
      htmlProps={{ href: s.url }}
      avatar={{ src: s.logoUrl, alt: s.name }}
      style={"outline"}
      color={"white"}
      size={"s"}
    >
      {s.name}
    </Tag>
  ));
}

export function Info({
  hackathonId,
  hackathonSlug,
  status,
  communityLinks,
  links,
  totalBudget,
  sponsors,
}: TInfo.Props) {
  const isClosed = status === "closed";

  return (
    <Paper
      size={"m"}
      container={"2"}
      classNames={{ base: "flex flex-col md:flex-row md:items-center justify-between gap-4" }}
    >
      <div className={"flex flex-wrap gap-3"}>
        {communityLinks.length ? (
          <div className={"grid gap-1"}>
            <Typo
              size={"xs"}
              color={"text-2"}
              translate={{ token: "v2.pages.hackathons.details.info.communityLinks" }}
            />
            <Links links={communityLinks} />
          </div>
        ) : null}

        {links.length ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.links" }} />
            <Links links={links} />
          </div>
        ) : null}

        {totalBudget ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.totalBudget" }} />
            <Tag style={"outline"} color={"white"} size={"s"} icon={{ remixName: "ri-coin-line" }}>
              {totalBudget}
            </Tag>
          </div>
        ) : null}

        {sponsors.length ? (
          <div className={"grid gap-1"}>
            <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.pages.hackathons.details.info.sponsors" }} />
            <Sponsors sponsors={sponsors} />
          </div>
        ) : null}
      </div>

      <div className={"hidden md:block"}>
        <Tooltip
          content={<Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />}
          placement={"left"}
          enabled={isClosed}
        >
          <Register
            hackathonId={hackathonId}
            hackathonSlug={hackathonSlug}
            button={<Button size={"xl"} isDisabled={isClosed} />}
          />
        </Tooltip>
      </div>

      <div className={"grid w-full gap-4 md:hidden"}>
        <Tooltip content={<Translate token={"v2.pages.hackathons.details.info.eventOverTooltip"} />} enabled={isClosed}>
          <Register
            hackathonId={hackathonId}
            hackathonSlug={hackathonSlug}
            button={<Button size={"l"} classNames={{ base: "w-full" }} isDisabled={isClosed} />}
          />
        </Tooltip>

        {/*<Button variant={"secondary-light"} size={"l"} classNames={{ base: "w-full" }}>*/}
        {/*  <Translate token={"v2.pages.hackathons.details.info.seeEvents"} />*/}
        {/*</Button>*/}
      </div>
    </Paper>
  );
}
