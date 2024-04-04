import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TProfileBoolean } from "./profile-boolean.types";

export function ProfileBoolean({ value, yes, no }: TProfileBoolean.Props) {
  if (value === true) {
    return yes ? <>{yes}</> : <Translate token="v2.pages.settings.billing.format.boolean.yes" />;
  }
  if (value === false) {
    return no ? <>{no}</> : <Translate token="v2.pages.settings.billing.format.boolean.no" />;
  }

  return (
    <Typography variant="body-s" className="line max-w-[80%] uppercase leading-5 text-greyscale-50">
      -
    </Typography>
  );
}
