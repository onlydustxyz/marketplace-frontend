import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { useIntl } from "src/hooks/useIntl";
import { GetProfileQuery } from "src/__generated/graphql";

const Profile: React.FC = () => {
  const { user, isLoggedIn } = useAuth();
  const query = useHasuraQuery<GetProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
    variables: { id: user?.id },
  });
  const { T } = useIntl();

  return (
    <div className="flex flex-col mt-10 text-2xl">
      <h1>{T("profile.edit")}</h1>
      <br />
      <QueryWrapper query={query}>
        {query.data && query.data.user && <ProfileForm user={query.data.user} />}
      </QueryWrapper>
    </div>
  );
};

export const GET_PROFILE_QUERY = gql`
  query GetProfile($id: uuid!) {
    user(id: $id) {
      id
      email
      metadata
    }
  }
`;

export default Profile;
