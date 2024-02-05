import { TProfileForm } from "../../form.types";

export namespace TFormBannerButton {
  type Cover = TProfileForm.Data["cover"];

  export interface Props {
    active: boolean;
    cover: Cover;
    onClick: (cover: Cover) => void;
  }
}
