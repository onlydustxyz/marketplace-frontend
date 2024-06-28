import { ForwardedRef, forwardRef } from "react";

import { InputNextUiAdapter } from "components/atoms/input/adapters/next-ui/next-ui.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { InputPort } from "../input.types";

export const Input = forwardRef(function Input(props: InputPort, ref: ForwardedRef<HTMLInputElement>) {
  return withComponentAdapter<InputPort, HTMLInputElement>(InputNextUiAdapter)(props, ref);
});
