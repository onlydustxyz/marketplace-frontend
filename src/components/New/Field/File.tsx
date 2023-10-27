import { ChangeEvent, FC, FocusEventHandler, useState } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";
import { FieldInfoMessage } from "./InfoMessage";
import GalleryLine from "src/assets/icons/GalleryLine";

export interface FieldImageProps extends Omit<FieldProps, "children"> {
  className?: string;
  onChange?: (...event: unknown[]) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const FieldImage: FC<FieldImageProps> = ({ onBlur, onFocus, onChange, className, ...rest }) => {
  const [preview, setPreview] = useState("");

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange?.(file);
    }
  };

  return (
    <Field {...rest}>
      <div className="flex w-full gap-3">
        <div>
          <div
            className={cn(
              "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-greyscale-50/8 bg-noise-heavy",
              className
            )}
          >
            {preview ? (
              <img src={preview} className="h-12 w-12 object-cover" />
            ) : (
              <GalleryLine className="h-4 w-4 text-spaceBlue-300" />
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            id={rest.name}
            type="file"
            className="rounded-lg border border-greyscale-50/8 bg-white/5 text-sm text-spaceBlue-200 file:mr-3 file:cursor-pointer file:rounded-l-lg file:border file:border-none file:border-greyscale-50 file:bg-white/5 file:px-4 file:py-2 file:leading-none file:text-greyscale-50 file:shadow-lg file:ring-1 file:ring-inset file:ring-greyscale-50 file:hover:text-spacePurple-100 file:hover:ring-spacePurple-200"
            accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
            onChange={onImageChange}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          <FieldInfoMessage>SVG, PNG, JPG or GIF (MAX. 400x400px).</FieldInfoMessage>
        </div>
      </div>
    </Field>
  );
};
