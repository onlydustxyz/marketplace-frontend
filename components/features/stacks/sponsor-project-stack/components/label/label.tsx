import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={"font-walsheim text-sm font-medium uppercase text-greyscale-300"} {...props} />;
}
