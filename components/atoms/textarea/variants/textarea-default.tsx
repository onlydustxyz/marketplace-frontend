import { ForwardedRef, forwardRef } from "react";

import { TextareaCore } from "../textarea.core";
import { TTextareaProps } from "../textarea.types";

export const Textarea = forwardRef(function Textarea(props: TTextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return <TextareaCore ref={ref} {...props} />;
});
