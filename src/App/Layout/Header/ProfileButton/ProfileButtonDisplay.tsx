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
      return <ProfileButton />;
    }
    return <GithubLink />;
  }

  return <div className="flex text-base text-white">{render()}</div>;
}
