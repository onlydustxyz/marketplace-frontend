import { ContributorResponse } from "src/types";
import { Avatar } from "../New/Avatar";
import { IMAGES } from "src/assets/img";

export function ContributionContributor({ contributor }: { contributor: ContributorResponse }) {
  const { avatarUrl, login, isRegistered, githubUserId } = contributor;

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => {
        // TODO
        alert("open profile for " + githubUserId);
      }}
    >
      <Avatar src={avatarUrl} alt={login} />
      <span className="text-spacePurple-300">{login}</span>
      {isRegistered ? <img src={IMAGES.logo.gradient} className="w-3.5" /> : null}
    </button>
  );
}
