import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useCountProcessingCommandsQuery } from "src/__generated/graphql";

type Commands = {
  notify: (projectId: string) => void;
  subscribe: (projectId: string) => number;
};

const CommandsContext = createContext<Commands | null>(null);

export const CommandsProvider = ({ children }: PropsWithChildren) => {
  const [lastUpdates, setLastUpdates] = useState<{ [projectId: string]: number }>({});

  const notify = (projectId: string) =>
    setLastUpdates({
      ...lastUpdates,
      [projectId]: Date.now(),
    });

  const subscribe = (projectId: string) => lastUpdates[projectId];

  return <CommandsContext.Provider value={{ notify, subscribe }}>{children}</CommandsContext.Provider>;
};

export const useCommands = (): Commands => {
  const context = useContext(CommandsContext);
  if (!context) {
    throw new Error("useCommands must be used within an CommandsProvider");
  }
  return context;
};

export const useOnProjectChange = (projectId: string, callback: () => void) => {
  const { subscribe } = useCommands();
  const [polling, setPolling] = useState(false);
  const lastUpdate = subscribe(projectId);

  const { startPolling, stopPolling, refetch } = useCountProcessingCommandsQuery({
    variables: { projectId },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    skip: lastUpdate === undefined,

    onCompleted: ({ commandsAggregate }) => {
      switch (commandsAggregate.aggregate?.count) {
        case undefined:
          break;

        case 0: {
          setPolling(false);
          stopPolling();
          callback();
          break;
        }

        default: {
          setPolling(true);
          startPolling(500);
          break;
        }
      }
    },
  });

  useEffect(() => {
    if (lastUpdate) {
      refetch();
    }
  }, [lastUpdate]);

  return {
    polling,
  };
};
