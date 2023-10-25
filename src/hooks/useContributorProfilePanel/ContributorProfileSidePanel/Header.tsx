import { cn } from "src/utils/cn";
import { useRef, useState } from "react";
import { ProfileCover, UserProfileFragment } from "src/__generated/graphql";
import PencilLine from "src/icons/PencilLine";
import HeaderCoverButton from "./EditView/HeaderCoverButton";
import FileInput from "./EditView/FileInput";
import useUploadProfilePicture from "./useProfilePictureUpload";
import { useApolloClient } from "@apollo/client";
import Loader from "src/assets/icons/Loader";
import { useMediaQuery } from "usehooks-ts";
import { viewportConfig } from "src/config";
import { Profile } from "src/hooks/useProfile/useProfile";

type Props = {
  profile: Profile;
  editable?: boolean;
  onChange?: (value: ProfileCover) => void;
  rounded?: boolean;
};

export default function Header({ profile, editable, onChange, rounded }: Props) {
  const { avatarUrl, cover } = profile;
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadProfilePicture = useUploadProfilePicture();
  const { cache } = useApolloClient();

  const onProfilePictureChange = async (picture: File) => {
    setUploading(true);
    const url = await uploadProfilePicture(picture);
    setUploading(false);
    cache.modify({
      id: cache.identify(profile),
      fields: {
        avatarUrl: () => url,
      },
    });
  };

  const handleClick = (value: ProfileCover) => {
    onChange && onChange(value);
  };

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

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

      {avatarUrl && (
        <div
          className={cn("relative w-fit", { "cursor-pointer": editable })}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading && (
            <div className="absolute ml-8 flex h-24 w-24 items-center justify-center rounded-full bg-spaceBlue-800/50">
              <Loader className="animate-spin" />
            </div>
          )}
          <img
            src={avatarUrl}
            className={cn("-mt-12 ml-8 h-24 w-24 rounded-full", {
              "outline outline-4 outline-greyscale-50/12": isXl,
            })}
            data-testid="avatarUrl"
          />
          {editable && !uploading && (
            <>
              <PencilLine
                className="absolute bottom-0 right-0
            flex h-6 w-6 items-center rounded-full bg-greyscale-50
            p-1 text-base text-spaceBlue-900
            shadow-bottom-sm outline outline-2 outline-black"
              />
              {editable && <FileInput ref={fileInputRef} setFile={onProfilePictureChange} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
