import SkeletonEl from "src/components/New/Skeleton/Skeleton";
import GithubLink from "../GithubLink";
import ProfileButton from ".";

type ProfileButtonDisplayProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

function ProfileButtonDisplay({ isLoading, isAuthenticated }: ProfileButtonDisplayProps) {
  return (
    <div className="flex text-base text-white">
      {isLoading ? (
        <SkeletonEl variant="circular" color="grey" width={78} height={44} />
      ) : !isAuthenticated ? (
        <GithubLink />
      ) : (
        <ProfileButton />
      )}
    </div>
  );
}

export { ProfileButtonDisplay };
