"use client";

import { useMemo } from "react";

import { TLanguagesTag } from "app/ecosystems/[ecosystemSlug]/components/languages-tag/languages-tag.types";

import { viewportConfig } from "src/config";

import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

export function LanguagesTag({ languages = [] }: TLanguagesTag.Props) {
  const isSm = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.sm}px)`);
  const maxLanguages = isSm ? 3 : 2;
  const nbLanguages = useMemo(() => languages?.length ?? 0, [languages]);
  const isMaxLanguages = useMemo(() => nbLanguages > maxLanguages, [nbLanguages, maxLanguages]);
  const firstLanguages = useMemo(() => languages?.slice(0, maxLanguages) ?? [], [languages, maxLanguages]);

  if (!languages?.length) return null;

  return (
    <Tooltip
      content={
        <ul className={"flex flex-col gap-2 text-left"}>
          {languages.map(l => (
            <li key={l.id}>
              <Typography variant={"body-s"}>{l.name}</Typography>
            </li>
          ))}
        </ul>
      }
      enabled={isMaxLanguages && isSm}
    >
      <Tag>
        <Icon remixName={"ri-code-s-slash-line"} size={12} />
        <Typography variant={"body-xs"}>
          {firstLanguages?.map(l => l.name).join(", ")}
          {isMaxLanguages ? ` +${nbLanguages - maxLanguages}` : ""}
        </Typography>
      </Tag>
    </Tooltip>
  );
}
