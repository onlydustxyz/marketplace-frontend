import { TDetailsAccordion } from "app/(v1)/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Tooltip } from "components/ds/tooltip/tooltip";

export function ProjectAvatar({ name, slug, logoUrl }: TDetailsAccordion.ProjectAvatarProps) {
  const [openProjectOverview] = useStackProjectOverview();

  function handleClick() {
    openProjectOverview({ slug });
  }

  return (
    <Tooltip key={name} content={name}>
      <div className={"child-project-avatar"} onClick={handleClick}>
        <Avatar
          src={logoUrl}
          alt={name}
          size="s"
          shape="square"
          className={cn(
            "pointer-events-none border-card-border-light transition-colors hover:border-card-border-heavy"
          )}
        />
      </div>
    </Tooltip>
  );
}
