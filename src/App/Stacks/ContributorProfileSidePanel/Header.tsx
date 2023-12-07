import { cn } from "src/utils/cn";
import { ProfileCover } from "src/__generated/graphql";
import HeaderCoverButton from "./EditView/HeaderCoverButton";
import { UserProfile } from "src/api/Users/queries";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import ProfilePicture from "./ProfilePicture";

type Props = {
  profile: UserProfile | UseGetMyProfileInfoResponse;
  editable?: boolean;
  onChange?: (value: ProfileCover) => void;
  onChangeProfilePicture?: (value: string) => void;
  rounded?: boolean;
};

export default function Header({ profile, editable, onChange, onChangeProfilePicture, rounded }: Props) {
  const { avatarUrl, cover } = profile;

  const handleClick = (value: ProfileCover) => {
    onChange && onChange(value);
  };

  return (
    <div className="z-10">
      <div
        className={cn(
          "h-24 w-full shrink-0 bg-cover",
          {
            "bg-profile-blue": cover === ProfileCover.Blue,
            "bg-profile-cyan": cover === ProfileCover.Cyan,
            "bg-profile-magenta": cover === ProfileCover.Magenta,
            "bg-profile-yellow": cover === ProfileCover.Yellow,
          },
          {
            "rounded-xl": rounded,
          }
        )}
      >
        {editable && (
          <div className="flex h-full w-full items-center justify-center bg-black/30">
            <div className="flex h-12 w-fit flex-row items-center justify-center gap-3 rounded-full border border-greyscale-50/8 bg-white/8 px-5">
              <HeaderCoverButton active={cover === ProfileCover.Cyan} cover={ProfileCover.Cyan} onClick={handleClick} />
              <HeaderCoverButton
                active={cover === ProfileCover.Magenta}
                cover={ProfileCover.Magenta}
                onClick={handleClick}
              />
              <HeaderCoverButton
                active={cover === ProfileCover.Yellow}
                cover={ProfileCover.Yellow}
                onClick={handleClick}
              />
              <HeaderCoverButton active={cover === ProfileCover.Blue} cover={ProfileCover.Blue} onClick={handleClick} />
            </div>
          </div>
        )}
      </div>
      <ProfilePicture editable={editable} avatarUrl={avatarUrl} onChange={onChangeProfilePicture} />
    </div>
  );
}
