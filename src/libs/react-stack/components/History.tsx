import { useEffect } from "react";

import { useSubscribe } from "src/libs/react-subscriber";

import useStackContext from "../hooks/useStackContext";
import { BackDrop } from "../ui/BackDrop";

export const History = () => {
  const stackContext = useStackContext();
  const {
    stackMethods: { closeAll },
  } = stackContext;
  const history = useSubscribe(stackContext.history);

  useEffect(() => {
    const body = document.querySelector("body");
    if (history?.length) {
      if (body) {
        body.style.overflow = "hidden";
      }
    } else {
      if (body) {
        body.style.overflow = "";
      }
    }

    return () => {
      if (body) {
        body.style.overflow = "";
      }
    };
  }, [history]);

  return (
    <div data-stack-history-root="true" id="stack-panel-history-root">
      {history?.length ? <BackDrop onClick={closeAll} /> : null}
      {history?.map(h => (
        <div
          key={`history-item-${h.name}-${h.panelId}`}
          data-stack-history-item="true"
          id={`stack-panel-history-item-${h.name}-${h.panelId}`}
        />
      ))}
    </div>
  );
};
