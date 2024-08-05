import { bootstrap } from "core/bootstrap";
import { Suspense, lazy } from "react";

import { TMainInfo } from "app/(v1)/hackathons/[hackathonSlug]/features/project-side-overview/components/main-infos/main-info.types";

import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { Typo } from "components/atoms/typo";
import { InfoDropdown } from "components/features/info-dropdown/info-dropdown";
import { SocialIconLink } from "components/features/social-icon-link/social-icon-link";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

const MarkdownPreview = lazy(() => import("src/components/MarkdownPreview"));

function Links({ links }: { links: TMainInfo.Link[] }) {
  if (links.length > 3) {
    return (
      <InfoDropdown
        targetLabel={
          <Translate token={"v2.features.projectSideOverview.countLinks"} params={{ count: links.length }} />
        }
        dropdownTitleToken={"v2.features.projectSideOverview.links"}
        links={links}
      />
    );
  }

  const urlHelperPort = bootstrap.getUrlHelperPort();

  return (
    <div className={"flex flex-wrap gap-2"}>
      {links.map(link => {
        const validUrl = link.url ? urlHelperPort.validateUrl(link.url) : "";
        return (
          <Tag
            key={link.url}
            as={BaseLink}
            htmlProps={{ href: validUrl }}
            style={"outline"}
            color={"white"}
            size={"s"}
            startContent={<SocialIconLink url={validUrl ?? ""} />}
          >
            {link.value ?? validUrl}
          </Tag>
        );
      })}
    </div>
  );
}

export function MainInfo({ project }: TMainInfo.Props) {
  return (
    <Paper size={"m"} container={"2"} classNames={{ base: "grid gap-3" }}>
      <Typo size={"s"} as="div">
        <Suspense>
          <MarkdownPreview className="text-sm text-text-2">{project.shortDescription}</MarkdownPreview>
        </Suspense>
      </Typo>

      {project.moreInfos.length ? (
        <div className={"grid gap-1"}>
          <Typo size={"xs"} color={"text-2"} translate={{ token: "v2.features.projectSideOverview.links" }} />
          <Links links={project.moreInfos} />
        </div>
      ) : null}
    </Paper>
  );
}
