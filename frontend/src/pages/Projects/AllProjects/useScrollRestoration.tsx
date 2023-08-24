import { useSessionStorage } from "react-use";
import { useLocation } from "react-router-dom";
import { useCallback, useRef } from "react";

const SCROLL_POSITION_KEY = "SCROLL_POSITION";

export default function useScrollRestoration() {
  const { state } = useLocation();
  const ref = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback((node: HTMLDivElement) => {
    const handleScroll = ({ target }: Event) =>
      sessionStorage.setItem(SCROLL_POSITION_KEY, (target as HTMLDivElement).scrollTop.toString());

    if (ref.current) {
      ref.current.removeEventListener("scroll", handleScroll);
    }

    if (node) {
      node.addEventListener("scroll", handleScroll);
    }

    ref.current = node;
  }, []);

  const restoreScroll = useCallback(() => {
    if (!state?.skipScrollRestoration && ref.current?.scrollTo)
      ref.current.scrollTo({ top: parseInt(sessionStorage.getItem(SCROLL_POSITION_KEY) ?? "0") });
  }, [ref.current]);

  return {
    ref: setRef,
    restoreScroll,
  };
}
