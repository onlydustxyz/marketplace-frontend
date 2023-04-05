import { useEffectOnce, useSessionStorage } from "react-use";
import { useLocation } from "react-router-dom";
import { useCallback, useRef } from "react";

export const RESTORE_SCROLL_POSITION_KEY = "RESTORE_SCROLL_POSITION";
const SCROLL_POSITION_KEY = "SCROLL_POSITION";

export default function useScrollRestoration() {
  const { state } = useLocation();

  const [scrollPosition, setScrollPosition] = useSessionStorage(SCROLL_POSITION_KEY, 0);

  const ref = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback(
    (node: HTMLDivElement) => {
      const handleScroll = ({ target }: Event) => setScrollPosition((target as HTMLDivElement).scrollTop);

      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }

      if (node) {
        node.addEventListener("scroll", handleScroll);
      }

      ref.current = node;
    },
    [setScrollPosition]
  );

  useEffectOnce(() => {
    if (state && state[RESTORE_SCROLL_POSITION_KEY]) {
      ref.current?.scrollTo({ top: scrollPosition });
    }
  });

  return [setRef];
}
