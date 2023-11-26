import { CSSProperties, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import CloseLine from "src/icons/CloseLine";
import { cn } from "src/utils/cn";
import UseWatch from "../hooks/useWatchPanel";
import UseController from "../hooks/useController";
import UseStackContext from "../hooks/useStackContext";
import { StackInterface } from "../types/Stack";

type Props = {
  name: string;
  placement?: "right" | "bottom";
};

function StackPanel({ name, placement = "right", stack }: Props & { stack: StackInterface }) {
  const {
    stackMethods: { closeAll },
  } = UseStackContext();
  const { open, close } = UseController({ name });

  const transitionProps = {
    right: {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
    },
    bottom: {
      enterFrom: "translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "translate-y-full",
    },
  }[placement];

  const PanelBackStyle: CSSProperties = {
    transform: "translateX(-50px)",
    opacity: "0.8",
  };

  return (
    <Transition.Root show={stack?.open || false} as={Fragment}>
      <Dialog onClose={close} as="div" className={cn("relative isolate z-50")}>
        {/* {withBackdrop && (
            <div className="fixed bottom-0 z-10 h-screen w-screen bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        )} */}
        {/* <div className="fixed bottom-0 z-10 h-screen w-screen bg-black/40 backdrop-blur-sm" aria-hidden="true" /> */}
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          leave="transform transition ease-in-out duration-300"
          {...transitionProps}
        >
          <Dialog.Panel
            className={cn(
              {
                "inset-y-0 right-0 h-[calc(100dvh)] lg:w-[680px] lg:max-w-[80%]": placement === "right",
                "inset-x-0 bottom-0 max-h-[calc(100dvh)] overflow-y-auto rounded-t-2xl": placement === "bottom",
              },
              "fixed z-20 w-full transform bg-greyscale-900 shadow-heavy transition duration-300 ease-in-out"
              //   stack?.position === "back" && "-translate-x-6 duration-300 ease-in-out"
            )}
            style={stack?.position === "back" ? PanelBackStyle : undefined}
            // z-index needs to start at 50 to show above tooltips on the page behind
            // style={{ zIndex: 50 + panelIndex }}
          >
            {stack?.position === "front" && (
              <>
                <div
                  onClick={close}
                  data-stack-panel-backdrop="true"
                  //   className="absolute bottom-0 z-10 h-full w-full bg-black/40 backdrop-blur-sm"
                  className="absolute -left-[50px] bottom-0 z-10 h-full w-[50px] bg-green-500 opacity-10 "
                  //   className="absolute -left-[50px] bottom-0 z-10 h-full w-[50px] bg-black/40 backdrop-blur-sm"
                  aria-hidden="true"
                />
                <div
                  onClick={closeAll}
                  className="absolute bottom-0 right-full z-10 h-screen w-[calc(100vw_-_50px)] -translate-x-[50px] bg-red-500 opacity-10"
                  //   className="absolute bottom-0 right-full z-10 h-screen w-[calc(100vw_-_50px)] -translate-x-[50px]"
                  aria-hidden="true"
                />
              </>
            )}
            <div
              className={cn("h-full overflow-y-auto")}
              //   className={cn("h-full overflow-y-auto", {
              //     "-translate-x-0 duration-300 ease-in-out": stack?.position === "front",
              //     "-translate-x-6 duration-300 ease-in-out": stack?.position === "back",
              //   })}
            >
              <div className="absolute right-3.5 top-3.5 z-20 flex flex-row gap-2">
                {/* {action} */}
                <Button
                  size={ButtonSize.Sm}
                  type={ButtonType.Secondary}
                  iconOnly
                  onClick={close}
                  data-testid="close-add-work-item-panel-btn"
                >
                  <CloseLine />
                </Button>
              </div>
              {stack?.children}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

export default function StacksPanel({ name, placement = "right" }: Props) {
  const stack = UseWatch(name);
  const {
    stackMethods: { closeAll },
  } = UseStackContext();
  const { open, close } = UseController({ name });

  const transitionProps = {
    right: {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full",
    },
    bottom: {
      enterFrom: "translate-y-full",
      enterTo: "translate-y-0",
      leaveFrom: "translate-y-0",
      leaveTo: "translate-y-full",
    },
  }[placement];

  console.log("stack", name, stack);

  const PanelBackStyle: CSSProperties = {
    transform: "translateX(-50px)",
    opacity: "0.8",
  };

  return (
    <>
      {Object.keys(stack?.stacks || {})
        .reverse()
        .map((stackName, index) => (
          <>
            {stack?.stacks[stackName] && (
              <StackPanel name={name} key={stackName} stack={stack?.stacks[stackName].state} placement={placement} />
            )}
          </>
        ))}
    </>
  );
}
