import classNames from "classnames";
import { useRef } from "react";
import { Maybe, OwnUserProfileDocument, useUploadProfilePictireMutation } from "src/__generated/graphql";
import PencilLine from "src/icons/PencilLine";
import HeaderColorButton from "./EditView/HeaderColorButton";
import FileInput from "./EditView/FileInput";

export enum HeaderColor {
  Blue = "blue",
  Cyan = "cyan",
  Magenta = "magenta",
  Yellow = "yellow",
}

type Props = {
  color: HeaderColor;
  avatarUrl: Maybe<string>;
  editable?: boolean;
};

export default function Header({ color, avatarUrl, editable }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadProfilePicture] = useUploadProfilePictireMutation({
    context: { graphqlErrorDisplay: "toaster" },
    refetchQueries: [{ query: OwnUserProfileDocument }],
  });

  const handleChangeCoverClick = (color: HeaderColor) => {
    console.log(color);
  };

  return (
    <div className="z-10">
      <div
        className={classNames("h-24 w-full bg-cover shrink-0", {
          "bg-profile-blue": color === HeaderColor.Blue,
          "bg-profile-cyan": color === HeaderColor.Cyan,
          "bg-profile-magenta": color === HeaderColor.Magenta,
          "bg-profile-yellow": color === HeaderColor.Yellow,
        })}
      >
        {editable && (
          <div className="flex h-full w-full bg-black/30 items-center justify-center">
            <div className="flex flex-row gap-3 px-5 h-12 w-fit items-center justify-center rounded-full bg-white/8 border border-greyscale-50/8">
              <HeaderColorButton
                active={color === HeaderColor.Cyan}
                color={HeaderColor.Cyan}
                onClick={handleChangeCoverClick}
              />
              <HeaderColorButton
                active={color === HeaderColor.Magenta}
                color={HeaderColor.Magenta}
                onClick={handleChangeCoverClick}
              />
              <HeaderColorButton
                active={color === HeaderColor.Yellow}
                color={HeaderColor.Yellow}
                onClick={handleChangeCoverClick}
              />
              <HeaderColorButton
                active={color === HeaderColor.Blue}
                color={HeaderColor.Blue}
                onClick={handleChangeCoverClick}
              />
            </div>
          </div>
        )}
      </div>

      {avatarUrl && (
        <div
          className={classNames("relative w-fit", { "cursor-pointer": editable })}
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={avatarUrl}
            className="rounded-full w-24 h-24 ml-8 -mt-12 outline outline-4 outline-greyscale-50/12"
          />
          {editable && (
            <>
              <PencilLine
                className="absolute right-0 bottom-0
            w-6 h-6 p-1 rounded-full flex items-center
            text-base text-spaceBlue-900 bg-greyscale-50
            outline outline-2 outline-black shadow-bottom-sm"
              />
              {editable && (
                <FileInput
                  ref={fileInputRef}
                  setFile={profile_picture => uploadProfilePicture({ variables: { profile_picture } })}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
