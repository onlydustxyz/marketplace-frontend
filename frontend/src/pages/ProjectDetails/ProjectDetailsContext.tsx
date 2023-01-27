import { createContext, PropsWithChildren, useReducer } from "react";

export enum PaymentAction {
  List = "List",
  Send = "Send",
}

export enum ProjectDetailsTab {
  Overview = "Overview",
  Payments = "Payments",
  Contributors = "Contributors",
}

interface ProjectDetailsState {
  tab: ProjectDetailsTab;
  paymentAction: PaymentAction;
}

export enum ProjectDetailsActionType {
  SelectTab = "SelectTab",
  SelectPaymentAction = "SelectPaymentAction",
}

export type ProjectDetailsAction =
  | {
      type: ProjectDetailsActionType.SelectTab;
      selectedTab: ProjectDetailsTab;
    }
  | { type: ProjectDetailsActionType.SelectPaymentAction; selectedPaymentAction: PaymentAction };

const projectDetailsInitialState = { tab: ProjectDetailsTab.Overview, paymentAction: PaymentAction.List };

export const ProjectDetailsContext = createContext(projectDetailsInitialState);
export const ProjectDetailsDispatchContext = createContext((action: ProjectDetailsAction) => {
  return;
});

export function ProjectDetailsProvider({ children }: PropsWithChildren) {
  const [projectDetailsState, dispatch] = useReducer(projectDetailsReducer, projectDetailsInitialState);

  return (
    <ProjectDetailsContext.Provider value={projectDetailsState}>
      <ProjectDetailsDispatchContext.Provider value={dispatch}>{children}</ProjectDetailsDispatchContext.Provider>
    </ProjectDetailsContext.Provider>
  );
}

export function projectDetailsReducer(state: ProjectDetailsState, action: ProjectDetailsAction) {
  switch (action.type) {
    case ProjectDetailsActionType.SelectTab:
      return { ...state, tab: action.selectedTab };
    case ProjectDetailsActionType.SelectPaymentAction:
      return { ...state, tab: ProjectDetailsTab.Payments, paymentAction: action.selectedPaymentAction };
    default:
      throw Error("Unknown project details action.");
  }
}
