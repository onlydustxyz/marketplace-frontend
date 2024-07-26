import { Toaster, toast } from "sonner";

import { Typo } from "components/atoms/typo";
import { Icon } from "components/layout/icon/icon";

import { ToastPort, ToastProps, ToasterPort } from "../../toaster.types";
import { ToasterSonnerVariants } from "./sonner.variants";

export function ToasterSonnerAdapter({ position = "bottom-left" }: ToasterPort) {
  return <Toaster position={position} />;
}

function handleToast({ children, variants, iconProps }: ToastProps) {
  const slots = ToasterSonnerVariants(variants);

  toast.custom(t => (
    <div className={slots.base()}>
      <div className={slots.messageWrapper()}>
        {iconProps ? <Icon {...iconProps} /> : null}

        <Typo size={"s"}>{children}</Typo>
      </div>

      <button type={"button"} onClick={() => toast.dismiss(t)} className={slots.closeButton()}>
        <Icon remixName={"ri-close-circle-line"} />
      </button>
    </div>
  ));
}

export const toastSonnerAdapter: ToastPort = {
  default: children => handleToast({ children, variants: { variant: "default" } }),
  error: children =>
    handleToast({ children, variants: { variant: "error" }, iconProps: { remixName: "ri-error-warning-line" } }),
};
