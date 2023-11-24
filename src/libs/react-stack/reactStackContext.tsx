import { createContext, useCallback, useEffect } from "react";
import { StackInterface, StacksInterface, UpdateStackInterface } from "./types/Stack";
import { useRefSubscription } from "../react-subscriber/useRefSubscription";
import { RefSubscriptionInterface } from "../react-subscriber/types/RefSubscription";

interface reactStackContextProps {
  children: React.ReactNode;
}

export type panelEvent = "open" | "close";

type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  history: RefSubscriptionInterface<string[]>;
  stackMethods: {
    register: (stack: RefSubscriptionInterface<StackInterface>) => void;
    get: (name: string) => RefSubscriptionInterface<StackInterface> | RefSubscriptionInterface<StacksInterface> | null;
    update: (name: string, payload: UpdateStackInterface, event: panelEvent) => void;
  };
};

export const ReactStackContext = createContext<IReactStackContext>({
  stacks: [],
  stackStore: {} as RefSubscriptionInterface<StacksInterface>,
  history: {} as RefSubscriptionInterface<string[]>,
  stackMethods: {
    register: () => null,
    get: () => null,
    update: () => null,
  },
});

export default function ReactStackprovider({ children }: reactStackContextProps) {
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});
  const [history, setHistory] = useRefSubscription<string[]>([]);

  const registerStack = useCallback(
    (stack: RefSubscriptionInterface<StackInterface>) => {
      if (!stacks.state[stack.state.name]) {
        setStacks(prev => ({
          ...prev,
          [stack.state.name]: stack,
        }));
      }
    },
    [stacks]
  );

  const updateHistory = useCallback(
    (name: string, payload: UpdateStackInterface) => {
      if (stacks.state[name]) {
        if (!payload.open) {
          setHistory(prev => {
            return prev.filter(item => item !== name);
          });
        } else {
          setHistory(prev => {
            return [...prev, name];
          });
        }
      }
    },
    [stacks]
  );

  const updateStack = useCallback(
    (name: string, payload: UpdateStackInterface, event: panelEvent) => {
      if (stacks.state[name]) {
        updateHistory(name, payload);
        stacks.state[name].setValue(prev => {
          return {
            ...prev,
            ...payload,
          };
        });
      }
    },
    [stacks]
  );

  const getStacks = useCallback(
    (name?: string) => {
      if (name) {
        return stacks.state[name] || null;
      }

      return stacks;
    },
    [stacks]
  );

  useEffect(() => {
    stacks.register();
  }, []);

  return (
    <ReactStackContext.Provider
      value={{
        stacks: [],
        stackStore: stacks,
        history,
        stackMethods: {
          register: registerStack,
          get: getStacks,
          update: updateStack,
        },
      }}
    >
      {children}
    </ReactStackContext.Provider>
  );
}
