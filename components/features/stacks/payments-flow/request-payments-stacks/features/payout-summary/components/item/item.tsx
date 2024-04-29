import { FieldInput } from "src/components/New/Field/Input";

import { Typography } from "components/layout/typography/typography";

import { TItem } from "./item.types";

export function Item({ label, labelIcon, value, isEditMode, field }: TItem.Props) {
  return (
    <div className="flex flex-1 flex-col items-start justify-start gap-2">
      <Typography
        as="div"
        variant="body-s"
        className="flex flex-row items-center justify-start gap-1 text-greyscale-200"
      >
        <>
          {labelIcon || null}
          {label}
        </>
      </Typography>
      <Typography as="div" variant="body-s">
        {value}
      </Typography>
      {isEditMode ? (
        <Typography as="div" variant="body-s">
          {value}
        </Typography>
      ) : (
        <Typography as="div" variant="body-s">
          {value}
        </Typography>
      )}
    </div>
  );
}
