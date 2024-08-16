import { ButtonDefaultPort } from "components/atoms/button/button.types";

export namespace TFooter {
  export interface Props {
    backButtonProps?: ButtonDefaultPort<"a">;
    nextButtonProps: ButtonDefaultPort<"button">;
  }
}
