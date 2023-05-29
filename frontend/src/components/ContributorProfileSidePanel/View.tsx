import { UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import MapPinLine from "src/icons/MapPinLine";
import { formatDateShort, formatDateTime } from "src/utils/date";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import GlobalLine from "src/icons/GlobalLine";

type Props = {
  profile: UserProfileFragment;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function View({ profile, ...rest }: Props) {
  const { T } = useIntl();

  return (
    <SidePanel {...rest} title={profile.login || ""}>
      {profile.location && (
        <div>
          <MapPinLine />
          {profile.location}
        </div>
      )}
      {profile.bio && <div>{profile.bio}</div>}
      {profile.website && (
        <div>
          <GlobalLine />
          {new URL(profile.website).hostname}
        </div>
      )}
      {profile.createdAt && (
        <div>
          <img id={`od-logo-${profile.login}`} src={onlyDustLogo} className="h-3.5 mt-px" />
          {T("profile.joinedAt", {
            joinedAt: formatDateShort(new Date(profile.createdAt)),
          })}
        </div>
      )}
      {!profile.createdAt && profile.firstContributedAt && (
        <div>
          {T("profile.firstContributedAt", {
            firstContributedAt: formatDateShort(new Date(profile.firstContributedAt)),
          })}
        </div>
      )}
      <div>{profile.twitter && <div>{profile.twitter}</div>}</div>
    </SidePanel>
  );
}
