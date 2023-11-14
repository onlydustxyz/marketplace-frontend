import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext, Path, useNavigate } from "react-router-dom";

export interface Blockers {
  shouldBlockNavigation: boolean;
}

export function useNavigationBlocker({
  shouldBlockNavigation,
}: Blockers): [boolean, (type: "confirm" | "cancel") => void] {
  const { navigator } = useContext(NavigationContext);
  const when = useRef(shouldBlockNavigation);
  const [isBlocked, setIsBlocked] = useState<{ blocked: boolean; to?: Partial<Path> }>({
    blocked: false,
  });

  const navigate = useNavigate();

  /** Native navigation */
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlockNavigation && !isBlocked.blocked) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [shouldBlockNavigation, isBlocked]);

  /** Router navigation */
  useEffect(() => {
    if (!when.current) {
      return;
    }

    const push = navigator.push;
    navigator.push = (...args: Parameters<typeof push>) => {
      if (!when.current) {
        push(...args);
      } else {
        setIsBlocked({ blocked: true, to: args[0] as Partial<Path> });
      }
      navigator.push = push;
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, isBlocked, when]);

  const unBlockNavigation = useCallback(
    (type: "confirm" | "cancel") => {
      if (isBlocked.to) {
        const path = { ...isBlocked.to };
        if (type === "confirm") {
          when.current = false;
          navigate(path);
        }

        setIsBlocked({ blocked: false, to: undefined });
      }
    },
    [isBlocked]
  );

  useEffect(() => {
    when.current = shouldBlockNavigation;
  }, [shouldBlockNavigation]);

  return [isBlocked.blocked, unBlockNavigation];
}
