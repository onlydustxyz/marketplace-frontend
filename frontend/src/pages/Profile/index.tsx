import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { useIntl } from "src/hooks/useIntl";
import { ProfileQuery } from "src/__generated/graphql";

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const query = useHasuraQuery<ProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
  });
  const { T } = useIntl();

  return (
    <div className="flex flex-col mt-10 text-2xl">
      <h1>{T("profile.edit")}</h1>
      <br />
      <QueryWrapper query={query}>{query.data && <ProfileForm user={query.data.userInfo[0]} />}</QueryWrapper>
    </div>
  );
};

export const GET_PROFILE_QUERY = gql`
  query Profile {
    userInfo {
      userId
      identity
      email
      location
      payoutSettings
    }
  }
`;

export default Profile;
