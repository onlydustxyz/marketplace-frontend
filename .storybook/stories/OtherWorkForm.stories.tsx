import OtherWorkForm from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/OtherWorkForm";
import withAuthProvider from "../decorators/withAuthProvider";
import withFormProvider from "../decorators/withFormProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withToasterProvider from "../decorators/withToasterProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";
const PROJECT_ID = "project-1";

export default {
  title: "OtherWorkForm",
  component: OtherWorkForm,
  decorators: [
    withToasterProvider,
    withAuthProvider({ userId: USER_ID }),
    withFormProvider(),
    withImpersonationClaimsProvider,
    withTokenSetProvider,
    withQueryClientProvider,
  ],
};

export const Default = {
  render: () => <OtherWorkForm projectId={PROJECT_ID} contributorHandle="ofux" addWorkItem={Function.prototype()} />,
};
