import { forwardRef } from "react";

import { TextareaPort } from "components/atoms/textarea/textarea.types";
import { PropsWithAdapter } from "components/types/props-with-adapter";

export const TextareaCore = forwardRef(function TextareaCore({ Adapter, ...props }: PropsWithAdapter<TextareaPort>) {
  return <Adapter {...props} />;
});
