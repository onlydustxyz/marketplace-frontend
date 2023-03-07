import { useAuth } from "src/hooks/useAuth";
import View from "src/components/Layout/Header/ProfileButton/View";
import usePayoutSettings from "src/hooks/usePayoutSettings";

const ProfileButton = () => {
  const { user, logout, githubUserId } = useAuth();
  const { avatarUrl, displayName } = user ?? { avatarUrl: null, displayName: "My Account" };

  const { valid } = usePayoutSettings(githubUserId);

  return <View {...{ avatarUrl, displayName, logout, payoutSettingsInvalid: valid === false }} />;
};

export default ProfileButton;
