import { Tag } from "components/ds/tag/tag";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { TReposCounter } from "./repos-counter.types";

export function ReposCounter({ count }: TReposCounter.Props) {
  if (!count) {
    return null;
  }

  return (
    <Tag size="small">
      <Icon remixName="ri-git-repository-line" size={12} />

      <span className="hidden xl:inline">
        <Translate token="project.details.githubRepos.count" params={{ count }} />
      </span>
      <span className="xl:hidden">{count}</span>
    </Tag>
  );
}
