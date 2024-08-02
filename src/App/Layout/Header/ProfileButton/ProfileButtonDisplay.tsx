import { BurgerMenu } from "src/App/Layout/Header/ProfileButton/burger-menu";
import { NotificationButton } from "src/App/Layout/Header/notification-button/notification-button";
import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import ProfileButton from ".";
import GithubLink from "../GithubLink";

type ProfileButtonDisplayProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

export function ProfileButtonDisplay({ isLoading, isAuthenticated }: ProfileButtonDisplayProps) {
  function render() {
    if (isLoading) {
      return <SkeletonEl variant="circular" color="grey" width={78} height={44} />;
    }
    if (isAuthenticated) {
      return (
        <div className="flex flex-row items-center justify-end gap-2">
          {process.env.NEXT_PUBLIC_NOTIFICATIONS_ENABLED === "true" ? <NotificationButton /> : null}
          <ProfileButton />
          <BurgerMenu />
        </div>
      );
    }
    return (
      <div className="flex flex-row items-center justify-end gap-2">
        <GithubLink />
        <BurgerMenu />
      </div>
    );
  }

  return <div className="flex text-base text-white">{render()}</div>;
}
