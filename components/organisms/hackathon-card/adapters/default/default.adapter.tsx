import { formatInTimeZone } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";
import { ElementType, ReactElement } from "react";

import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Tag } from "components/atoms/tag";
import { TagIcon } from "components/atoms/tag/variants/tag-icon";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { AvatarGroup } from "components/molecules/avatar-group";

import { NEXT_ROUTER } from "constants/router";

import { HackathonCardPort } from "../../hackathon-card.types";
import { HackathonCardDefaultVariants } from "./default.variants";

export function HackathonCardDefaultAdapter<C extends ElementType = "div">({
  htmlProps,
  classNames,
  title,
  slug,
  backgroundImage,
  location,
  startDate,
  status,
  projects,
  hasLayer,
}: HackathonCardPort<C>) {
  const Component = slug ? "a" : "article";
  const slots = HackathonCardDefaultVariants();

  function getStatusTag(): {
    tagIcon?: RemixIconsName;
    tagText: string | ReactElement;
  } {
    switch (status) {
      case "closed":
        return {
          tagText: (
            <Translate token="v2.features.hackathonCard.status.closed" className="whitespace-nowrap" as="span" />
          ),
        };
      case "open":
        return {
          tagText: <Translate token="v2.features.hackathonCard.status.open" className="whitespace-nowrap" as="span" />,
        };
      case "live":
        return {
          tagIcon: "ri-fire-line",
          tagText: <Translate token="v2.features.hackathonCard.status.live" className="whitespace-nowrap" as="span" />,
        };
      default:
        return {
          tagText: "",
        };
    }
  }

  function getFormattedDate(): {
    formattedDate: string;
    formattedTime: string;
  } {
    if (!startDate) {
      return {
        formattedDate: "",
        formattedTime: "",
      };
    }

    const timeZone = "Europe/Paris";

    const formattedDate = formatInTimeZone(startDate, timeZone, "MMMM dd, yyyy", { locale: enGB });
    const formattedTime = formatInTimeZone(startDate, timeZone, "hh:mm aa OOO", { locale: enGB });

    return {
      formattedDate,
      formattedTime,
    };
  }

  const { tagIcon, tagText } = getStatusTag();
  const { formattedDate, formattedTime } = getFormattedDate();

  return (
    <Paper
      as={Component}
      htmlProps={{
        style: {
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPositionY: -10, // Required because of the border
        },
        href: slug ? NEXT_ROUTER.hackathons.details.root(slug) : undefined,
        ...htmlProps,
      }}
      size="l"
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    >
      {hasLayer ? <span className="absolute inset-0 h-full w-full rounded-xl bg-black bg-opacity-60" /> : null}

      <div className="relative flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Typo
              size="l"
              weight="medium"
              translate={{
                token: "v2.features.hackathonCard.title",
              }}
            />

            <Typo variant="brand" size="5xl">
              {title}
            </Typo>
          </div>

          {status ? (
            <>
              {tagIcon ? (
                <TagIcon color="blue" style="outline" icon={{ remixName: tagIcon }}>
                  {tagText}
                </TagIcon>
              ) : (
                <Tag color="blue" style="outline">
                  {tagText}
                </Tag>
              )}
            </>
          ) : null}
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            {location ? (
              <div className="flex items-center gap-2">
                <Paper
                  size="s"
                  as="div"
                  classNames={{
                    base: "inline-flex",
                  }}
                >
                  <Icon remixName="ri-map-pin-line" />
                </Paper>

                <Typo size="s" weight="medium">
                  {location}
                </Typo>
              </div>
            ) : null}

            {startDate ? (
              <div className="flex items-center gap-2">
                <Paper
                  size="s"
                  as="div"
                  classNames={{
                    base: "inline-flex",
                  }}
                >
                  <Icon remixName="ri-calendar-2-line" />
                </Paper>

                <div className="flex flex-col">
                  <Typo size="s" weight="medium">
                    {formattedDate}
                  </Typo>

                  <Typo size="xxs" color="text-2">
                    {formattedTime}
                  </Typo>
                </div>
              </div>
            ) : null}
          </div>

          {projects?.length ? (
            <AvatarGroup avatars={projects.map(({ logoUrl }) => ({ src: logoUrl }))} size="xl" maxAvatars={4} />
          ) : null}
        </div>

        {slug ? (
          <BaseLink href={NEXT_ROUTER.hackathons.details.root(slug)}>
            <Button
              variant={status === "closed" ? "secondary-light" : "primary"}
              size="l"
              endIcon={{
                remixName: "ri-arrow-right-line",
              }}
            >
              <Translate token="v2.features.hackathonCard.button" />
            </Button>
          </BaseLink>
        ) : null}
      </div>
    </Paper>
  );
}
