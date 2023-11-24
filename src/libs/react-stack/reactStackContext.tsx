import { createContext, useCallback, useEffect } from "react";
import { StackInterface, StacksInterface, UpdateStackInterface } from "./types/Stack";
import { useRefSubscription } from "../react-subscriber/useRefSubscription";
import { RefSubscriptionInterface } from "../react-subscriber/types/RefSubscription";

interface reactStackContextProps {
  children: React.ReactNode;
}

type IReactStackContext = {
  stacks: [];
  stackStore: RefSubscriptionInterface<StacksInterface>;
  stackMethods: {
    register: (stack: RefSubscriptionInterface<StackInterface>) => void;
    get: (name: string) => RefSubscriptionInterface<StackInterface> | RefSubscriptionInterface<StacksInterface> | null;
    update: (name: string, payload: UpdateStackInterface) => void;
  };
};

export const ReactStackContext = createContext<IReactStackContext>({
  stacks: [],
  stackStore: {} as RefSubscriptionInterface<StacksInterface>,
  stackMethods: {
    register: () => null,
    get: () => null,
    update: () => null,
  },
});

export default function ReactStackprovider({ children }: reactStackContextProps) {
  const [stacks, setStacks] = useRefSubscription<StacksInterface>({});

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

  const updateStack = useCallback(
    (name: string, payload: UpdateStackInterface) => {
      if (stacks.state[name]) {
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
