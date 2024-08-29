import { bootstrap } from "core/bootstrap";

import { cn } from "src/utils/cn";

import { Badge } from "components/atoms/badge";
import { ButtonPort } from "components/atoms/button/button.types";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { CardEvent } from "components/molecules/cards/card-event";

import { TEventWrapper } from "./event-wrapper.types";

export function EventWrapper({ event, index }: TEventWrapper.Props) {
  const dateService = bootstrap.getDateHelperPort();
  const { subtitle, name, iconSlug } = event;
  const startDate = new Date(event.startDate);
  const isLive = event.isLive();
  const isToday = event.isToday();
  const isPast = event.isBeforeToday();
  const hours = event.getFormattedTzTime();
  const status = event.getStatus();
  const shouldHaveMultipleSteps = !isToday || index === 1;
  const primaryAction = event.links?.[0];
  const secondaryAction = event.links?.[1];
  const primaryActionProps: ButtonPort<typeof BaseLink> | undefined = primaryAction
    ? {
        as: BaseLink,
        htmlProps: { href: primaryAction.url },
        children: primaryAction.value,
      }
    : undefined;

  const secondaryActionProps: ButtonPort<typeof BaseLink> | undefined = secondaryAction
    ? {
        as: BaseLink,
        htmlProps: { href: secondaryAction.url },
        children: secondaryAction.value,
      }
    : undefined;

  return (
    <div
      className={cn("relative z-[1] flex flex-col gap-4", {
        "pt-4": index !== 1,
      })}
    >
      <div
        className={cn("absolute left-3 top-0 -z-[1] h-full border-l-1 border-dashed border-brand-2", {
          "top-0": index === 1,
          "border-solid": isToday,
          "opacity-50": isPast,
        })}
      />
      <div
        className={cn("z-[1] flex w-full flex-row items-center justify-between gap-1", {
          hidden: !shouldHaveMultipleSteps,
        })}
      >
        <div className="flex flex-row items-center gap-2">
          <Badge colors="brand-2" size="m" classNames={{ base: cn({ "opacity-50": isPast }) }}>
            {index}
          </Badge>
          <Typo
            variant="brand"
            size={"xs"}
            weight={"medium"}
            classNames={{ base: cn({ "text-text-2 font-regular": isPast }) }}
          >
            {dateService.formatInEuropeTimeZone(startDate, "MMMM d, yyyy")}
          </Typo>
        </div>
        <div className="flex flex-1 justify-end">
          <Typo variant="brand" size={"xxs"} color="text-2">
            {isToday ? (
              <Translate token={"v2.pages.hackathons.details.timeline.todayLabel"} />
            ) : (
              dateService.formatDistanceToNow(startDate)
            )}
          </Typo>
        </div>
      </div>
      <div className="pl-6">
        <CardEvent
          title={name}
          titleIconProps={{ remixName: iconSlug as RemixIconsName }}
          text={subtitle}
          status={status}
          tagProps={{
            children: isLive ? <Translate token={"v2.pages.hackathons.details.timeline.live"} /> : hours,
            icon: { remixName: isLive ? "ri-live-line" : "ri-timer-line" },
          }}
          primaryActionProps={primaryActionProps}
          secondaryActionProps={secondaryActionProps}
        />
      </div>
    </div>
  );
}
