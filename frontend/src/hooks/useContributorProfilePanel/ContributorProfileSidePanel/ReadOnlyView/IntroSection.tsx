import { OwnUserProfileDetailsFragment, UserProfileFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";
import MapPinLine from "src/icons/MapPinLine";
import { formatDateShort } from "src/utils/date";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import GlobalLine from "src/icons/GlobalLine";
import SocialLink from "./SocialLink";
import GithubLogo from "src/icons/GithubLogo";
import TwitterFill from "src/icons/TwitterFill";
import Telegram from "src/assets/icons/Telegram";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import MailLine from "src/icons/MailLine";
import DiscordFill from "src/icons/DiscordFill";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import PencilLine from "src/icons/PencilLine";
import ExternalLink from "src/components/ExternalLink";
import { parseWebsite } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/utils";
import MarkdownPreview from "src/components/MarkdownPreview";
import classNames from "classnames";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import CompletionBar from "src/components/CompletionBar";

type Props = {
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
  setEditMode: (value: boolean) => void;
  isOwn?: boolean;
  isPublic?: boolean;
};

export default function IntroSection({ isOwn, isPublic, profile, setEditMode }: Props) {
  const { T } = useIntl();

  const website = parseWebsite(profile.website);

  const email = profile.contacts.email?.public && profile.contacts.email?.contact;
  const telegram = profile.contacts.telegram?.public && profile.contacts.telegram?.contact;
  const twitter = profile.contacts.twitter?.public && profile.contacts.twitter?.contact;
  const discord = profile.contacts.discord?.public && profile.contacts.discord?.contact;
  const linkedin = profile.contacts.linkedin?.public && profile.contacts.linkedin?.contact;

  return (
    <div className="flex flex-col gap-6">
      {!isPublic && (
        <div className="self-end z-20 -mr-4 flex flex-row gap-2">
          {isOwn && (
            <Button size={ButtonSize.Sm} onClick={() => setEditMode(true)}>
              <PencilLine />
              {T("profile.editButton")}
            </Button>
          )}
          <Link
            to={generatePath(RoutePaths.PublicProfile, {
              userLogin: profile.login || "",
            })}
            target="_blank"
            data-testid="open-public-profile-btn"
          >
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              <ExternalLinkLine />
            </Button>
          </Link>
        </div>
      )}
      <div
        className={classNames("flex flex-col gap-2", {
          "mt-6": isPublic,
        })}
      >
        <div data-testid="login" className="font-belwe font-normal text-3xl text-white">
          {profile.login}
        </div>
        {profile.location && (
          <div
            data-testid="location"
            className="flex flex-row gap-2 items-center font-walsheim font-normal text-base text-greyscale-400"
          >
            <MapPinLine />
            {profile.location}
          </div>
        )}
      </div>

      {profile.completionScore !== undefined && profile.completionScore < 95 && (
        <div className="flex flex-col gap-2 w-full px-5 py-4 bg-completion-gradient rounded-2xl">
          <div className="font-medium font-walsheim text-sm text-greyscale-50">
            {T("profile.completion", { completion: profile.completionScore.toString() })}
          </div>
          <CompletionBar completionScore={profile.completionScore} />
        </div>
      )}

      {(profile.bio || profile.location || profile.createdAt) && (
        <div className="flex flex-col gap-4 font-walsheim font-normal">
          {profile.bio && (
            <MarkdownPreview testId="bio" className="text-lg leading-6">
              {profile.bio}
            </MarkdownPreview>
          )}
          {website && (
            <div data-testid="website" className="flex flex-row gap-1 items-center text-base text-greyscale-300">
              <GlobalLine />
              <ExternalLink url={website.url} text={website.hostname} />
            </div>
          )}

          {profile.createdAt ? (
            <div className="flex flex-row gap-1 items-center text-base text-greyscale-300">
              <img id={`od-logo-${profile.login}`} src={onlyDustLogo} className="h-3.5" />
              {T("profile.joinedAt", {
                joinedAt: formatDateShort(new Date(profile.createdAt)),
              })}
            </div>
          ) : (
            profile.contributionStatsAggregate.aggregate?.min?.minDate && (
              <div className="text-base text-greyscale-300">
                {T("profile.firstContributedAt", {
                  firstContributedAt: formatDateShort(
                    new Date(profile.contributionStatsAggregate.aggregate?.min?.minDate)
                  ),
                })}
              </div>
            )
          )}
        </div>
      )}
      <div className="flex flex-row gap-2 items-center">
        {profile.htmlUrl && (
          <SocialLink testId="github" link={profile.htmlUrl}>
            <GithubLogo />
          </SocialLink>
        )}
        {telegram && (
          <SocialLink testId="telegram" link={telegram}>
            <Telegram className="fill-greyscale-200" size={20} />
          </SocialLink>
        )}
        {twitter && (
          <SocialLink testId="twitter" link={twitter}>
            <TwitterFill />
          </SocialLink>
        )}
        {discord && (
          <SocialLink testId="discord" copyableValue={discord} copyableValueName={T("profile.discord")}>
            <DiscordFill />
          </SocialLink>
        )}
        {linkedin && (
          <SocialLink testId="linkedin" link={linkedin}>
            <LinkedinBoxFill />
          </SocialLink>
        )}
        {email && (
          <SocialLink testId="email" copyableValue={email} copyableValueName={T("profile.email")}>
            <MailLine />
          </SocialLink>
        )}
      </div>
    </div>
  );
}
