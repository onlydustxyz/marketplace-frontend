import { ForwardedRef, forwardRef } from "react";

import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { TextareaNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { TextareaPort } from "../textarea.types";

export const Textarea = forwardRef(function Textarea(props: TextareaPort, ref: ForwardedRef<HTMLTextAreaElement>) {
  return withComponentAdapter<TextareaPort, HTMLTextAreaElement>(TextareaNextUiAdapter)(props, ref);
});
