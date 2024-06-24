import { ForwardedRef, forwardRef } from "react";

import { TextareaNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { TextareaCore } from "../textarea.core";
import { TextareaPort } from "../textarea.types";

export const Textarea = forwardRef(function Textarea(props: TextareaPort, ref: ForwardedRef<HTMLTextAreaElement>) {
  return <TextareaCore ref={ref} Adapter={TextareaNextUiAdapter} {...props} />;
});
