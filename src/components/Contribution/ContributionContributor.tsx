import { ContributorResponse } from "src/types";
import { Avatar } from "../New/Avatar";
import { IMAGES } from "src/assets/img";
import { useStackContributorProfile } from "src/App/Stacks/Stacks";

export function ContributionContributor({ contributor }: { contributor: ContributorResponse }) {
  const { avatarUrl, login, isRegistered, githubUserId } = contributor;

  const [openContributorProfile] = useStackContributorProfile();

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => {
        openContributorProfile({ githubUserId });
      }}
    >
      <Avatar src={avatarUrl} alt={login} />
      <span className="text-spacePurple-300">{login}</span>
      {isRegistered ? <img src={IMAGES.logo.gradient} className="w-3.5" /> : null}
    </button>
  );
}
