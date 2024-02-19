import { parseWebsite } from "src/App/Stacks/ContributorProfileSidePanel/utils";
import { components } from "src/__generated/api";
import { UserProfile } from "src/api/Users/queries";
import Telegram from "src/assets/icons/Telegram";
import { IMAGES } from "src/assets/img";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CompletionBar from "src/components/CompletionBar";
import MarkdownPreview from "src/components/MarkdownPreview";
import { useIntl } from "src/hooks/useIntl";
import ExternalLinkLine from "src/icons/ExternalLinkLine";
import GlobalLine from "src/icons/GlobalLine";
import MapPinLine from "src/icons/MapPinLine";
import PencilLine from "src/icons/PencilLine";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";
import { cn } from "src/utils/cn";
import { formatDateShort } from "src/utils/date";

import { Link } from "components/ds/link/link";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

import { NEXT_ROUTER } from "constants/router";

import SocialLink from "./SocialLink";

type Props = {
  profile: UserProfile;
  setEditMode: (value: boolean) => void;
  completionScore?: number | undefined;
  isOwn?: boolean;
  isPublic?: boolean;
};

type ContactChannelType = components["schemas"]["ContactInformation"]["channel"];

export default function IntroSection({ isOwn, isPublic, profile, setEditMode }: Props) {
  const { T } = useIntl();

  const website = parseWebsite(profile.website);

  const findContact = (key: ContactChannelType) => {
    const find = profile?.contacts?.find(contact => contact.channel === key);

    if (!find) {
      return undefined;
    }

    if (find.visibility === "private") {
      return undefined;
    }

    return find.contact;
  };

  const telegram = findContact("TELEGRAM");
  const twitter = findContact("TWITTER");
  const discord = findContact("DISCORD");
  const linkedin = findContact("LINKEDIN");
  const whatsapp = findContact("WHATSAPP");

  const completionScore = isOwn && profile ? calculateUserCompletionScore(profile) : undefined;

  return (
    <div className="flex flex-col gap-6">
      {!isPublic ? (
        <div className="z-20 -mr-4 flex flex-row gap-2 self-end">
          {isOwn && (
            <Button size={ButtonSize.Sm} onClick={() => setEditMode(true)}>
              <PencilLine />
              {T("profile.editButton")}
            </Button>
          )}
          <BaseLink href={NEXT_ROUTER.publicProfile.root(profile.login ?? "")} target="_blank">
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly>
              <ExternalLinkLine />
            </Button>
          </BaseLink>
        </div>
      ) : null}

      <div
        className={cn("flex flex-col gap-2", {
          "mt-6": !isOwn,
        })}
      >
        <div data-testid="login" className="font-belwe text-3xl font-normal text-white">
          {profile.login}
        </div>
        {profile.location && (
          <div
            data-testid="location"
            className="flex flex-row items-center gap-2 font-walsheim text-base font-normal text-greyscale-400"
          >
            <MapPinLine />
            {profile.location}
          </div>
        )}
      </div>

      {isOwn && completionScore && completionScore < 95 ? (
        <div className="flex w-full flex-col gap-2 rounded-2xl bg-completion-gradient px-5 py-4">
          <div className="font-walsheim text-sm font-medium text-greyscale-50">
            {T("profile.completion", { completion: completionScore })}
          </div>
          <CompletionBar completionScore={completionScore} />
        </div>
      ) : null}
      {(profile.bio || profile.location || profile.createdAt) && (
        <div className="flex flex-col gap-4 font-walsheim font-normal">
          {profile.bio && (
            <MarkdownPreview testId="bio" className="text-lg leading-6">
              {profile.bio}
            </MarkdownPreview>
          )}
          {website && (
            <div data-testid="website" className="flex flex-row items-center gap-1 text-base text-greyscale-300">
              <GlobalLine />
              <Link href={website.url} size="m">
                {website.hostname}
              </Link>
            </div>
          )}
          {profile.createdAt ? (
            <div className="flex flex-row items-center gap-2 text-base text-greyscale-300">
              <img
                id={`od-logo-${profile.login}`}
                src={IMAGES.logo.original}
                className="h-3.5"
                loading="lazy"
                alt="OnlyDust"
              />
              {T("profile.joinedAt", {
                joinedAt: formatDateShort(new Date(profile.createdAt)),
              })}
            </div>
          ) : (
            profile.firstContributedAt && (
              <div className="text-base text-greyscale-300">
                {T("profile.firstContributedAt", {
                  firstContributedAt: formatDateShort(new Date(profile.firstContributedAt)),
                })}
              </div>
            )
          )}
        </div>
      )}
      <div className="flex flex-row items-center gap-2">
        {profile.htmlUrl && (
          <SocialLink testId="github" link={profile.htmlUrl}>
            <Icon remixName="ri-github-fill" size={24} />
          </SocialLink>
        )}
        {telegram && (
          <SocialLink testId="telegram" link={telegram}>
            <Telegram size={24} />
          </SocialLink>
        )}
        {whatsapp && (
          <SocialLink testId="whatsapp" copyableValue={whatsapp} copyableValueName={T("profile.whatsapp")}>
            <Icon remixName="ri-whatsapp-fill" size={24} />
          </SocialLink>
        )}
        {twitter && (
          <SocialLink testId="twitter" link={twitter}>
            <Icon remixName="ri-twitter-x-fill" size={24} />
          </SocialLink>
        )}
        {discord && (
          <SocialLink testId="discord" copyableValue={discord} copyableValueName={T("profile.discord")}>
            <Icon remixName="ri-discord-fill" size={24} />
          </SocialLink>
        )}
        {linkedin && (
          <SocialLink testId="linkedin" link={linkedin}>
            <Icon remixName="ri-linkedin-box-fill" size={24} />
          </SocialLink>
        )}
      </div>
    </div>
  );
}
