import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { useAuth } from "src/hooks/useAuth";
import { HasuraUserRole } from "src/types";
import QueryWrapper from "src/components/QueryWrapper";
import ProfileForm from "./components/ProfileForm";
import { ProfileQuery, UserPayoutSettingsFragmentDoc } from "src/__generated/graphql";
import InfoMissingBanner from "src/components/InfoMissingBanner";
import { useIntl } from "src/hooks/useIntl";
import { useNavigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useState } from "react";
import usePayoutSettings from "src/hooks/usePayoutSettings";

const Profile: React.FC = () => {
  const { isLoggedIn, githubUserId, user } = useAuth();
  const { T } = useIntl();
  const getProfileQuery = useHasuraQuery<ProfileQuery>(GET_PROFILE_QUERY, HasuraUserRole.RegisteredUser, {
    skip: !isLoggedIn || !user?.id,
    variables: { userId: user?.id },
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { valid: payoutSettingsValid } = usePayoutSettings(githubUserId);

  const navigateBack = () => {
    navigate(location.state?.prev || RoutePaths.Projects);
  };

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="px-8 pt-16 h-full w-full">
        <div className="flex mb-6 items-center">
          <span className="text-3xl font-belwe font-normal w-full">{T("profile.edit")}</span>
          <div className="flex space-x-6">
            <div onClick={navigateBack}>
              <Button size={ButtonSize.Lg} type={ButtonType.Secondary} data-testid="profile-form-cancel-button">
                <div>{T("profile.form.cancel")}</div>
              </Button>
            </div>
            <div className="whitespace-nowrap">
              <Button
                size={ButtonSize.Lg}
                type={ButtonType.Primary}
                htmlType="submit"
                form="profile-form"
                data-testid="profile-form-submit-button"
                disabled={saveButtonDisabled}
              >
                <div>{T("profile.form.send")}</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {getProfileQuery.data && (
            <QueryWrapper query={getProfileQuery}>
              {!payoutSettingsValid && <InfoMissingBanner />}
              {getProfileQuery.data && (
                <ProfileForm user={getProfileQuery.data.userInfoByPk} setSaveButtonDisabled={setSaveButtonDisabled} />
              )}
            </QueryWrapper>
          )}
        </div>
      </div>
    </Background>
  );
};

export const GET_PROFILE_QUERY = gql`
  ${UserPayoutSettingsFragmentDoc}
  query Profile($userId: uuid!) {
    userInfoByPk(userId: $userId) {
      userId
      identity
      email
      location
      ...UserPayoutSettings
    }
  }
`;

export default Profile;
