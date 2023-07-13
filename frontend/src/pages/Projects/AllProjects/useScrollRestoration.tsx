import { useSessionStorage } from "react-use";
import { useLocation } from "react-router-dom";
import { useCallback, useRef } from "react";

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

  const restoreScroll = useCallback(() => {
    console.log("restoreScroll");
    if (!state?.skipScrollRestoration && ref.current?.scrollTo) ref.current.scrollTo({ top: scrollPosition });
  }, [ref.current]);

  return {
    ref: setRef,
    restoreScroll,
  };
}
