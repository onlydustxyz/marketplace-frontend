import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { ProfileQuery } from "src/__generated/graphql";

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const query = useHasuraQuery<ProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
    fetchPolicy: "network-only",
  });

  return (
    <div className="container mx-auto pb-10 mt-10">
      <div className="text-3xl font-alfreda mb-6">Edit profile</div>
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
