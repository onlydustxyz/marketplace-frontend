import config from "src/config";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { useTokenSet } from "src/hooks/useTokenSet";

export default function useUploadProfilePicture() {
  const { tokenSet } = useTokenSet();
  const showToaster = useShowToaster();
  const { T } = useIntl();

  return tokenSet?.accessToken
    ? async (picture: File) => {
        console.log(picture);
        const body = new FormData();
        body.append("data", picture);

        try {
          const data = await fetch(`${config.API_BASE_URL}/users/profile_picture`, {
            method: "POST",
            headers: { Authorization: `Bearer ${tokenSet?.accessToken}` },
            body: picture,
          });

          console.log(data);
        } catch (error) {
          showToaster(T("profile.form.pictureUploadError"), { isError: true });
          console.error(error);
        }
      }
    : undefined;
}
