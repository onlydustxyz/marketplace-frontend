import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import { useJwtRole } from "src/hooks/useJwtRole";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { useIntl } from "src/hooks/useIntl";

const Profile: React.FC = () => {
  const { user, hasuraToken } = useAuth();
  const { isLoggedIn } = useJwtRole(hasuraToken?.accessToken);
  const query = useHasuraQuery(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  const { T } = useIntl();

  return (
    <div className="flex flex-col mt-10 text-2xl">
      <h1>{T("profile.edit")}</h1>
      <br />
      <QueryWrapper query={query}>{query.data && <ProfileForm user={query.data.user} />}</QueryWrapper>
    </div>
  );
};

export const GET_PROFILE_QUERY = gql`
  query Profile($id: uuid!) {
    user(id: $id) {
      id
      email
      metadata
    }
  }
`;

export default Profile;
