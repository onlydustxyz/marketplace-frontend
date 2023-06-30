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

  const invitationId = data?.projectsByPk?.pendingInvitations.find(i => i.githubUserId === githubUserId)?.id;
  const projectName = data?.projectsByPk?.projectDetails?.name;

  const [acceptInvitation] = useAcceptProjectLeaderInvitationMutation({
    context: { graphqlErrorDisplay: "toaster" },
    variables: { invitationId },
    onCompleted: () => window.location.reload(),
  });

  return invitationId ? (
    <ImageCard backgroundImageUrl={headerElementBackground} backgroundSize={BackgroundSize.Cover} height={Height.Fit}>
      <div className="flex flex-row justify-between items-center font-medium px-6 py-5">
        <div className="text-lg">{T("projectLeadInvitation.prompt", { projectName })}</div>
        <div
          onClick={() => acceptInvitation()}
          className="flex flex-row justify-between items-center gap-2 w-fit rounded-xl bg-neutral-100 shadow-inner shadow-neutral-400 px-4 py-3 text-black hover:cursor-pointer"
          data-testid="accept-invite-button"
        >
          <CheckLine className="text-black font-normal text-xl" />
          <div>{T("projectLeadInvitation.accept")}</div>
        </div>
      </div>
    </ImageCard>
  ) : (
    <></>
  );
}
