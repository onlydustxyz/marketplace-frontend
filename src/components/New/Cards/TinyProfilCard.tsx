import React from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { cn } from "src/utils/cn";
import { IMAGES } from "src/assets/img";
import CalendarEventLine from "src/icons/CalendarEventLine";
import MapPinLine from "src/icons/MapPinLine";

export enum ProfileCover {
  Blue = "BLUE",
  Cyan = "CYAN",
  Magenta = "MAGENTA",
  Yellow = "YELLOW",
}

interface Props {
  cover?: ProfileCover;
  avatarUrl: string;
  name: string;
  isRegistered?: boolean;
  onAction?: () => void;
  description?: string;
  location?: string;
  sinceDate?: Date;
  children?: React.ReactNode;
}

function getCoverClass(cover: ProfileCover): string {
  const coverClasses: Record<ProfileCover, string> = {
    [ProfileCover.Blue]: "bg-profile-blue",
    [ProfileCover.Cyan]: "bg-profile-cyan",
    [ProfileCover.Magenta]: "bg-profile-magenta",
    [ProfileCover.Yellow]: "bg-profile-yellow",
  };
  return coverClasses[cover] || coverClasses[ProfileCover.Blue];
}

function OptionalSection({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  return condition ? <div>{children}</div> : null;
}

export default function TinyProfileCard({
  cover = ProfileCover.Blue,
  avatarUrl,
  name,
  isRegistered = false,
  onAction,
  description,
  location,
  sinceDate,
  children,
}: Props) {
  const { T } = useIntl();
  const coverClass = getCoverClass(cover);

  return (
    <div className="max-w-xs overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base shadow-heavy">
      <div className={cn("h-14 w-full shrink-0 bg-cover p-4", coverClass)}>
        <Button className="ml-auto" type={ButtonType.Secondary} size={ButtonSize.Xs} onClick={onAction}>
          <SendPlane2Line />
          {T("project.details.insights.newcomers.buttonLabel")}
        </Button>
      </div>
      <div className="-mt-6 p-4 pt-0">
        <img
          src={avatarUrl}
          className="h-12 w-12 rounded-full outline outline-4 outline-greyscale-50/12"
          data-testid="avatarUrl"
          loading="lazy"
          alt={T("profile.avatar")}
        />
        <div className="mt-1 flex flex-col gap-2">
          <div className="flex items-center font-belwe text-base font-normal text-white">
            {name}
            {isRegistered && <img src={IMAGES.logo.original} className="ml-1.5 w-3.5" loading="lazy" alt="OnlyDust" />}
          </div>
          {children}
          <OptionalSection condition={!!description}>
            <div className="text-sm font-normal text-greyscale-200">{description}</div>
          </OptionalSection>
          <OptionalSection condition={!!location || !!sinceDate}>
            <div className="flex flex-row justify-between gap-3">
              <OptionalSection condition={!!location}>
                <div className="flex flex-row items-center gap-2 font-walsheim text-xs font-normal text-spaceBlue-100">
                  <MapPinLine /> {location}
                </div>
              </OptionalSection>
              <OptionalSection condition={!!sinceDate}>
                <div className="flex flex-row items-center gap-2 font-walsheim text-xs font-normal text-spaceBlue-100">
                  <CalendarEventLine />
                  {/* TODO refactor using util or DateJs  */}
                  {T("project.details.insights.newcomers.dateSince", {
                    since: sinceDate?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }),
                  })}
                </div>
              </OptionalSection>
            </div>
          </OptionalSection>
        </div>
      </div>
    </div>
  );
}
