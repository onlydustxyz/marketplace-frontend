import { TSectionHeader } from "app/ecosystems/components/section-header/section-header.types";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function SectionHeader({ iconProps, titleProps, subtitleProps, rightContent }: TSectionHeader.Props) {
  return (
    <header className={"flex items-center justify-between gap-4"}>
      <div className={"flex items-center gap-2 text-greyscale-50"}>
        <Icon size={24} {...iconProps} />

        <div className={"flex items-baseline gap-2"}>
          <Typography variant={"title-m"} {...titleProps} />

          {subtitleProps ? (
            <Typography variant={"body-l-bold"} className={"text-spaceBlue-200"} {...subtitleProps} />
          ) : null}
        </div>
      </div>

      {rightContent ? <div>{rightContent}</div> : null}
    </header>
  );
}
