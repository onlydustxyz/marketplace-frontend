import { useAuth } from "src/hooks/useAuth";
import View from "src/components/Layout/Header/ProfileButton/View";

const ProfileButton = () => {
  const { user, logout } = useAuth();
  const { avatarUrl, displayName } = user ?? { avatarUrl: null, displayName: "My Account" };
  return <View {...{ avatarUrl, displayName, logout }} />;
};

export default ProfileButton;
