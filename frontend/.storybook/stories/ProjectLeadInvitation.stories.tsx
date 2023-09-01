import { MockedResponse } from "@apollo/client/testing";
import ProjectLeadInvitation from "src/components/ProjectLeadInvitation";
import { GetProjectLeadInvitationsDocument, GetProjectLeadInvitationsQueryResult } from "src/__generated/graphql";
import withAuthProvider from "../decorators/withAuthProvider";
import withMockedProvider from "../decorators/withMockedProvider";

const PROJECT_ID = "project-id";
const GITHUB_USER_ID = 123456;

const mocks: MockedResponse[] = [
  {
    request: {
      query: GetProjectLeadInvitationsDocument,
      variables: { projectId: PROJECT_ID },
    },
    result: {
      data: {
        projects: [
          {
            id: PROJECT_ID,
            name: "Kakarot",
            pendingInvitations: [{ id: "invitation-id", githubUserId: GITHUB_USER_ID }],
          },
        ],
      } as GetProjectLeadInvitationsQueryResult["data"],
    },
  },
];

export default {
  title: "ProjectLeadInvitation",
  component: ProjectLeadInvitation,
  decorators: [withAuthProvider({ githubUserId: GITHUB_USER_ID }), withMockedProvider(mocks)],
};

export const Default = {
  render: () => <ProjectLeadInvitation projectId={PROJECT_ID} />,
};
