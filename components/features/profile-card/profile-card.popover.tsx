import { usersApiClient } from "api-client/resources/users";
import { useMemo, useState } from "react";

import { Popover } from "components/ds/modals/popover/popover";
import { ProfileCard } from "components/features/profile-card/profile-card";
import { ProfileCardLoading } from "components/features/profile-card/profile-card.loading";
import { TProfileCard } from "components/features/profile-card/profile-card.types";

export function ProfileCardPopover({ children, githubId }: TProfileCard.PopoverProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isPending } = usersApiClient.queries.useGetUserPublicProfileByGithubId({
    githubId,
    isEnabled: open,
  });

  const renderContent = useMemo(() => {
    if (isLoading || isPending) {
      return <ProfileCardLoading />;
    }
    if (data) {
      return <ProfileCard {...data} />;
    }
    return <div className="p-4">empty data</div>;
  }, [data]);

  return (
    <Popover
      placement={"bottom-start"}
      content={renderContent}
      onOpenChange={isOpen => setOpen(isOpen)}
      classNames={{ content: "p-0" }}
    >
      {children}
    </Popover>
  );
}
