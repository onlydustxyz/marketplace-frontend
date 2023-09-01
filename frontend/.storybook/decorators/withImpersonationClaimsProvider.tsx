/* eslint-disable react/display-name */
import { StoryFn } from "@storybook/react";
import { ImpersonationClaimsContext, ImpersonationClaimsContextType } from "src/hooks/useImpersonationClaims";

export default function withImpersonationClaimsProvider(Story: StoryFn) {
  const mockedValue: ImpersonationClaimsContextType = {
    impersonationSet: undefined,
    setImpersonationSet: () => {
      return;
    },
    setCustomClaims: () => {
      return;
    },
    clearImpersonationSet: () => {
      return;
    },
    getImpersonationHeaders: () => [],
  };

  return (
    <ImpersonationClaimsContext.Provider value={mockedValue}>
      <Story />
    </ImpersonationClaimsContext.Provider>
  );
}
