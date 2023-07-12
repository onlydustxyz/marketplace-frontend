import { useAcceptProjectLeaderInvitationMutation, useGetProjectLeadInvitationsQuery } from "src/__generated/graphql";
import headerElementBackground from "src/assets/img/header-element-background.png";
import ImageCard, { BackgroundSize, Height } from "src/components/ImageCard";
import { useAuth } from "src/hooks/useAuth";
import CheckLine from "src/icons/CheckLine";
import { contextWithCacheHeaders } from "src/utils/headers";
import { useT } from "talkr";

interface ProjectLeadInvitationProps {
  projectId: string;
}

export default function ProjectLeadInvitation({ projectId }: ProjectLeadInvitationProps) {
  const { githubUserId } = useAuth();
  const { T } = useT();

  const { data } = useGetProjectLeadInvitationsQuery({
    variables: { projectId },
    skip: !githubUserId,
    ...contextWithCacheHeaders,
  });

  const invitationId = data?.projects[0]?.pendingInvitations.find(i => i.githubUserId === githubUserId)?.id;
  const projectName = data?.projects[0]?.name;

  const [acceptInvitation] = useAcceptProjectLeaderInvitationMutation({
    context: { graphqlErrorDisplay: "toaster" },
    variables: { invitationId },
    onCompleted: () => window.location.reload(),
  });

  return invitationId ? (
    <ImageCard backgroundImageUrl={headerElementBackground} backgroundSize={BackgroundSize.Cover} height={Height.Fit}>
      <div className="flex flex-row items-center justify-between px-6 py-5 font-medium">
        <div className="text-lg">{T("projectLeadInvitation.prompt", { projectName })}</div>
        <div
          onClick={() => acceptInvitation()}
          className="flex w-fit flex-row items-center justify-between gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-black shadow-inner shadow-neutral-400 hover:cursor-pointer"
          data-testid="accept-invite-button"
        >
          <CheckLine className="text-xl font-normal text-black" />
          <div>{T("projectLeadInvitation.accept")}</div>
        </div>
      </div>
    </ImageCard>
  ) : (
    <></>
  );
}
