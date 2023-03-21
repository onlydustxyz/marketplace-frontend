import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useEffectOnce, useSessionStorage } from "react-use";
import { useLocation } from "react-router-dom";

export const RESTORE_SCROLL_POSITION_KEY = "RESTORE_SCROLL_POSITION";
const SCROLL_POSITION_KEY = "SCROLL_POSITION";

export default function ScrollRestoration() {
  const { state } = useLocation();

  const [scrollPosition, setScrollPosition] = useSessionStorage(SCROLL_POSITION_KEY, { x: 0, y: 0 });

  useScrollPosition(({ currPos }) => setScrollPosition(currPos));

  useEffectOnce(() => {
    if (state && state[RESTORE_SCROLL_POSITION_KEY]) {
      window.scrollTo(scrollPosition.x, -scrollPosition.y);
    }
  });

  return null;
}
