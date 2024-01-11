import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { UsersActions } from "actions/Users/users.actions";
import { UserImageMetadata } from "components/features/seo/image-metadata/user/image-metadata";

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
