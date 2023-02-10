import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Inputs } from "./types";
import { useCallback, useContext, useEffect } from "react";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useShowToaster } from "src/hooks/useToaster";
import { generatePath, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import {
  PaymentAction__deprecated,
  ProjectDetailsActionType__deprecated,
  ProjectDetailsDispatchContext__deprecated,
} from "../../ProjectDetailsContext";
import useFindGithubUser from "src/hooks/useIsGithubLoginValid";
import usePaymentRequests from "src/hooks/usePaymentRequests";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { FeatureFlags, isFeatureEnabled } from "src/utils/featureFlags";

export const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/\d+$/;

interface PaymentFormProps {
  projectId?: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = props => {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const location = useLocation();
  const navigate = useNavigate();
  const findUserQuery = useFindGithubUser();
  const outletContext = useOutletContext<{
    projectId: string;
    budget: {
      remainingAmount: number;
      initialAmount: number;
    };
  }>();

  const { projectId = outletContext.projectId, budget = outletContext.budget } = props;

  const defaultContributor = location.state?.recipientGithubLogin;

  const dispatch__deprecated = useContext(ProjectDetailsDispatchContext__deprecated);
  const sidebarUrlsEnabled = isFeatureEnabled(FeatureFlags.PROJECT_SIDEBAR_URLS);

  const { requestNewPayment } = usePaymentRequests({
    projectId,
    onNewPaymentRequested: () => {
      showToaster(T("payment.form.sent"));
      if (sidebarUrlsEnabled) {
        navigate(generatePath(RoutePaths.MyProjectDetails, { projectId }) + "/" + ProjectRoutePaths.Payments);
      } else {
        formMethods.resetField("linkToIssue");
        formMethods.resetField("contributorHandle");
        formMethods.resetField("contributor");
        dispatch__deprecated({
          type: ProjectDetailsActionType__deprecated.SelectPaymentAction,
          selectedPaymentAction: PaymentAction__deprecated.List,
        });
      }
    },
  });

  useEffect(() => {
    if (defaultContributor) {
      formMethods.setValue("contributorHandle", defaultContributor);
      findUserQuery.trigger(defaultContributor);
    }
  }, [defaultContributor]);

  const formMethods = useForm<Inputs>({
    defaultValues: {
      remainingBudget: budget.remainingAmount,
      contributorHandle: null,
    },
    mode: "all",
  });

  const { handleSubmit } = formMethods;

  const onValidSubmit: SubmitHandler<Inputs> = useCallback(async formData => {
    await requestNewPayment(mapFormDataToSchema(formData));
  }, []);

  const onWorkEstimationChange = useCallback(
    (amount: number) => {
      formMethods.setValue("amountToWire", amount);
    },
    [formMethods]
  );

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onValidSubmit)}
          className="flex flex-col gap-3 justify-between w-full"
        >
          <View budget={budget} projectId={projectId} onWorkEstimationChange={onWorkEstimationChange} />
        </form>
      </FormProvider>
    </>
  );
};

const mapFormDataToSchema = ({ linkToIssue, amountToWire, contributor }: Inputs) => {
  return {
    variables: {
      contributorId: contributor.id,
      amount: amountToWire,
      reason: {
        workItems: [linkToIssue],
      },
    },
  };
};

export default PaymentForm;
