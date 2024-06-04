import { useMemo } from "react";

import { Tag } from "components/ds/tag/tag";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { TLanguagesTag } from "components/features/languages-tag/languages-tag.types";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

const MAX_LANGUAGES = 2;

export function LanguagesTag({ languages = [] }: TLanguagesTag.Props) {
  const nbLanguages = useMemo(() => languages?.length ?? 0, [languages]);
  const isMaxLanguages = useMemo(() => nbLanguages > MAX_LANGUAGES, [nbLanguages, MAX_LANGUAGES]);
  const firstLanguages = useMemo(() => languages?.slice(0, MAX_LANGUAGES) ?? [], [languages, MAX_LANGUAGES]);

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
      enabled={isMaxLanguages}
    >
      <Tag>
        <Icon remixName={"ri-code-s-slash-line"} size={12} />
        <Typography variant={"body-xs"}>
          {firstLanguages?.map(l => l.name).join(", ")}
          {isMaxLanguages ? ` +${nbLanguages - MAX_LANGUAGES}` : ""}
        </Typography>
      </Tag>
    </Tooltip>
  );
}
