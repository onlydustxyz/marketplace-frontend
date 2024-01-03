import Generator from "components/features/seo/image-metadata/commons/generator/generator.tsx";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata.tsx";
import { UsersActions } from "../../../../actions_v1/Users/users.actions.ts";
import { UserImageMetadata } from "../../../../components/features/seo/image-metadata/user/image-metadata.tsx";

export default async function Image(props: { params: { login: string } }) {
  try {
    const user = await UsersActions.queries.retrieveByGithubLogin(props.params.login);
    return Generator({
      children: <UserImageMetadata name={user.login} imageUrl={user.avatarUrl} description={user.bio} />,
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
