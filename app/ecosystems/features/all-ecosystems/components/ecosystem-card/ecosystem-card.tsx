import { AvatarGroup } from "components/ds/avatar-group/avatar-group";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TEcosystemCard } from "./ecosystem-card.types";

export function EcosystemCard({ bannerUrl, name, description, projectCount, projects, slug }: TEcosystemCard.Props) {
  return (
    <Card
      as={"a"}
      href={NEXT_ROUTER.ecosystems.details.root(slug)}
      background={"base"}
      className="flex flex-col overflow-hidden !rounded-[16px] !border-[3px] border border-card-border-medium !p-0"
    >
      <div className="relative h-[134px] w-full overflow-hidden">
        <img
          src={bannerUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading={"lazy"}
        />
      </div>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-b-[16px] p-4">
        <Typography variant={"title-s"}>{name}</Typography>
        <Typography variant={"body-m"} className="line-clamp-4 min-h-[80px] text-spaceBlue-100">
          {description || <Translate token={"v2.pages.ecosystems.list.allEcosystems.descriptionPlaceholder"} />}
        </Typography>
        <div className="flex w-full items-center justify-between gap-1 pt-5">
          <div className="flex items-center justify-start gap-1">
            <AvatarGroup
              avatars={projects.map(p => ({
                src: p.logoUrl,
                shape: "square",
                size: "s",
              }))}
            />
            <Typography
              variant={"body-m"}
              className="text-greyscale-50"
              translate={{
                token: "v2.pages.ecosystems.list.allEcosystems.projectCount",
                params: { count: projectCount },
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
