import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { NEXT_ROUTER } from "constants/router";

import { HackathonCardPort } from "../../hackathon-card.types";
import { HackathonCardDefaultVariants } from "./default.variants";

export function HackathonCardDefaultAdapter<C extends ElementType = "div">({
  as,
  htmlProps,
  classNames,
  title,
  slug,
  backgroundUrl,
  location,
  startDate,
  status,
  projects,
}: HackathonCardPort<C>) {
  const Component = as || "article";
  const slots = HackathonCardDefaultVariants();

  return (
    <Paper
      as={Component}
      htmlProps={htmlProps}
      size="l"
      border="container-stroke-separator"
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Typo variant="default" size="l" weight="medium" color="text-1">
              Hackathon
            </Typo>

            <Typo variant="brand" size="5xl" color="text-1">
              {title}
            </Typo>
          </div>

          {status ? (
            <TagIcon
              color="blue"
              style="outline"
              size="m"
              shape="round"
              icon={{ remixName: "ri-fire-line", className: "text-text-1" }}
            >
              {status}
            </TagIcon>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            {location ? (
              <div className="flex items-center gap-2">
                <Paper size="s" border="container-stroke-separator">
                  <Icon remixName="ri-map-pin-line" className="text-text-1" />
                </Paper>

                <Typo variant="default" size="s" weight="medium" color="text-1">
                  {location}
                </Typo>
              </div>
            ) : null}

            {startDate ? (
              <div className="flex items-center gap-2">
                <Paper size="s" border="container-stroke-separator">
                  <Icon remixName="ri-calendar-2-line" className="text-text-1" />
                </Paper>

                <div className="flex flex-col">
                  <Typo variant="default" size="s" weight="medium" color="text-1">
                    {location}
                  </Typo>

                  <Typo variant="default" size="xxs" weight="regular" color="text-2">
                    {location}
                  </Typo>
                </div>
              </div>
            ) : null}
          </div>

          <div>Projects</div>
        </div>

        <BaseLink href={NEXT_ROUTER.hackathons.details.root(slug)}>
          <Button
            variant={status === "closed" ? "secondary-light" : "primary"}
            size="l"
            endIcon={{
              remixName: "ri-arrow-right-line",
              className: "text-text-1",
            }}
          >
            Explore
          </Button>
        </BaseLink>
      </div>
    </Paper>
  );
}
