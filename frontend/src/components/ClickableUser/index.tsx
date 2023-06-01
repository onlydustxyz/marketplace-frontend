import { Maybe } from "src/__generated/graphql";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useContributorProfilePanel } from "src/hooks/useContributorProfilePanel";
import ExternalLink from "src/components/ExternalLink";
import classNames from "classnames";

type Props = {
  name: string;
  githubUserId?: number;
  externalUrl?: Maybe<string>;
  avatarUrl?: Maybe<string>;
};

export default function ClickableUser({ name, githubUserId, avatarUrl, externalUrl }: Props) {
  const { open } = useContributorProfilePanel();

  return (
    <div
      className="flex flex-row gap-2 items-center text-sm font-normal"
      onClick={() => githubUserId && open(githubUserId)}
    >
      {avatarUrl && <RoundedImage alt={name} rounding={Rounding.Circle} size={ImageSize.Sm} src={avatarUrl} />}
      {externalUrl ? (
        <ExternalLink url={externalUrl} text={name} />
      ) : (
        <div
          className={classNames({
            "hover:underline truncate text-spacePurple-300 hover:cursor-pointer": githubUserId,
          })}
        >
          {name}
        </div>
      )}
    </div>
  );
}
