import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import MeApi from "src/api/me";
import useMutationAlert from "src/api/useMutationAlert";
import Loader from "src/assets/icons/Loader";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import PencilLine from "src/icons/PencilLine";
import { cn } from "src/utils/cn";

type Props = {
  editable?: boolean;
  avatarUrl?: string;
  onChange?: (value: string) => void;
};

const ProfilePicture = ({ editable, avatarUrl, onChange }: Props) => {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState(avatarUrl);

  const {
    mutate: uploadProjectLogo,
    isPending: loadingUploadLogo,
    ...restUploadMutation
  } = MeApi.mutations.useUploadProfilePicture({
    options: {
      onSuccess: data => {
        setPreview(data.url);
        onChange?.(data.url);
      },
    },
  });

  useMutationAlert({
    mutation: restUploadMutation,
    error: {
      message: T("profile.form.error"),
    },
  });

  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.validity.valid && target.files) {
      const file = target.files?.[0];
      uploadProjectLogo(file);
      target.value = "";
    }
  };

  useEffect(() => {
    if (avatarUrl) {
      setPreview(avatarUrl);
    }
  }, [avatarUrl]);

  return (
    <div className={cn("relative w-fit", { "cursor-pointer": editable })} onClick={() => inputRef.current?.click()}>
      {loadingUploadLogo && (
        <div className="absolute ml-8 flex h-24 w-24 items-center justify-center rounded-full bg-spaceBlue-800/50">
          <Loader className="animate-spin" />
        </div>
      )}
      <img
        src={preview}
        className={cn("-mt-12 ml-8 h-24 w-24 rounded-full object-cover", {
          "outline outline-4 outline-greyscale-50/12": isXl,
        })}
        data-testid="avatarUrl"
        loading="lazy"
        alt={T("profile.avatar")}
      />
      {editable && !loadingUploadLogo ? (
        <>
          <PencilLine className="absolute bottom-0 right-0 flex h-6 w-6 items-center rounded-full bg-greyscale-50 p-1 text-base text-spaceBlue-900 shadow-bottom-sm outline outline-2 outline-black" />
          <input
            ref={inputRef}
            data-testid="avatarFileInput"
            type="file"
            style={{ display: "none" }}
            onChange={onInputChange}
            accept="image/*"
          />
        </>
      ) : null}
    </div>
  );
};

export default ProfilePicture;
