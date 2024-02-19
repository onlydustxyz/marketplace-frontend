import { useRouter } from "next/navigation";
import { useNatifBlock } from "providers/navigation-state/hooks/useNatifBlock";
import { NavigationStateContext } from "providers/navigation-state/navigation-state.context";
import { TNavigationStateContext } from "providers/navigation-state/navigation-state.type";
import { useContext, useMemo, useState } from "react";

export function NavigationStateProvider({ children }: TNavigationStateContext.Props) {
  const router = useRouter();
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);
  const [showBlockConfirmation, setShowBlockConfirmation] = useState(false);
  const [blockedUrl, setBlockedUrl] = useState<null | string>(null);
  useNatifBlock(shouldBlockNavigation);

  function onConfirm() {
    setShouldBlockNavigation(false);
    setShowBlockConfirmation(false);
    if (blockedUrl) {
      router.push(blockedUrl);
      setBlockedUrl(null);
    }
  }
  function onCancel() {
    setShouldBlockNavigation(false);
    setShowBlockConfirmation(false);
    setBlockedUrl(null);
  }
  function handleShowBlockConfirmation(value: boolean, url: string) {
    setShowBlockConfirmation(value);
    setBlockedUrl(url);
  }

  const Block = useMemo(
    () => ({
      should: shouldBlockNavigation,
      confirm: onConfirm,
      cancel: onCancel,
      state: {
        set: () => setShouldBlockNavigation(true),
        unSet: onCancel,
      },
      confirmation: {
        show: showBlockConfirmation,
        set: handleShowBlockConfirmation,
      },
    }),
    [shouldBlockNavigation, showBlockConfirmation]
  );

  const Values: TNavigationStateContext.Return = useMemo(
    () => ({
      block: Block,
    }),
    [Block]
  );

  return <NavigationStateContext.Provider value={Values}>{children}</NavigationStateContext.Provider>;
}

export const useNavigationState = () => {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error("useNavigationState must be used within a NavigationStateProvider");
  }
  return context;
};
