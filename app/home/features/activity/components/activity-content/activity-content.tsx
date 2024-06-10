import { formatDistanceToNowStrict } from "date-fns";

import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Typography } from "components/layout/typography/typography";

import { TActivityContent } from "./activity-content.types";

export function ActivityContent({ mainAvatar, from, action, to, timestamp, details, badge }: TActivityContent.Props) {
  const date = formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true });

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <Avatar {...mainAvatar} size="xl" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-1 flex-row items-center gap-1">
          <Typography as="div" variant="body-m" className="overflow-hidden text-ellipsis whitespace-nowrap">
            {from}
          </Typography>
          <Typography as="div" variant="body-m" className="whitespace-nowrap text-spaceBlue-200">
            {action}
          </Typography>
          <Typography as="div" variant="body-m" className="whitespace-nowrap">
            {to}
          </Typography>
        </div>
        <div className="flex flex-1 flex-row items-center gap-1">
          {details ? (
            <>
              <Typography as="div" variant="body-m">
                {details}
              </Typography>
              <Typography as="div" variant="body-m">
                •
              </Typography>
            </>
          ) : null}
          <Typography as="div" variant="body-m" className="text-spaceBlue-200">
            {date}
          </Typography>
        </div>
      </div>
      <div
        className={cn(
          "flex min-h-[32px] min-w-[52px] flex-row items-center justify-center rounded-full border border-card-border-light bg-card-background-light"
        )}
      >
        {badge}
      </div>
    </div>
  );
}
