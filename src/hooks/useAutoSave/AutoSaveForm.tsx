import { useEffect } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import useAutosave, { UseAutoSaveProps } from "./useAutoSave";

export interface AutoSaveFormProps<T extends FieldValues> extends UseAutoSaveProps {
  form: UseFormReturn<T, unknown>;
}

export const AutoSaveForm = <T extends FieldValues>({ form, ...rest }: AutoSaveFormProps<T>) => {
  const {
    watch,
    formState: { isSubmitting, isSubmitted },
  } = form;
  const watched = watch();
  const autoSave = useAutosave<T>(rest);

  useEffect(() => {
    if (watched && !isSubmitting && !isSubmitted) {
      autoSave(form.getValues());
    }
  }, [watched, isSubmitting, isSubmitted]);
  return null;
};
