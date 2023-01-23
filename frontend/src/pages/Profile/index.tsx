import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { ProfileQuery } from "src/__generated/graphql";
import InfoMissingBanner from "src/components/InfoMissingBanner";
import { useIntl } from "src/hooks/useIntl";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import isPayoutInfoMissing from "src/utils/isPayoutInfoMissing";
import Button, { ButtonSize, ButtonType } from "src/components/Button";

const Profile: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { T } = useIntl();
  const getProfileQuery = useHasuraQuery<ProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn,
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = () => {
    navigate(location.state?.prev || RoutePaths.Projects);
  };

  return (
    <div className="bg-space h-full">
      <div className="px-8 pt-16 h-full w-full">
        <div className="flex mb-6 items-center">
          <span className="text-3xl font-belwe font-normal w-full">{T("profile.edit")}</span>
          <div className="flex space-x-6">
            <Button size={ButtonSize.Large} type={ButtonType.Secondary}>
              <button type="button" data-testid="profile-form-cancel-button" onClick={navigateBack}>
                <div>{T("profile.form.cancel")}</div>
              </button>
            </Button>
            <Button size={ButtonSize.Large} type={ButtonType.Primary}>
              <button
                type="submit"
                form="profile-form"
                data-testid="profile-form-submit-button"
                className="whitespace-nowrap"
              >
                <div>{T("profile.form.send")}</div>
              </button>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {getProfileQuery.data && (
            <QueryWrapper query={getProfileQuery}>
              {isPayoutInfoMissing(getProfileQuery) && <InfoMissingBanner />}
              {getProfileQuery.data && <ProfileForm user={getProfileQuery.data.userInfo[0]} />}
            </QueryWrapper>
          )}
        </div>
      </div>
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
