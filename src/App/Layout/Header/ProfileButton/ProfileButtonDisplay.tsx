import { BurgerMenu } from "src/App/Layout/Header/ProfileButton/burger-menu";
import SkeletonEl from "src/components/New/Skeleton/Skeleton";

import { NotificationButton } from "components/features/notification-button/notification-button";

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
          <NotificationButton />
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
