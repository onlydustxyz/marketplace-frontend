import { ToasterSonnerAdapter, toastSonnerAdapter } from "components/atoms/toaster/adapters/sonner/sonner.adapter";
import { ToasterPort } from "components/atoms/toaster/toaster.types";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

export function Toaster(props: ToasterPort) {
  return withComponentAdapter<ToasterPort>(ToasterSonnerAdapter)(props);
}

export { toastSonnerAdapter as toast };
