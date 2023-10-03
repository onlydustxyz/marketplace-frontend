import { GithubUser } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";

export function RewardDetail({ githubUserId }: { githubUserId: GithubUser["id"] }) {
  const { T } = useIntl();

  return (
    <div className="px-6 py-8">
      <div className="flex flex-col gap-8">
        <h5 className="font-belwe text-2xl">{T("rewards.panel.title")}</h5>
        <div>Content</div>
      </div>
    </div>
  );
}
