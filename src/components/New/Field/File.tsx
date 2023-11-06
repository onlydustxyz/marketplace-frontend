import { ChangeEvent, FocusEventHandler, useEffect, useState } from "react";
import { Field, FieldProps } from "./Field";
import { cn } from "src/utils/cn";
import { FieldInfoMessage } from "./InfoMessage";
import GalleryLine from "src/assets/icons/GalleryLine";
import LoaderIcon from "src/assets/icons/Loader";
export interface FieldImageProps<F extends string | File> extends Omit<FieldProps, "children"> {
  className?: string;
  onChange?: (...event: unknown[]) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  apiPath?: string;
  value?: F;
  max_size_mo?: number;
  upload?: {
    loading: boolean;
    success: boolean;
    mutate: (file: File) => void;
  };
}

export const FieldImage = <F extends string | File>({
  onBlur,
  onFocus,
  onChange,
  className,
  max_size_mo,
  upload,
  value,
  ...rest
}: FieldImageProps<F>) => {
  const [preview, setPreview] = useState("");
  const bytesToMegaBytes = (bytes: number) => bytes / (1024 * 1024);

  const onUploadImageBeforeChange = (file: File) => {
    if (upload) {
      upload.mutate(file);
    } else {
      onChange?.(file);
    }
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!max_size_mo || bytesToMegaBytes(file.size) <= max_size_mo) {
        setPreview(URL.createObjectURL(file));
        onUploadImageBeforeChange(file);
      }
    }
  };

  useEffect(() => {
    if (value && typeof value === "string") {
      setPreview(value);
    } else if (value && typeof value === "object") {
      setPreview(URL.createObjectURL(value));
    }
  }, [value]);

  return (
    <Field {...rest}>
      <div
        className={cn("flex w-full gap-3", {
          "pointer-events-none": upload?.loading,
        })}
      >
        <div>
          <div
            className={cn(
              "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-greyscale-50/8 bg-noise-heavy",
              className
            )}
          >
            {!upload?.loading && preview ? (
              <img src={preview} className="h-12 w-12 object-cover" />
            ) : (
              <>
                {upload?.loading ? (
                  <LoaderIcon className="flex h-4 w-4 animate-spin place-items-center text-spacePurple-500" />
                ) : (
                  <GalleryLine className="h-4 w-4 text-spaceBlue-300" />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            id={rest.name}
            type="file"
            className={cn(
              "rounded-lg border border-greyscale-50/8 bg-white/5 text-sm text-spaceBlue-200 file:mr-3 file:cursor-pointer file:rounded-l-lg file:border file:border-none file:border-greyscale-50 file:bg-white/5 file:px-4 file:py-2 file:leading-none file:text-greyscale-50 file:shadow-lg file:ring-1 file:ring-inset file:ring-greyscale-50 file:hover:text-spacePurple-100 file:hover:ring-spacePurple-200",
              {
                "pointer-events-none opacity-50 file:hover:text-spaceBlue-200 file:hover:ring-spaceBlue-200":
                  upload?.loading,
              }
            )}
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
