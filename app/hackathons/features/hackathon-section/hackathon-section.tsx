import { Card } from "app/hackathons/components/card/card";
import { THackathonSection } from "app/hackathons/features/hackathon-section/hackathon-section.types";

import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function HackathonSection({ title, icon, items }: THackathonSection.Props) {
  if (!items.length) return null;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full flex-row items-center justify-start gap-2">
        <Icon {...icon} />
        <Typography variant="title-m">{title}</Typography>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-8">
        {items.map(item => (
          <Card key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
}
