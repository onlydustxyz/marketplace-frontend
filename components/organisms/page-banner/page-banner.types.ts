import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export interface PageBannerProps {
  message: string;
  cta?: {
    text: string;
    href: string;
    isExternal?: boolean;
    icon?: RemixIconsName;
  };
  onClose?: () => void;
}
