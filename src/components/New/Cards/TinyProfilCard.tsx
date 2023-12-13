import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import SendPlane2Line from "src/icons/SendPlane2Line";
import { cn } from "src/utils/cn";
import { IMAGES } from "src/assets/img";

export enum ProfileCover {
  Blue = "BLUE",
  Cyan = "CYAN",
  Magenta = "MAGENTA",
  Yellow = "YELLOW",
}

type Props = {
  cover?: ProfileCover;
  avatarUrl: string;
  name: string;
  isRegistered?: boolean;
  onAction?: () => void;
  description?: string;
  location?: string;
  sinceDate?: string;
  children: React.ReactNode;
};

export default function TinyProfilCard({
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
  return (
    <div className="max-w-xs overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base shadow-heavy ">
      <div
        className={cn("h-14 w-full shrink-0 bg-cover p-4", {
          "bg-profile-blue": cover === ProfileCover.Blue,
          "bg-profile-cyan": cover === ProfileCover.Cyan,
          "bg-profile-magenta": cover === ProfileCover.Magenta,
          "bg-profile-yellow": cover === ProfileCover.Yellow,
        })}
      >
        <Button className="ml-auto" type={ButtonType.Secondary} size={ButtonSize.Xs}>
          <SendPlane2Line />
          {T("project.details.insights.newcomers.buttonLabel")}
        </Button>
      </div>
      <div className="-mt-6 p-4 pt-0">
        <img
          src={avatarUrl}
          className={cn("h-12 w-12 rounded-full", {
            "outline outline-4 outline-greyscale-50/12": true,
          })}
          data-testid="avatarUrl"
          loading="lazy"
          alt={T("profile.avatar")}
        />
        <div className="font-belwe text-base font-normal text-white">
          {name}
          {isRegistered ? (
            <img src={IMAGES.logo.original} className="ml-1.5 w-3.5" loading="lazy" alt="OnlyDust" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
