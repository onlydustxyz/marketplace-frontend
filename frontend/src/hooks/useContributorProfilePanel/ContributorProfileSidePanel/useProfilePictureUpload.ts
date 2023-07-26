import config from "src/config";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { useTokenSet } from "src/hooks/useTokenSet";

export default function useUploadProfilePicture() {
  const { tokenSet } = useTokenSet();
  const authorizationHeader = tokenSet?.accessToken ? { Authorization: `Bearer ${tokenSet?.accessToken}` } : [];
  const { getImpersonationHeaders } = useImpersonationClaims();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  return async (picture: File) => {
    try {
      const { picture_url } = await fetch(`${config.API_BASE_URL}/users/profile_picture`, {
        method: "POST",
        headers: { ...authorizationHeader, ...getImpersonationHeaders() },
        body: picture,
      }).then(data => data.json());

      return picture_url;
    } catch (error) {
      showToaster(T("profile.form.pictureUploadError"), { isError: true });
      console.error(error);
    }
  };
}
