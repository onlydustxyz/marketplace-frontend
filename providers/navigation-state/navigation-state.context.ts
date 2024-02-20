import { TNavigationStateContext } from "providers/navigation-state/navigation-state.type";
import { createContext } from "react";

export const NavigationStateContext = createContext<TNavigationStateContext.Return>({
  block: {
    state: [false, () => {}],
    confirm: () => {},
    cancel: () => {},
    confirmation: [false, () => {}],
  },
});
