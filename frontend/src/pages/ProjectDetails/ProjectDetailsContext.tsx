import { createContext, PropsWithChildren, useReducer } from "react";

export enum PaymentAction__deprecated {
  List = "List",
  Send = "Send",
}

export enum ProjectDetailsTab__deprecated {
  Overview = "Overview",
  Payments = "Payments",
  Contributors = "Contributors",
}

interface ProjectDetailsState__deprecated {
  tab: ProjectDetailsTab__deprecated;
  paymentAction: PaymentAction__deprecated;
}

export enum ProjectDetailsActionType__deprecated {
  SelectTab = "SelectTab",
  SelectPaymentAction = "SelectPaymentAction",
}

export type ProjectDetailsAction__deprecated =
  | {
      type: ProjectDetailsActionType__deprecated.SelectTab;
      selectedTab: ProjectDetailsTab__deprecated;
    }
  | {
      type: ProjectDetailsActionType__deprecated.SelectPaymentAction;
      selectedPaymentAction: PaymentAction__deprecated;
    };

const projectDetailsInitialState = {
  tab: ProjectDetailsTab__deprecated.Overview,
  paymentAction: PaymentAction__deprecated.List,
};

export const ProjectDetailsContext__deprecated = createContext(projectDetailsInitialState);
export const ProjectDetailsDispatchContext__deprecated = createContext((action: ProjectDetailsAction__deprecated) => {
  return;
});

export function ProjectDetailsProvider__deprectaed({ children }: PropsWithChildren) {
  const [projectDetailsState, dispatch] = useReducer(projectDetailsReducer__deprecated, projectDetailsInitialState);

  return (
    <ProjectDetailsContext__deprecated.Provider value={projectDetailsState}>
      <ProjectDetailsDispatchContext__deprecated.Provider value={dispatch}>
        {children}
      </ProjectDetailsDispatchContext__deprecated.Provider>
    </ProjectDetailsContext__deprecated.Provider>
  );
}

export function projectDetailsReducer__deprecated(
  state: ProjectDetailsState__deprecated,
  action: ProjectDetailsAction__deprecated
) {
  switch (action.type) {
    case ProjectDetailsActionType__deprecated.SelectTab:
      return { ...state, tab: action.selectedTab };
    case ProjectDetailsActionType__deprecated.SelectPaymentAction:
      return { ...state, tab: ProjectDetailsTab__deprecated.Payments, paymentAction: action.selectedPaymentAction };
    default:
      throw Error("Unknown project details action.");
  }
}
