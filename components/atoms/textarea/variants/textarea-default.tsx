import { TextareaCore } from "../textarea.core";
import { TTextareaProps } from "../textarea.types";

export function Textarea({ ...props }: TTextareaProps) {
  return <TextareaCore {...props} />;
}
