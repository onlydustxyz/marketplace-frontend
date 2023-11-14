import { useCallback, useContext, useEffect, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

// https://gist.github.com/MarksCode/64e438c82b0b2a1161e01c88ca0d0355
export interface Blockers {
  shouldBlockNavigation: boolean;
  shouldUnBlock: () => boolean;
}

export interface Blocker extends Blockers {
  onToggleBlock: (value: boolean) => void;
}

export function useBlockNativeNavigation({ shouldBlockNavigation }: Blockers) {
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlockNavigation) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [shouldBlockNavigation]);
}

function useBlockReactRouter({ shouldBlockNavigation, shouldUnBlock, onToggleBlock }: Blocker) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!shouldBlockNavigation) {
      return;
    }

    const push = navigator.push;
    navigator.push = (...args: Parameters<typeof push>) => {
      onToggleBlock(true);
      const result = shouldUnBlock();
      if (result !== false) {
        onToggleBlock(false);
        push(...args);
      }
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, shouldUnBlock, shouldBlockNavigation]);
}

export function useNavigationBlocker(props: Blockers) {
  const [isBlocked, setIsBlocked] = useState(false);

  const onToggleBlock = useCallback((value: boolean) => {
    setIsBlocked(value);
  }, []);

  useBlockReactRouter({ ...props, onToggleBlock });
  useBlockNativeNavigation({ ...props });

  return [isBlocked];
}
