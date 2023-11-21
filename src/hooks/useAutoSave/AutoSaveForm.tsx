import { FieldValues, UseFormReturn } from "react-hook-form";
import useAutosave, { UseAutoSaveProps } from "./useAutoSave";
import { useEffect } from "react";

export interface AutoSaveFormProps<T extends FieldValues> extends UseAutoSaveProps {
  form: UseFormReturn<T, unknown>;
}

export const AutoSaveForm = <T extends FieldValues>({ form, ...rest }: AutoSaveFormProps<T>) => {
  const { watch } = form;
  const watched = watch();
  const autoSave = useAutosave<T>(rest);

  useEffect(() => {
    if (watched) {
      autoSave(form.getValues());
    }
  }, [watched]);
  return null;
};
