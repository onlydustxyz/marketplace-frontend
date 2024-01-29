import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

export default function useUploadProfilePicture() {
  const { getImpersonateHeaders } = useImpersonation();

  const showToaster = useShowToaster();
  const { T } = useIntl();

  return async (picture: File) => {
    const idToken = await getImpersonateHeaders();
    try {
      const { picture_url } = await fetch(`${config.API_BASE_URL}/users/profile_picture`, {
        method: "POST",
        headers: {
          ...(idToken?.__raw ? { Authorization: `Bearer ${idToken?.__raw}` } : {}),
          ...getImpersonateHeaders(),
        },
        body: picture,
      }).then(data => data.json());

      return picture_url;
    } catch (error) {
      showToaster(T("profile.form.pictureUploadError"), { isError: true });
      console.error(error);
    }
  };
}
