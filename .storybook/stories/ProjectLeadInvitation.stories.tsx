import withAuthProvider from "../decorators/withAuthProvider";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation/ProjectLeadInvitation";
import { CalloutSizes } from "src/components/ProjectLeadInvitation/ProjectLeadInvitationView";
import withToasterProvider from "../decorators/withToasterProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSXElementConstructor } from "react";

const PROJECT_ID = "project-id";
const PROJECT_NAME = "project-name";
const PROJECT_SLUG = "project-slug";
const GITHUB_USER_ID = 123456;

const queryClient = new QueryClient();

export default {
  title: "ProjectLeadInvitation",
  component: ProjectLeadInvitation,
  decorators: [
    withAuthProvider({ githubUserId: GITHUB_USER_ID }),
    withToasterProvider,
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    (Story: JSXElementConstructor<any>) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const Default = {
  render: () => (
    <ProjectLeadInvitation projectId={PROJECT_ID} projectName={PROJECT_NAME} projectSlug={PROJECT_SLUG} isInvited />
  ),
};

export const Medium = {
  render: () => (
    <ProjectLeadInvitation
      projectId={PROJECT_ID}
      size={CalloutSizes.Medium}
      projectName={PROJECT_NAME}
      projectSlug={PROJECT_SLUG}
      isInvited
    />
  ),
};

export const Large = {
  render: () => (
    <ProjectLeadInvitation
      projectId={PROJECT_ID}
      size={CalloutSizes.Large}
      projectName={PROJECT_NAME}
      projectSlug={PROJECT_SLUG}
      isInvited
    />
  ),
};
