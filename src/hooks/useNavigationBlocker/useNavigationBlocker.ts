import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext, Path, useBeforeUnload, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    when.current = shouldBlockNavigation;
  }, [shouldBlockNavigation]);

  useBeforeUnload(
    useCallback(
      (event: BeforeUnloadEvent) => {
        if (shouldBlockNavigation && !isBlocked.blocked) {
          event.preventDefault();
          event.returnValue = "";
        }
      },
      [shouldBlockNavigation, isBlocked]
    )
  );

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
  }, [navigator, isBlocked, when, shouldBlockNavigation]);

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

  return [isBlocked.blocked, unBlockNavigation];
}
