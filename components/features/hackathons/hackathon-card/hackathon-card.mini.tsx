import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { HackathonCardMiniPort } from "components/features/hackathons/hackathon-card/hackathon-card.types";
import { HackathonCardVariants } from "components/features/hackathons/hackathon-card/hackathon-card.variants";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function HackathonCardMini<C extends ElementType = "article">({
  htmlProps,
  classNames,
  title,
  upperTitle = <Translate token="v2.features.hackathonCard.title" as="span" />,
  slug,
  backgroundImage,
  hasLayer,
}: HackathonCardMiniPort<C>) {
  const Component = slug ? "a" : "article";
  const slots = HackathonCardVariants();

  return (
    <Paper
      as={Component}
      htmlProps={{
        href: slug ? NEXT_ROUTER.hackathons.details.root(slug) : undefined,
        ...htmlProps,
      }}
      size="l"
      classNames={{
        base: cn(slots.base(), classNames?.base),
      }}
    >
      <img
        src={backgroundImage}
        alt={title}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      {hasLayer ? <div className="absolute inset-0 rounded-xl bg-black bg-opacity-60" /> : null}

      <div className="relative grid gap-1">
        <Typo size="l" weight="medium">
          {upperTitle}
        </Typo>

        <Typo variant="brand" size="2xl">
          {title}
        </Typo>
      </div>
    </Paper>
  );
}
