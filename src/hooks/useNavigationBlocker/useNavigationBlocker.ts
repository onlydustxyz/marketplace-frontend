import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext, Path, useBeforeUnload, useNavigate } from "react-router-dom";

export interface Blockers {
  shouldBlockNavigation: boolean;
}

/**
 * Custom React hook to handle navigation blocking.
 * @function
 * @param {Blockers} config - Configuration object for the hook.
 * @returns {Array} Tuple containing a boolean indicating whether navigation is blocked,
 * and a function to unblock navigation based on user interaction.
 */
export function useNavigationBlocker({
  shouldBlockNavigation,
}: Blockers): [boolean, (type: "confirm" | "cancel") => void] {
  // Access the navigator object from the React Router context
  const { navigator } = useContext(NavigationContext);

  // Use a ref to store the current value of shouldBlockNavigation
  const when = useRef(shouldBlockNavigation);

  // State to track the navigation blocking status and the target path
  const [isBlocked, setIsBlocked] = useState<{ blocked: boolean; to?: Partial<Path> }>({
    blocked: false,
  });

  const navigate = useNavigate();

  // Update the ref when shouldBlockNavigation changes
  useEffect(() => {
    when.current = shouldBlockNavigation;
  }, [shouldBlockNavigation]);

  // Handle browser beforeunload event to prevent navigation if needed
  useBeforeUnload(
    useCallback(
      (event: BeforeUnloadEvent) => {
        if (shouldBlockNavigation && !isBlocked.blocked) {
          event.preventDefault();
          event.returnValue = ""; // Standard for older browsers
        }
      },
      [shouldBlockNavigation, isBlocked]
    )
  );

  // Override the navigator's push method to handle navigation blocking
  useEffect(() => {
    if (!when.current) {
      // If shouldBlockNavigation is false, do nothing
      return;
    }

    // Store the original push method
    const push = navigator.push;

    // Override the push method
    navigator.push = (...args: Parameters<typeof push>) => {
      if (!when.current) {
        // If shouldBlockNavigation is false, call the original push method
        push(...args);
      } else {
        // If shouldBlockNavigation is true, set navigation as blocked
        setIsBlocked({ blocked: true, to: args[0] as Partial<Path> });
      }

      // Restore the original push method after execution
      navigator.push = push;
    };

    // Clean up the override when the component unmounts
    return () => {
      navigator.push = push;
    };
  }, [navigator, isBlocked, when, shouldBlockNavigation]);

  // Function to unblock navigation based on user confirmation
  const unBlockNavigation = useCallback(
    (type: "confirm" | "cancel") => {
      if (isBlocked.to) {
        // Copy the target path to avoid mutations
        const path = { ...isBlocked.to };

        // If the user confirms, update the ref and navigate to the target path
        if (type === "confirm") {
          when.current = false;
          navigate(path);
        }

        // Reset the navigation blocking status
        setIsBlocked({ blocked: false, to: undefined });
      }
    },
    [isBlocked]
  );

  // Return the navigation blocking status and the unBlockNavigation function
  return [isBlocked.blocked, unBlockNavigation];
}
