import { cn } from "src/utils/cn";
import { ProfileCover } from "src/__generated/graphql";
import HeaderCoverButton from "./EditView/HeaderCoverButton";
import { UserProfile } from "src/api/Users/queries";
import { UseGetMyProfileInfoResponse } from "src/api/me/queries";
import ProfilePicture from "./ProfilePicture";
import { useState } from "react";

type Props = {
  profile: UserProfile | UseGetMyProfileInfoResponse;
  editable?: boolean;
  onChange?: (value: ProfileCover) => void;
  onChangeProfilePicture?: (value: string) => void;
  rounded?: boolean;
};

export default function Header({ profile, editable, onChange, onChangeProfilePicture, rounded }: Props) {
  const { avatarUrl, cover } = profile;

  const [coverColor, setCoverColor] = useState(cover);

  const handleClick = (value: ProfileCover) => {
    onChange?.(value);
    setCoverColor(value);
  };

  return (
    <div className="z-10">
      <div
        className={cn(
          "h-24 w-full shrink-0 bg-cover",
          {
            "bg-profile-blue": coverColor === ProfileCover.Blue,
            "bg-profile-cyan": coverColor === ProfileCover.Cyan,
            "bg-profile-magenta": coverColor === ProfileCover.Magenta,
            "bg-profile-yellow": coverColor === ProfileCover.Yellow,
          },
          {
            "rounded-xl": rounded,
          }
        )}
      >
        {editable && (
          <div className="flex h-full w-full items-center justify-center bg-black/30">
            <div className="flex h-12 w-fit flex-row items-center justify-center gap-3 rounded-full border border-greyscale-50/8 bg-white/8 px-5">
              <HeaderCoverButton
                active={coverColor === ProfileCover.Cyan}
                cover={ProfileCover.Cyan}
                onClick={handleClick}
              />
              <HeaderCoverButton
                active={coverColor === ProfileCover.Magenta}
                cover={ProfileCover.Magenta}
                onClick={handleClick}
              />
              <HeaderCoverButton
                active={cover === ProfileCover.Yellow}
                cover={ProfileCover.Yellow}
                onClick={handleClick}
              />
              <HeaderCoverButton
                active={coverColor === ProfileCover.Blue}
                cover={ProfileCover.Blue}
                onClick={handleClick}
              />
            </div>
          </div>
        )}
      </div>
      <ProfilePicture editable={editable} avatarUrl={avatarUrl} onChange={onChangeProfilePicture} />
    </div>
  );
}
