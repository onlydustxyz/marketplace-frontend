import { ElementType } from "react";

import { useDrawerState } from "components/molecules/drawer/drawer.hooks";
import { PropsWithAdapter } from "components/types/props-with-adapter";

import { DrawerPort } from "./drawer.types";

export function DrawerCore<C extends ElementType = "div">({ Adapter, ...props }: PropsWithAdapter<DrawerPort<C>>) {
  const { isOpen, onClose, onOpen } = useDrawerState(props.defaultOpen);

  return (
    <>
      {props?.trigger ? <div onClick={onOpen}>{props.trigger}</div> : null}
      <Adapter {...props} onClose={onClose} isOpen={isOpen} />
    </>
  );
}
