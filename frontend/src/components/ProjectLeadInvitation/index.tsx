import { useAcceptProjectLeaderInvitationMutation, useGetProjectLeadInvitationsQuery } from "src/__generated/graphql";
import headerElementBackground from "src/assets/img/header-element-background.png";
import ImageCard, { BackgroundSize, Height } from "src/components/ImageCard";
import { viewportConfig } from "src/config";
import { useAuth } from "src/hooks/useAuth";
import CheckLine from "src/icons/CheckLine";
import { contextWithCacheHeaders } from "src/utils/headers";
import { useT } from "talkr";
import { useMediaQuery } from "usehooks-ts";
import Button from "src/components/Button";

interface ProjectLeadInvitationProps {
  projectId: string;
}

export default function ProjectLeadInvitation({ projectId }: ProjectLeadInvitationProps) {
  const { githubUserId } = useAuth();
  const { T } = useT();
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

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
        <div className="text-base md:text-lg">{T("projectLeadInvitation.prompt", { projectName })}</div>
        <Button onClick={() => acceptInvitation()} data-testid="accept-invite-button">
          <CheckLine className="text-xl font-normal text-black" />
          <div>{T(isMd ? "projectLeadInvitation.accept" : "projectLeadInvitation.acceptShort")}</div>
        </Button>
      </div>
    </ImageCard>
  ) : (
    <></>
  );
}
