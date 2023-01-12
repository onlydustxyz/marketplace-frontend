import { gql, QueryResult } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { ProfileQuery } from "src/__generated/graphql";
import InfoMissingBanner from "./components/InfoMissingBanner";

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const getProfileQuery = useHasuraQuery<ProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
    fetchPolicy: "network-only",
  });

  return (
    <div className="bg-space h-full">
      <div className="container mx-auto pt-16 h-full">
        <div className="flex flex-col gap-6">
          <div className="text-4xl font-alfreda mb-6">Edit profile</div>
          {getProfileQuery.data && (
            <QueryWrapper query={getProfileQuery}>
              {isPaymentInfoMissing(getProfileQuery) && <InfoMissingBanner />}
              {getProfileQuery.data && <ProfileForm user={getProfileQuery.data.userInfo[0]} />}
            </QueryWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

function isPaymentInfoMissing(queryResult: QueryResult<ProfileQuery>) {
  const payoutSettings = queryResult?.data?.userInfo?.[0]?.payoutSettings;
  return (
    queryResult?.data &&
    !(
      payoutSettings?.EthTransfer?.Address ||
      payoutSettings?.EthTransfer?.Name ||
      (payoutSettings?.WireTransfer?.IBAN && payoutSettings?.WireTransfer?.BIC)
    )
  );
}

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
