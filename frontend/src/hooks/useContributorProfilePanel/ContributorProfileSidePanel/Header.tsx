import classNames from "classnames";
import { useRef, useState } from "react";
import { ProfileCover, UserProfileFragment } from "src/__generated/graphql";
import PencilLine from "src/icons/PencilLine";
import HeaderCoverButton from "./EditView/HeaderCoverButton";
import FileInput from "./EditView/FileInput";
import useUploadProfilePicture from "./useProfilePictureUpload";
import { useApolloClient } from "@apollo/client";
import Loader from "src/assets/icons/Loader";

type Props = {
  profile: UserProfileFragment;
  editable?: boolean;
  onChange?: (value: ProfileCover) => void;
};

export default function Header({ profile, editable, onChange }: Props) {
  const { avatarUrl, cover } = profile;
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadProfilePicture = useUploadProfilePicture();
  const { cache } = useApolloClient();

  const onProfilePictureChange = async (picture: File) => {
    if (uploadProfilePicture) {
      setUploading(true);
      const url = await uploadProfilePicture(picture);
      setUploading(false);
      cache.modify({
        id: cache.identify(profile),
        fields: {
          avatarUrl: () => url,
        },
      });
    }
  };

  const handleClick = (value: ProfileCover) => {
    onChange && onChange(value);
  };

  return (
    <div className="z-10">
      <div
        className={classNames("h-24 w-full bg-cover shrink-0", {
          "bg-profile-blue": cover === ProfileCover.Blue,
          "bg-profile-cyan": cover === ProfileCover.Cyan,
          "bg-profile-magenta": cover === ProfileCover.Magenta,
          "bg-profile-yellow": cover === ProfileCover.Yellow,
        })}
      >
        {editable && (
          <div className="flex h-full w-full bg-black/30 items-center justify-center">
            <div className="flex flex-row gap-3 px-5 h-12 w-fit items-center justify-center rounded-full bg-white/8 border border-greyscale-50/8">
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
          className={classNames("relative w-fit", { "cursor-pointer": editable })}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading && (
            <div className="absolute flex items-center justify-center ml-8 rounded-full w-24 h-24 bg-spaceBlue-800/50">
              <Loader className="animate-spin" />
            </div>
          )}
          <img
            src={avatarUrl}
            className="rounded-full w-24 h-24 ml-8 -mt-12 outline outline-4 outline-greyscale-50/12"
          />
          {editable && !uploading && (
            <>
              <PencilLine
                className="absolute right-0 bottom-0
            w-6 h-6 p-1 rounded-full flex items-center
            text-base text-spaceBlue-900 bg-greyscale-50
            outline outline-2 outline-black shadow-bottom-sm"
              />
              {editable && <FileInput ref={fileInputRef} setFile={onProfilePictureChange} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}
