import { useSubscribe } from "src/libs/react-subscriber";
import UseStackContext from "../hooks/useStackContext";
import { BackDrop } from "../ui/BackDrop";

export const History = () => {
  const stackContext = UseStackContext();
  const {
    stackMethods: { closeAll },
  } = stackContext;
  const history = useSubscribe(stackContext.history);
  const portalContainer = document.querySelector("#stack-panel-root");

  if (!portalContainer) {
    return <></>;
  }

  return (
    <div data-stack-history-root="true" id="stack-panel-history-root">
      {history?.length && <BackDrop onClick={closeAll} />}
      {history?.map(h => (
        <div
          key={`history-item-${h.name}-${h.panelId}`}
          data-stack-history-item="true"
          id={`stack-panel-history-item-${h.name}-${h.panelId}`}
        />
      ))}
    </div>
  );
  //
};
