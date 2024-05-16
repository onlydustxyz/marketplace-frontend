import { usersApiClient } from "api-client/resources/users";
import { useMemo } from "react";

import { Popover } from "components/ds/modals/popover/popover";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { ProfileCardLoading } from "components/features/profile-card/profile-card.loading";
import { TProfileCard } from "components/features/profile-card/profile-card.types";

export function ProfileCardPopover({ children, githubId, isOpen, ...PopOverProps }: TProfileCard.ProfilePopoverProps) {
  const { data: userProfile } = usersApiClient.queries.useGetUserPublicProfileByGithubId(githubId, {
    enabled: isOpen,
  });

  const renderContent = useMemo(() => {
    if (userProfile) {
      return (
        <ProfileCard
          login={userProfile.login}
          avatarUrl={userProfile.avatarUrl}
          {...userProfile.statsSummary}
          isLoginClickable
        />
      );
    }
    return <ProfileCardLoading />;
  }, [userProfile]);

  return (
    <Popover
      placement={"bottom-start"}
      content={renderContent}
      isOpen={isOpen}
      classNames={{ content: "p-0" }}
      triggerScaleOnOpen={false}
      {...PopOverProps}
    >
      {children}
    </Popover>
  );
}
